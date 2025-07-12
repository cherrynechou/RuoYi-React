import { FC, useState } from 'react';
import { FormattedMessage, history, useIntl, useModel } from '@umijs/max';
import { App, Form, Input, MenuProps, Modal, Spin, Tooltip } from 'antd';
import { LogoutOutlined, LockOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullScreen} from '@/hooks';
import { createStyles } from 'antd-style';
import { outLogin } from '@/services/system/CommonController'
import localforage from 'localforage';
import { stringify } from 'querystring';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const administratorText = useIntl().formatMessage({id: 'global.administratorText'});

  return <span style={{ color: '#FFF', fontSize: 14 }}>{currentUser?.nickName || administratorText}</span>;
};

/**
 * 清除accesstoken
 */
const removeToken = async () => {
  await localforage.removeItem('access_token');
  await localforage.removeItem('refresh_token');
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { message, modal } = App.useApp();

  const intl = useIntl();
  const [form] = Form.useForm();

  const title = intl.formatMessage({ id: 'component.userSetting.title' });

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await outLogin();
    await removeToken();
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/admin/login' && !redirect) {

      const { search, pathname } = window.location;

      // Note: There may be security issues, please note
      if (window.location.pathname !== '/admin/login' && !redirect) {
        history.replace({
          pathname: '/admin/login',
          search: stringify({
            redirect: pathname + search,
          }),
        });
      }
    }
  };

  /**
   * 退出登录
   */
  const jumpToLoginPages = async () => {
    await removeToken();

    const defaultLogoutMessage = intl.formatMessage({
      id: 'message.logout.success',
      defaultMessage: '退出成功！',
    });

    message.success(defaultLogoutMessage);
    history.replace({
      pathname: '/admin/login',
    });
  };

  const DropdownItems: MenuProps['items'] = [
    ...(menu
      ? [
        {
          key: 'settings',
          icon: <LockOutlined />,
          label: intl.formatMessage({id: 'component.userSetting.password'}),
        },
        {
          type: 'divider' as const,
        },
      ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: intl.formatMessage({id: 'component.userSetting.logout'}),
    },
  ];

  const DropdownOnClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'logout') {
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
      });
      await loginOut();
      return;
    }
    if (key === 'settings') {
      setIsModalVisible(true);
      return;
    }
  };


  const { styles } = useStyles();

  // -- layouts
  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.nickName) {
    return loading;
  }

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: DropdownOnClick,
        items: DropdownItems,
      }}
    >
      {children}
    </HeaderDropdown>
  )
};