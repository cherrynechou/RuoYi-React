import { FC, useState } from 'react';
import { App, Button, Drawer, Form, Input, Skeleton, Space, Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import { useIntl } from '@umijs/max';
import { nanoid } from 'nanoid';
import { useAsyncEffect } from 'ahooks';
import { getAllPermissions } from '@/services/auth/PermissionController';
import { filterTreeLeafNode, listToTree } from '@/utils/utils';
import { ITreeOption } from '@/interfaces/tree';
import { queryRolePermissionIdsByRoleId, updateRolePermission } from '@/services/auth/RoleController';

export type CreateOrEditProps = {
  isDrawerVisible: boolean;
  isShowDrawer: (show: boolean, id?: number | undefined) => void;
  editId : number;
  actionRef: any;
}

//默认类型
const defaultOptionKeys: ITreeOption = {
  idKey: 'permissionId',
  childrenKey: 'children',
  titleKey: 'title',
  parentIdKey: 'parentId',
  optionIdKey: 'id',
  rootValueKey: 0,
};

//创建角色权限
const CreateOrEditPermission: FC<CreateOrEditProps> = (props: any) => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [defaultExpandedRowKeys, setDefaultExpandedRowKeys] = useState<any>([])
  const [treeData, setTreeData] = useState<any>([]);
  const [treeLeafRecord, setTreeLeafRecord] = useState<any>([]);
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<any>([]);
  const { isDrawerVisible, isShowDrawer, editId, actionRef } = props;

  const { message } = App.useApp();
  const [form] = Form.useForm();

  const intl = useIntl();

  const title = editId === undefined ?
    intl.formatMessage({ id: 'modal.createOrUpdateForm.create.title', defaultMessage: '添加' }) :
    intl.formatMessage({ id: 'modal.createOrUpdateForm.edit.title', defaultMessage: '编辑' });

  const fetchApi = async () =>{
    try {
      const permissionAllRes = await getAllPermissions();
      const _permissionData = permissionAllRes.data;
      const listTreePermissionData = listToTree(_permissionData, defaultOptionKeys);
      const _defaultExpandedRowKeys = _permissionData.map((item: any)=>{
        return item.permissionId;
      })

      setDefaultExpandedRowKeys(_defaultExpandedRowKeys);
      setTreeData(listTreePermissionData);
      setTreeLeafRecord(filterTreeLeafNode(listTreePermissionData));

      if(editId !== undefined){
        const res = await queryRolePermissionIdsByRoleId(editId);
        let permissionList: any[] = [];
        if(res.data.length > 0){
          permissionList = res.data.map((item: any) => {
            return item;
          });
        }

        setDefaultCheckedKeys(permissionList);
        setInitialValues({
          permissionIds: permissionList,
        })
      }

    }catch (error: any){

    }
  }


  useAsyncEffect(async () => {
    await fetchApi();
  }, []);


  const handleOk = async () =>{
    try {
      const fieldsValue = await form.validateFields();

      await updateRolePermission(editId,fieldsValue);

      isShowDrawer(false);

      const defaultUpdateSuccessMessage = editId === undefined ?
        intl.formatMessage({ id: 'global.create.success', defaultMessage: '添加成功！'}):
        intl.formatMessage({ id: 'global.update.success', defaultMessage: '更新成功！'});

      message.success(defaultUpdateSuccessMessage);

      actionRef.current.reload();

    }catch (error: any){

    }
  }


  const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
    //找出叶子节点
    const filterChildNodes = treeLeafRecord.map((item: any) => {
      return item.id;
    });
    const filterSameKeys = filterChildNodes.filter((item: any) => selectedKeys.indexOf(item) > -1);
    form.setFieldsValue({ permissions: JSON.stringify(filterSameKeys) });
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    // @ts-ignore
    const checkedKeysResult = [...checkedKeys];

    //找出叶子节点
    const filterChildNodes = treeLeafRecord.map((item: any) => {
      return item.id;
    });

    const filterSameKeys = filterChildNodes.filter((item: any) => checkedKeysResult?.indexOf(item) > -1);
    form.setFieldsValue({ permissionIds: checkedKeysResult.length===0 ? [] : filterSameKeys });
  };


  return (
    <Drawer
      title={title}
      open={isDrawerVisible}
      onClose={() => isShowDrawer(false)}
      footer={
        <div style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={()=>isShowDrawer(false)}>取消</Button>
            <Button type="primary" onClick={handleOk}>
              确定
            </Button>
          </Space>
        </div>
      }
      width={750}
    >
      {
        Object.keys(initialValues).length === 0 ? (<Skeleton paragraph={{ rows: 4 }} />) : (
        <Form name="role-permission-update" form={form} initialValues={initialValues} autoComplete="off">
          <Form.Item name="permissionIds" hidden>
            <Input hidden />
          </Form.Item>

          <Tree
            checkable
            defaultExpandAll={false}
            defaultCheckedKeys={defaultCheckedKeys}
            expandedKeys={defaultExpandedRowKeys}
            onSelect={onSelect}
            onCheck={onCheck}
            key={nanoid()}
            treeData={treeData}
          />

        </Form>
      )}
    </Drawer>
  )
}

export default CreateOrEditPermission;