import { FC, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useIntl, FormattedMessage } from '@umijs/max';
import { Button, Space, Tag, Switch, Popconfirm, App } from 'antd';
import { omit } from 'lodash-es';
import { queryUsers,destroyUser,resetPassword,blockUser,exportUserData } from '@/services/auth/UserController';
import { CreateOrEdit,CreateOrEditPermission }  from './components';
import { DeliveredProcedureOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

export type TableListItem = {
  userId: number;
  username: string;
  name: string;
  email: string;
  roles: [];
  isAdmin: boolean;
  phone: string;
  status: number;
  loginCount: number;
  createdAt: number;
  updateAt: number;
};

export type RoleItem = {
  name: string;
};


const User: FC = () =>{
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  const intl = useIntl();
  const { message } = App.useApp();

  const actionRef = useRef<ActionType>();

  //获取用户用户列表
  const requestData = async (params: any): Promise<any> => {
    try {
      const filter = omit(params, ['current', 'pageSize']);
      const rename = {
        page: params.current,
        pageSize: params.pageSize,
      };

      const mergeParams = Object.assign({}, filter, rename);
      const ret = await queryUsers(mergeParams);

      return {
        data: ret.data.rows,
        total: ret.data.pagination.total,
        success: ret.code == 200,
      };
    }catch (error: any){
      message.error(error.message);
    }
  };

  /**
   * 禁止用户登录
   * @param uid
   * @param status
   */
  const handleBlockUser = async (uid: number, status: number) => {
    try {
      const requestParams = {status: status};
      await blockUser(uid, requestParams);
      const defaultUpdateSuccessMessage = intl.formatMessage({
        id: 'pages.update.success',
        defaultMessage: '更新成功！',
      });

      message.success(defaultUpdateSuccessMessage);
    }catch (error: any){
      message.error(error.message);
    }
  };

  /**
   *  显示对话框
   * @param show
   * @param id
   */
  const isShowModal = (show: boolean, id?: number | undefined) => {
    // @ts-ignore
    setEditId(id);
    setIsModalVisible(show);
  };

  /**
   *  显示 Drawer
   * @param show
   * @param id
   */
  const isShowDrawer= (show: boolean, id?: number | undefined) => {
    // @ts-ignore
    setEditId(id);
    setIsDrawerVisible(show);
  };

  const exportData = async() =>{
    const res = await exportUserData();
    const blob = new Blob([res],{ type: 'application/vnd.ms-excel'});
    const timestamps = dayjs().format("YYYY_MM-DD HH_mm_ss");

    const a = document.createElement('a') // 转换完成，创建一个a标签用于下载
    a.download = `用户表_${timestamps}.xlsx`;
    a.href = window.URL.createObjectURL(blob)
    a.click()
    a.remove()
  }


  /**
   *
   * @param id
   */
  const confirmDel = async (id: number) => {
    try {
      await destroyUser(id);
      message.success('删除成功');
    }catch (error: any){
      message.error(error.message);
    }
  };

  /**
   * 重置密码
   * @param id
   */
  const confirmResetPassword = async (id: number) => {
    const res = await resetPassword(id);
    if (res.status === 200) {
      message.success('重置成功');
    }
  };

  //列表
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      width: 40,
      dataIndex: 'userId',
      align: 'center',
      sorter: (a, b) => a.userId - b.userId,
      hideInSearch: true,
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.username'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'userName',
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.nickname'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'nickName',
      hideInSearch: true,
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.role'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'roles',
      hideInSearch: true,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record.roles.map((item: RoleItem, index: number) => (
            <Tag key={index} color="#586cb1">
              {item.name}
            </Tag>
          ))}
        </Space>
      ),
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.whetherToDisabled.text'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          key={nanoid()}
          checkedChildren={intl.formatMessage({id: 'global.switch.checked.label'})}
          unCheckedChildren={intl.formatMessage({id: 'global.switch.unChecked.label'})}
          defaultChecked={record.status === 1}
          disabled={record.isAdmin}
          onChange={() => handleBlockUser(record.userId,record.status == 0 ? 1 : 0)}
        />
      ),
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.loginCount'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'loginCount',
      hideInSearch: true,
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.lastLoginTime'} />
      ),
      width: 120,
      align: 'center',
      dataIndex: 'lastLoginTime',
      hideInSearch: true,
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.lastLoginIp'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'lastLoginIp',
      hideInSearch: true,
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.createTime'} />
      ),
      width: 120,
      align: 'center',
      dataIndex: 'createdAt',
      hideInSearch: true,
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.updateTime'} />
      ),
      width: 120,
      align: 'center',
      dataIndex: 'updatedAt',
      hideInSearch: true,
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.action'} />
      ),
      width: 140,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <Space>
          <a key="link" onClick={() => isShowModal(true, record.userId)}>
            <FormattedMessage id='pages.searchTable.edit' />
          </a>

          {!record.isAdmin && (
            <>
              <a key="link" className="text-blue-500" onClick={()=>isShowDrawer(true,record.userId)}>
                <FormattedMessage id="pages.searchTable.permission" />
              </a>
              <Popconfirm
                key="del"
                placement="top"
                title={intl.formatMessage({id: 'pages.searchTable.okConfirm'})}
                onConfirm={() => confirmDel(record.userId)}
                okText="Yes"
                cancelText="No"
              >
                <a key="delete" className="text-blue-500">
                  <FormattedMessage id='pages.searchTable.delete' />
                </a>
              </Popconfirm>
            </>
          )}

          <Popconfirm
            key="reset"
            placement="top"
            title={intl.formatMessage({id: 'pages.searchTable.okConfirm'})}
            onConfirm={() => confirmResetPassword(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <a key="reset" className="text-blue-500">
              <FormattedMessage id='pages.searchTable.resetPassword' />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <PageContainer title={
      intl.formatMessage({id: 'pages.searchTable.admin.administrator'})
    }>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={requestData}
        rowKey="id"
        dateFormatter="string"
        headerTitle={
          intl.formatMessage({id: 'pages.searchTable.admin.administrator.list'})
        }
        pagination={{
          pageSize: 15,
          showSizeChanger: false,
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => isShowModal(true)}>
            <FormattedMessage id='pages.searchTable.new' />
          </Button>,
          <Button key="add" type="primary" icon={<DeliveredProcedureOutlined />} onClick={() => exportData()}>
            <FormattedMessage id='pages.searchTable.export' />
          </Button>,
        ]}
      />

      {isModalVisible &&
        <CreateOrEdit
          isModalVisible={isModalVisible}
          isShowModal={isShowModal}
          actionRef={actionRef}
          editId={editId}
        />
      }

      {isDrawerVisible && (
        <CreateOrEditPermission
          isDrawerVisible={isDrawerVisible}
          isShowDrawer={isShowDrawer}
          editId={editId}
          actionRef={actionRef} />
      )}

    </PageContainer>
  )
}

export default User;