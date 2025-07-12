import { FC, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { App, Button, Popconfirm, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { queryDicts,destroyDict } from '@/services/auth/DictController';
import CreateOrEdit from './components/CreateOrEdit';
import DictDataModal  from './components/DictDataModal';

export type TableListItem = {
  dictId: number;
  name: string;
  code: string;
  status: number;
  createdAt: number;
  updateAt: number;
};

const Dict: FC = ()=>{
  const [isModalVisible, setIsModalVisible ] = useState(false);
  const [isDictDataModalVisible,setIsDictDataModalVisible] = useState(false);
  const [editId, setEditId] = useState<number>(0);
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  const { message } = App.useApp();

  //自定查询
  const requestData = async (params: any): Promise<any> =>{
    try{
      const ret = await queryDicts(params);

      return {
        data: ret.data,
        success: ret.code === 200
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
   * 显示字典数据
   * @param show
   * @param id
   */
  const isShowDictDataModal = (show: boolean, id?: number | undefined)=> {
    // @ts-ignore
    setEditId(id);
    setIsDictDataModalVisible(show);
  }

  /**
   * 删除id
   * @param id
   */
  const confirmDel = async (id: number) => {
    try {
      await destroyDict(id);

      const defaultDeleteSuccessMessage = intl.formatMessage({
        id: 'global.delete.success',
        defaultMessage: '删除成功！',
      });

      message.success(defaultDeleteSuccessMessage);
      actionRef.current?.reload();

    }catch (error: any){
      message.error(error.message);
    }
  }


  //列表
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'dictId',
      align: 'center',
      sorter: (a, b) => a.dictId - b.dictId,
      hideInSearch: true,
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.name'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'name'
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.dict.code'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'code'
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.status'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'status',
      hideInSearch: true,
      render:(_,record)=>(
        record.status == 0 ?
          <Tag color="red">{intl.formatMessage({id: 'global.switch.unChecked.label'})}</Tag> :
          <Tag color="green">{intl.formatMessage({id: 'global.switch.checked.label'})}</Tag>
      )
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
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.action'} />
      ),
      width: 80,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (_,record) => (
        <Space>
          <a key="link" className="text-blue-500" onClick={() => isShowModal(true, record.dictId)}>
            <FormattedMessage id={'pages.searchTable.edit'} />
          </a>
          <a key="config" className="text-blue-500" onClick={()=>isShowDictDataModal(true,record.dictId)}>
            <FormattedMessage id={'pages.searchTable.dict.data'} />
          </a>
          <Popconfirm
            key="del"
            placement="top"
            title={intl.formatMessage({id: 'pages.searchTable.okConfirm'})}
            onConfirm={ () => confirmDel(record.dictId) }
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
      intl.formatMessage({id: 'pages.searchTable.admin.dict' })}
    >
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={requestData}
        rowKey="dictId"
        dateFormatter="string"
        headerTitle={
          intl.formatMessage({id: 'pages.searchTable.admin.dict.list'})
        }
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
          actionRef={actionRef}
          editId={editId}
        />
      }

      {isDictDataModalVisible &&
        <DictDataModal
          isModalVisible={isDictDataModalVisible}
          isShowModal={isShowDictDataModal}
          dictId={editId}
        />
      }

    </PageContainer>
  )
}

export default Dict;