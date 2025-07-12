import { FC, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useIntl, FormattedMessage } from '@umijs/max';
import { Button, Popconfirm, Switch, Space, App } from 'antd';
import { queryMenus, switchMenu, destroyMenu } from '@/services/auth/MenuController';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { treeToList } from '@/utils/utils';
import * as icons from '@ant-design/icons';
import CreateOrEdit from './components/CreateOrEdit';

export type TableListItem = {
  menuId: number;
  icon: string;
  name: string;
  path: string;
  order: number;
  status: number;
  visible: number;
  createdAt: number;
  updateAt: number;
};

const Menu: FC = () =>{
  const [ menuData, setMenuData ] = useState([]);
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [defaultExpandedRowKeys, setDefaultExpandedRowKeys] = useState<any>([])
  const [ editId, setEditId] = useState<number>(0);

  const actionRef = useRef<ActionType>();

  const intl = useIntl();

  const { message } = App.useApp();

  //自定查询
  const requestData = async (params: any): Promise<any> =>{
    try{
      const ret = await queryMenus(params);
      setMenuData(ret.data);
      const treeList = treeToList(ret.data);
      const _defaultExpandedRowKeys = treeList.map((item)=>{
        return item.id;
      })
      setDefaultExpandedRowKeys(_defaultExpandedRowKeys);
      return {
        data: ret.data,
        success: true
      }

    }catch (error: any){
      message.error(error.message);
    }

  }

  /**
   *  显示对话框
   * @param show
   * @param id
   */
  const isShowModal = (show: boolean, id?: number | undefined)=> {
    // @ts-ignore
    setEditId(id);
    setIsModalVisible(show);
  }

  /**
   * 删除id
   * @param id
   */
  const confirmDel = async (id: number) => {
    try {
        await destroyMenu(id);
        const defaultDeleteSuccessMessage = intl.formatMessage({
          id: 'global.delete.success',
          defaultMessage: '删除成功！',
        });
        message.success(defaultDeleteSuccessMessage);

    }catch (error: any){
      message.error(error.message);
    }
  }

  /**
   * 更新状态
   * @param id
   * @param record
   */
  const handleSwitch = async (id: number,record:TableListItem) =>{
    try {
      const updateParams = {
        visible: record.visible ? 0 : 1
      }
      await switchMenu(id, updateParams);
      const defaultUpdateSuccessMessage = intl.formatMessage({
        id: 'pages.update.success',
        defaultMessage: '更新成功！',
      });
      message.success(defaultUpdateSuccessMessage);
      actionRef.current?.reload();
    }catch (error: any){
      message.error(error.message)
    }
  }


  //列表
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'menuId',
      align: 'center',
      sorter: (a, b) => a.menuId - b.menuId,
      hideInSearch: true,
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.icon'} />
      ),
      width: 40,
      align: 'center',
      dataIndex: 'icon',
      hideInSearch: true,
      render:(_,record)=>(
        record.icon && <Icon component={(icons as any)[record.icon]} style={{ fontSize: '16px' }} />
      )
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.name'} />
      ),
      width: 40,
      align: 'center',
      dataIndex: 'name'
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.locale'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'locale'
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.router'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'path',
      hideInSearch: true,
    }, {
      title: (
        <FormattedMessage id={'pages.searchTable.sort'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'sort',
      hideInSearch: true,
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.display'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'visible',
      hideInSearch: true,
      render:(_,record)=>(
        <Switch
          checkedChildren={intl.formatMessage({id: 'global.switch.checked.label'})}
          unCheckedChildren={intl.formatMessage({id: 'global.switch.unChecked.label'})}
          checked = { record.visible === 1 }
          onChange={() => handleSwitch(record.menuId, record)}
        />
      )
    }, {
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
      width: 80,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (_,record) => (
        <Space>
          <a key="link" className="text-blue-500" onClick={() => isShowModal(true, record.menuId)}>
            <FormattedMessage id={'pages.searchTable.edit'} />
          </a>
          <Popconfirm
            key="del"
            placement="top"
            title={intl.formatMessage({id: 'pages.searchTable.okConfirm'})}
            onConfirm={ () => confirmDel(record.menuId) }
            okText={intl.formatMessage({id: 'pages.searchTable.ok'})}
            cancelText={intl.formatMessage({id: 'pages.searchTable.cancel'})}
          >
            <a key="delete" className="text-blue-500">
              <FormattedMessage id={'pages.searchTable.delete'} />
            </a>
          </Popconfirm>
        </Space>
      )
    },
  ];


  return (
    <PageContainer title={
      intl.formatMessage({id: 'pages.searchTable.admin.menu' })}
    >
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        request={requestData}
        dateFormatter="string"
        headerTitle={
          intl.formatMessage({id: 'pages.searchTable.admin.menu.list'})
        }
        search={false}
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

      {isModalVisible &&
        <CreateOrEdit
          isModalVisible={isModalVisible}
          isShowModal={isShowModal}
          actionRef = {actionRef}
          menuData={menuData}
          editId = {editId}
        />
      }
    </PageContainer>
  )
}

export default Menu;