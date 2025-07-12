import { FC, useState } from 'react';
import { Form, Input, Modal, Select, Skeleton, App, InputNumber, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useAsyncEffect } from 'ahooks';
import { FormattedMessage, useIntl } from '@umijs/max';
import { createPermission, queryPermission, updatePermission } from '@/services/auth/PermissionController';
import { treeToOrderList } from '@/utils/utils';
import { IListOption } from '@/interfaces/tree';

export type CreateOrEditProps = {
  isModalVisible: boolean;
  isShowModal: (show: boolean, id?: number | undefined) => void;
  permissionTreeData: any[];
  editId : number;
  actionRef: any;
}

//默认类型
const defaultOptionKeys: IListOption = {
  childrenKey: 'children',
  titleKey: 'name',
  parentIdKey: 'parentId',
  optionIdKey: 'categoryId',
  rootNameKey: 'Root',
  fieldsKey: 'fields',
};

const CreateOrEdit: FC<CreateOrEditProps> = (props: any) => {
  const [treeData, setTreeData] = useState<any>([]);
  const [typeOptions,setTypeOptions] = useState<any>([]);
  const [initialValues, setInitialValues] = useState<any>({});
  const [showSlug,setShowSlug] = useState<boolean>(false);
  const [ form] = Form.useForm();

  const { isModalVisible, isShowModal, permissionTreeData, editId, actionRef } = props;

  const { message } = App.useApp();

  const intl = useIntl();

  const title = editId === undefined ?
    intl.formatMessage({ id: 'modal.createOrUpdateForm.create.title', defaultMessage: '添加' }) :
    intl.formatMessage({ id: 'modal.createOrUpdateForm.edit.title', defaultMessage: '编辑' });

  const fetchApi = async () => {
    try {
      //生成树型结构
      const treeValues = treeToOrderList(permissionTreeData, defaultOptionKeys);
      setTreeData(treeValues);

      const options = [
        {
          label: intl.formatMessage({ id: 'modal.createOrUpdateForm.type.option.directory', defaultMessage: '目录'}),
          value: 1
        }, {
          label: intl.formatMessage({ id: 'modal.createOrUpdateForm.type.option.subDirectory', defaultMessage: '子目录'}),
          value: 2
        },{
          label: intl.formatMessage({ id: 'modal.createOrUpdateForm.type.option.permission', defaultMessage: '权限'}),
          value: 3
        }
      ];

      setTypeOptions(options);

      if(editId !== undefined){
        const permissionRes = await queryPermission(editId);

        const currentData = permissionRes.data;

        if(currentData.type>2){
          setShowSlug(true)
        }else{
          setShowSlug(false);
        }

        setInitialValues({
          parentId: currentData.parentId,
          name: currentData.name,
          locale: currentData.locale,
          type: currentData.type,
          slug: currentData.slug,
          sort: currentData.sort,
        });
      }else{
        form.setFieldsValue({
          sort: 1,
          type: 1
        })
      }
    }catch (error: any){
      message.error(error.message);
    }
  }

  useAsyncEffect(async () => {
    await fetchApi();
  }, []);


  const handleTypeChange = (e: RadioChangeEvent) =>{
    if(e.target.value == "1" || e.target.value == "2") setShowSlug(false); else setShowSlug(true);
  }

  const handleOk = async () => {
    try {
      const fieldsValue = await form.validateFields();

      if (editId === undefined) {
        await createPermission(fieldsValue);
      } else {
        await updatePermission(editId, fieldsValue);
      }

      isShowModal(false);

      const defaultUpdateSuccessMessage = editId === undefined ?
        intl.formatMessage({ id: 'global.create.success', defaultMessage: '添加成功！'}):
        intl.formatMessage({ id: 'global.update.success', defaultMessage: '更新成功！'});

      message.success(defaultUpdateSuccessMessage);
      actionRef.current.reload();

    }catch (error: any){
      message.error(error.message);
    }
  }

  return (
    <Modal
      title={title}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={() => isShowModal(false)}
      destroyOnHidden
      width={750}
    >
      {Object.keys(initialValues).length === 0 && editId !== undefined ? (<Skeleton paragraph={{ rows: 4 }} />) : (
        <Form  form={form} initialValues={initialValues} autoComplete="off">
          <Form.Item
            name="parentId"
            label={
              intl.formatMessage({id: 'modal.createOrUpdateForm.parent'})
            }
            labelCol={{ span: 3 }}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='validator.admin.parent.required'
                    defaultMessage='父级不能为空！'
                  />
                )
              }
            ]}
          >
            <Select options={treeData} style={{ width: 400 }} placeholder="请选择父级" />
          </Form.Item>

          <Form.Item
            name="type"
            label={
              intl.formatMessage({id: 'modal.createOrUpdateForm.permission.type'})
            }
            labelCol={{ span: 3 }}
          >
            <Radio.Group
              onChange={handleTypeChange}
              options={typeOptions}
            />

          </Form.Item>

          <Form.Item
            name="name"
            label={
              intl.formatMessage({id: 'modal.createOrUpdateForm.name'})
            }
            labelCol={{ span: 3 }}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='validator.admin.name.required'
                    defaultMessage='名称是必填项！'
                  />
                )
              }
            ]}
          >
            <Input
              placeholder={
                intl.formatMessage({id: 'modal.createOrUpdateForm.name.placeholder'})
              }
            />
          </Form.Item>


          <Form.Item
            name="locale"
            label={
              intl.formatMessage({id: 'modal.createOrUpdateForm.permission.locale'})
            }
            labelCol={{ span: 3 }}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='validator.admin.permission.name.required'
                    defaultMessage='名称是必填项！'
                  />
                )
              }
            ]}
          >
            <Input
              placeholder={
                intl.formatMessage({id: 'modal.createOrUpdateForm.permission.locale.placeholder'})
              }
            />
          </Form.Item>

          {
            showSlug &&
              <Form.Item
                name="slug"
                label={
                  intl.formatMessage({id: 'modal.createOrUpdateForm.slug'})
                }
                labelCol={{ span: 3 }}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id='validator.admin.slug.required'
                        defaultMessage='标识是必填项！'
                      />
                    )
                  }
                ]}
              >
                <Input placeholder={
                  intl.formatMessage({id: 'modal.createOrUpdateForm.slug.placeholder'})
                }/>
              </Form.Item>
          }

          <Form.Item
            name="sort"
            label={
              intl.formatMessage({id: 'modal.createOrUpdateForm.sort'})
            }
            labelCol={{ span: 3 }}
          >
            <InputNumber
              style={{ width: 400 }}
              placeholder={intl.formatMessage({
                id: 'modal.createOrUpdateForm.sort.placeholder',
                defaultMessage: '请输入 排序！',
              })}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
};


export default CreateOrEdit;