import { FC, useState } from 'react';
import { CreateOrEditProps } from '@/interfaces/modal';
import { createRole, getRole, updateRole } from '@/services/auth/RoleController';
import { useAsyncEffect } from 'ahooks';
import { App, Form, Input, InputNumber, Modal, Select, Skeleton, Switch, Tree } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';

const CreateOrEdit: FC<CreateOrEditProps> = (props: any) => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [scopeOptions,setScopeOptions] = useState<any>([]);
  const { isModalVisible, isShowModal, editId, actionRef } = props;

  const [form] = Form.useForm();
  const { message } = App.useApp();

  const intl = useIntl();

  const title = editId === undefined ?
    intl.formatMessage({ id: 'modal.createOrUpdateForm.create.title', defaultMessage: '添加' }) :
    intl.formatMessage({ id: 'modal.createOrUpdateForm.edit.title', defaultMessage: '编辑' });

  const fetchApi = async () => {
    const scopeOptions = [
      {
        label: intl.formatMessage({ id: 'modal.createOrUpdateForm.scope.all', defaultMessage: '全部数据权限'}),
        value: '1'
      },
      {
        label: intl.formatMessage({ id: 'modal.createOrUpdateForm.scope.role', defaultMessage: '相同角色数据权限'}),
        value: '2'
      },{
        label: intl.formatMessage({ id: 'modal.createOrUpdateForm.scope.user', defaultMessage: '仅本人数据权限'}),
        value: '3'
      }
    ];

    setScopeOptions(scopeOptions);

    if (editId !== undefined) {
      const roleRes = await getRole(editId);
      const currentData = roleRes.data;
      setInitialValues({
        name: currentData.name,
        slug: currentData.slug,
        scope: currentData.scope,
        status: currentData.status,
        sort: currentData.sort
      });
    }else{

      form.setFieldsValue({
        sort: 1,
        status: 1
      })
    }
  }

  useAsyncEffect(async () => {
    await fetchApi();
  }, []);

  /**
   * 提交
   */
  const handleOk = async () => {
    try {
      const fieldsValue = await form.validateFields();

      //最终提交数据格式化
      const transformedData  = {
        ...fieldsValue,
        status: fieldsValue.status ? 1 : 0
      }

      if (editId === undefined) {
        await createRole(transformedData);
      } else {
        await updateRole(editId, transformedData);
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
      {Object.keys(initialValues).length === 0 && editId !== undefined ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <Form form={form} initialValues={initialValues} autoComplete="off">
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
            ]}>
            <Input placeholder={
              intl.formatMessage({id: 'modal.createOrUpdateForm.name.placeholder'})
            } />
          </Form.Item>

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
            ]}>
            <Input placeholder={
              intl.formatMessage({ id: 'modal.createOrUpdateForm.slug.placeholder', defaultMessage: '请输入 标识', })
            }
            />
          </Form.Item>

          <Form.Item
            name="scope"
            label={
              intl.formatMessage({id: 'modal.createOrUpdateForm.scope'})
            }
            labelCol={{ span: 3 }}
          >
            <Select options={scopeOptions} placeholder={
              intl.formatMessage({ id: 'modal.createOrUpdateForm.scope.placeholder', defaultMessage: '请选择 数据权限', })
            }/>
          </Form.Item>

          <Form.Item
            name="sort"
            label={
              intl.formatMessage({id: 'modal.createOrUpdateForm.sort'})
            }
            labelCol={{ span: 3 }}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="status"
            label={
              intl.formatMessage({id: 'modal.createOrUpdateForm.status'})
            }
            labelCol={{ span: 3 }}
            valuePropName="checked"
          >
            <Switch
              checkedChildren={intl.formatMessage({id: 'global.switch.checked.label'})}
              unCheckedChildren={intl.formatMessage({id: 'global.switch.unChecked.label'})}
            />
          </Form.Item>

        </Form>
      )}
    </Modal>
  )
};


export default CreateOrEdit;