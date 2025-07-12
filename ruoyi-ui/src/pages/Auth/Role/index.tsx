import { FC, useRef, useState } from 'react';
import { destroyRole, queryRoles } from '@/services/auth/RoleController';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage,useIntl,useAccess,Access } from '@umijs/max';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, App } from 'antd';
import { omit } from 'lodash-es';
import { CreateOrEdit,CreateOrEditPermission } from './components'

export type TableListItem = {
  roleId: number;
  name: string;
  isAdmin: boolean;
  createdAt: number;
  updateAt: number;
};

const Role: FC = () => {
  const [isModalVisible, setIsModalVisible ] = useState<boolean>(false);
  const [isDrawerVisible,setIsDrawerVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const actionRef = useRef<ActionType>();

  const access = useAccess();

  const { message } = App.useApp();
  const intl = useIntl();

  //自定查询
  const requestData = async (params: any): Promise<any> => {
    try {
      const filter = omit(params, ['current', 'pageSize']);
      const rename = {
        page: params.current,
        pageSize: params.pageSize,
      };
      const mergeParams = Object.assign({}, filter, rename);
      const ret = await queryRoles(mergeParams);

      return {
        data: ret.data.rows,
        total: ret.data.pagination.total,
        success: ret.code === 200,
      };
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

  /**
   * 删除
   * @param id
   */
  const confirmDel = async (id: number) => {
    try {
      await destroyRole(id);
      const defaultDeleteSuccessMessage = intl.formatMessage({
        id: 'global.delete.success',
        defaultMessage: '删除成功！',
      });
      message.success(defaultDeleteSuccessMessage);
    }catch (error: any){
      message.error(error.message);
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      width: 40,
      dataIndex: 'roleId',
      align: 'center',
      sorter: (a, b) => a.roleId - b.roleId,
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage id={'pages.searchTable.roleName'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: (
        <FormattedMessage id={'pages.searchTable.slug'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'slug',
    },
    {
      title: (
        <FormattedMessage id={'pages.searchTable.createTime'} />
      ),
      width: 120,
      align: 'center',
      dataIndex: 'createdAt',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage id={'pages.searchTable.updateTime'} />
      ),
      width: 120,
      align: 'center',
      dataIndex: 'updatedAt',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage id={'pages.searchTable.action'} />
      ),
      width: 40,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <Space>
          <a key="link" className="text-blue-500" onClick={() => isShowModal(true, record.roleId)}>
            <FormattedMessage id="pages.searchTable.edit" />
          </a>
          {!record.isAdmin && <>
            <a key="link" className="text-blue-500" onClick={()=>isShowDrawer(true,record.roleId)}>
              <FormattedMessage id="pages.searchTable.permission" />
            </a>
            <Popconfirm
              key="del"
              placement="top"
              title={intl.formatMessage({ id: 'pages.searchTable.okConfirm' })}
              onConfirm={() => confirmDel(record.roleId)}
              okText={intl.formatMessage({ id: 'pages.searchTable.ok' })}
              cancelText={intl.formatMessage({ id: 'pages.searchTable.cancel' })}
            >
              <a key="delete" className="text-blue-500">
                <FormattedMessage id="pages.searchTable.delete" />
              </a>
            </Popconfirm>
          </>
          }
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={
      intl.formatMessage({ id: 'pages.searchTable.admin.role' })
    }>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={requestData}
        rowKey="id"
        dateFormatter="string"
        headerTitle={
          intl.formatMessage({ id: 'pages.searchTable.admin.role.list' })
        }
        pagination={{
          pageSize: 15,
          showSizeChanger: false,
          showQuickJumper: true,
        }}
        toolBarRender={() => [
          <Button key="button" type="primary" icon={<PlusOutlined />} onClick={() => isShowModal(true)}>
            <FormattedMessage id='pages.searchTable.new' />
          </Button>,
        ]}
      />

      {isModalVisible && (
        <CreateOrEdit
          isModalVisible={isModalVisible}
          isShowModal={isShowModal}
          actionRef={actionRef}
          editId={editId} />
      )}

      {isDrawerVisible && (
        <CreateOrEditPermission
          isDrawerVisible={isDrawerVisible}
          isShowDrawer={isShowDrawer}
          editId={editId}
          actionRef={actionRef} />
      )}

    </PageContainer>
  );
};

export default Role;
