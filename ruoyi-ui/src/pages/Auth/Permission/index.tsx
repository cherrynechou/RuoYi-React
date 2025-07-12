import { FormattedMessage,useIntl } from '@umijs/max';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, App, Popconfirm, Space, Tag } from 'antd';
import { FC, useRef, useState } from 'react';
import { destroyPermission, queryPermissions } from '@/services/auth/PermissionController';
import { PlusOutlined } from '@ant-design/icons';
import { treeToList } from '@/utils/utils';
import CreateOrEdit from './components/CreateOrEdit';

export type TableListItem = {
  permissionId: number;
  name: string;
  type: number;
  slug: string;
  paths: any[];
  sort: number;
  parentId: number;
  createdAt: number;
  updateAt: number;
};

const Permission: FC = () => {
  const [permissionTreeData, setPermissionTreeData] = useState<any>([]);
  const [isModalVisible, setIsModalVisible ] = useState<boolean>(false);
  const [defaultExpandedRowKeys, setDefaultExpandedRowKeys] = useState<any>([])
  const [editId, setEditId] = useState<number>(0);

  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  const { message } = App.useApp();

  //自定查询
  const requestData = async () => {
    const permissionRes = await queryPermissions();
    setPermissionTreeData(permissionRes.data);

    const treeList = treeToList(permissionRes.data);
    const _defaultExpandedRowKeys = treeList.map((item)=>{
      return item.id;
    })
    setDefaultExpandedRowKeys(_defaultExpandedRowKeys);

    return {
      data: permissionRes.data,
      success: true,
    };
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
   * 删除id
   * @param id
   */
  const confirmDel = async (id: number) => {
    const res = await destroyPermission(id);
    if (res.code === 200) {

      const defaultDeleteSuccessMessage = intl.formatMessage({
        id: 'global.delete.success',
        defaultMessage: '删除成功！',
      });

      message.success(defaultDeleteSuccessMessage);
    }
  };

  //列表
  const columns: ProColumns<TableListItem>[] = [
    {
      title: (
        <FormattedMessage id={'pages.searchTable.name'} />
      ),
      width: 120,
      align: 'center',
      dataIndex: 'name',
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.permission.locale'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'locale',
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.slug'} />
      ),
      width: 40,
      align: 'center',
      dataIndex: 'slug'
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.permission.type'} />
      ),
      width: 40,
      align: 'center',
      dataIndex: 'type',
      render: (_,record)=>(
        <Space>
          {record.type == 1 && <Tag color="#108ee9">目录</Tag>}
          {record.type == 2 && <Tag color="#108ee9">子目录</Tag>}
          {record.type == 3 && <Tag color="#108ee9">权限</Tag>}
        </Space>
      )
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.sort'} />
      ),
      width: 10,
      align: 'center',
      dataIndex: 'sort',
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.createTime'} />
      ),
      width: 100,
      align: 'center',
      dataIndex: 'createdAt',
      hideInSearch: true,
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.updateTime'} />
      ),
      width: 100,
      align: 'center',
      dataIndex: 'updatedAt',
      hideInSearch: true,
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.action'} />
      ),
      width: 60,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <Space>
          <a key="link" className="text-blue-500" onClick={() => isShowModal(true, record.permissionId)}>
            <FormattedMessage id='pages.searchTable.edit' />
          </a>
          <Popconfirm
            key="del"
            placement="top"
            title={intl.formatMessage({id: 'pages.searchTable.okConfirm'})}
            onConfirm={() => confirmDel(record.permissionId)}
            okText={intl.formatMessage({id: 'pages.searchTable.ok'})}
            cancelText={intl.formatMessage({id: 'pages.searchTable.cancel'})}
          >
            <a key="delete" className="text-blue-500">
              <FormattedMessage id='pages.searchTable.delete' />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={
      intl.formatMessage({id: 'pages.searchTable.admin.permission' })
    }>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={requestData}
        search={false}
        rowKey="id"
        dateFormatter="string"
        headerTitle={
          intl.formatMessage({id: 'pages.searchTable.admin.permission.list' })
        }
        expandable={{
          expandedRowKeys: defaultExpandedRowKeys
        }}
        pagination={false}
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
          permissionTreeData={permissionTreeData}
          editId={editId}
        />
      )}

    </PageContainer>
  );
};

export default Permission;
