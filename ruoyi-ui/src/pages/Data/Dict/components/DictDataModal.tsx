import { FC, useRef, useState } from 'react';
import { App, Button, Modal, Popconfirm, Space, Switch, Tag } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {  ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from '@umijs/max';
import { queryDictDatas,destroyDictData,setDictDataDefault } from '@/services/auth/DictDataController';
import CreateOrEditDictData from './CreateOrEditDictData';
import { omit } from 'lodash-es';
import { nanoid } from 'nanoid';

export type TableListItem = {
  dataId: number;
  name: string;
  code: string;
  status: number;
  isDefault: number;
  createdAt: number;
  updateAt: number;
};

export interface dictDataModalProps {
  isModalVisible: boolean,
  isShowModal: (show: boolean, id?: number | undefined) => void,
  dictId : number
}

const DictDataModal: FC<dictDataModalProps> = (props: any) =>{
  const { isModalVisible, isShowModal, dictId } = props;
  const actionRef = useRef<ActionType>();
  const [isDictDataModalVisible,setIsDictDataModalVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  const intl = useIntl();
  const { message} = App.useApp();

  //自定查询
  const requestData = async (params: any): Promise<any> =>{
    try{
      const filter = omit(params, ['current', 'pageSize']);
      const rename = {
        dictId,
        page: params.current,
        pageSize: params.pageSize,
      };
      const mergeParams = Object.assign({}, filter, rename);
      const ret = await queryDictDatas(mergeParams);

      return {
        data: ret.data.rows,
        total: ret.data.pagination.total,
        success: ret.code === 200,
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
  const isShowDictDataModal = (show: boolean, id?: number | undefined)=> {
    // @ts-ignore
    setEditId(id);
    setIsDictDataModalVisible(show);
  }

  const handleSetDictDataDefault = async (dataId: number,code: string)=>{
    try {
      const params = {code: code};
      await setDictDataDefault(dataId,params);

      const defaultUpdateSuccessMessage = intl.formatMessage({ id: 'global.update.success', defaultMessage: '更新成功！'});
      message.success(defaultUpdateSuccessMessage);

      actionRef.current?.reload();

    }catch (error: any){
      message.error(error.message);
    }
  }

  /**
   * 删除id
   * @param id
   */
  const confirmDel = async (id: number) => {
    try {
      await destroyDictData(id);

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
      dataIndex: 'dataId',
      align: 'center',
      sorter: (a, b) => a.dataId - b.dataId,
      hideInSearch: true,
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.dict.data.label'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'label'
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.dict.data.value'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'value'
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.dict.data.isDefault'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'isDefault',
      render: (_, record) => (
        <Switch
          key={nanoid()}
          checkedChildren={intl.formatMessage({id: 'global.switch.true.label'})}
          unCheckedChildren={intl.formatMessage({id: 'global.switch.false.label'})}
          defaultChecked={record.isDefault === 1}
          onChange={() => handleSetDictDataDefault(record.dataId,record.code)}
        />
      ),
    },{
      title: (
        <FormattedMessage id={'pages.searchTable.dict.data.sort'} />
      ),
      width: 80,
      align: 'center',
      dataIndex: 'sort'
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
          <a key="link" className="text-blue-500" onClick={() => isShowDictDataModal(true, record.dataId)}>
            <FormattedMessage id={'pages.searchTable.edit'} />
          </a>
          <Popconfirm
            key="del"
            placement="top"
            title={intl.formatMessage({id: 'pages.searchTable.okConfirm'})}
            onConfirm={ () => confirmDel(record.dataId) }
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
    <Modal
      title={
        <FormattedMessage id={'modal.dictDataModel.name'} />
      }
      open={isModalVisible}
      onCancel={() => isShowModal(false)}
      destroyOnHidden
      width={1200}
      styles={{
        body:{
          height: '50vh',
          overflowY: 'auto'
        }
      }}
      footer={null}
    >
      <ProTable<TableListItem>
        columns={columns}
        request={requestData}
        rowKey="dataId"
        actionRef={actionRef}
        dateFormatter="string"
        headerTitle={
          intl.formatMessage({id: 'pages.searchTable.admin.dict.list'})
        }
        pagination={false}
        toolBarRender={() => [
          <Button key="button" type="primary" icon={<PlusOutlined />} onClick={() => isShowDictDataModal(true)}>
            <FormattedMessage id='pages.searchTable.new' />
          </Button>,
        ]}
      />

      {isDictDataModalVisible &&
        <CreateOrEditDictData
          isModalVisible={isDictDataModalVisible}
          isShowModal={isShowDictDataModal}
          actionRef={actionRef}
          dictId={dictId}
          editId={editId}
        />
      }

    </Modal>
  )
}

export default DictDataModal;