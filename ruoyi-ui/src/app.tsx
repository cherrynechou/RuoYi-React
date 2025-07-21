// 运行时配置
import { LinkOutlined } from '@ant-design/icons';
import { App, ConfigProvider } from 'antd';
import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-components';
import { getLocale, history, Link } from '@umijs/max';
import AntWrapApp from '@/components/GlobalMessage';
import defaultSettings from '../config/defaultSettings';
import { getMenuList, queryCurrentUser } from '@/services/system/CommonController';
import { menuDataRender, menuItemRender, subMenuItemRender } from '@/libs/menuRender';
import { AvatarName, AvatarDropdown, Footer, SelectLang } from '@/components';
import { errorConfig } from './requestErrorConfig';
import dayjs from 'dayjs';

const isDev = process.env.NODE_ENV === 'development';
import logoImage from '@/assets/images/logo.png';
const loginPath = '/admin/login';

export const rootContainer = (root: JSX.Element) => {
  return (
    <ConfigProvider>
      <App>
        <AntWrapApp />
        {root}
      </App>
    </ConfigProvider>
  );
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}


export const layout   = ({ initialState }: {initialState: any} ) => {
  return {
    menu: {
      locale: false,
      params: {
        userId: initialState?.currentUser?.userId,
      },
      request: async () => {
        const menuData = await getMenuList();
        return menuData.data;
      },
    },
    logo: logoImage,
    actionsRender: (props: any) => {
      return [
        <div key={'dateString'} style={{ color: '#fff', fontSize: 14 }}>
          {dayjs().locale(getLocale()).format('YYYY-MM-DD dddd')}
        </div>,
        <SelectLang key="SelectLang" />
      ];
    },
    avatarProps: {
      title: <AvatarName />, //右上角名称
      size: 'small',
      src: initialState?.currentUser?.avatarUrl || undefined, //右上角头像
      render: (_: any, avatarChildren: any) => {
        return <AvatarDropdown menu={true}>{avatarChildren}</AvatarDropdown>;
      },
    },
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: async (location: Location) => {
      // 页面切换时触发
      console.log('页面切换时触发', initialState, location);
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev? [
      <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
        <LinkOutlined />
        <span>OpenAPI 文档</span>
      </Link>
    ] : [],
    menuHeaderRender: undefined,
    menuDataRender: (menuData:MenuDataItem[]) => menuDataRender(menuData),
    // 二级icon
    menuItemRender,
    // 自定义 403 页面
    //unAccessible: <div>unAccessible</div>,
    subMenuItemRender,
    childrenRender: (children: any) => {
      // if (initialState?.loading) return <PageLoading />;
      return children;
    },
    ...initialState.settings
  };
};


/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
