import { FC, useState } from 'react';
import { CreateOrEditProps } from '@/interfaces/modal';
import { App, Form, Input, Modal, Skeleton, Switch } from 'antd';
import { useIntl,FormattedMessage } from '@umijs/max';
import { createDict, getDict, updateDict } from '@/services/auth/DictController';
import { useAsyncEffect } from 'ahooks';

const { TextArea } = Input;

const CreateOrEdit: FC<CreateOrEditProps> = (props: any) => {
  const [initialValues, setInitialValues] = useState<any>({});
  const { isModalVisible, isShowModal, editId, actionRef } = props;

  const intl = useIntl();

  const [form] = Form.useForm();
  const { message} = App.useApp();

  const title = editId === undefined ?
    intl.formatMessage({ id: 'modal.createOrUpdateForm.create.title', defaultMessage: '添加' }) :
    intl.formatMessage({ id: 'modal.createOrUpdateForm.edit.title', defaultMessage: '编辑' });


  const fetchApi = async () => {
    if (editId !== undefined) {
      const res = await getDict(editId);
      const currentData = res.data;
      setInitialValues({
        name: currentData.name,
        code: currentData.code,
        status: currentData.status,
        remark: currentData.remark
      })
    }else{
      form.setFieldsValue({
        status: 1
      })
    }
  }

  useAsyncEffect(async () => {
    await fetchApi();
  }, []);

  const handleOk = async() =>{
    try {
      const fieldsValue = await form.validateFields();

      //最终提交数据格式化
      const transformedData  = {
        ...fieldsValue,
        status: fieldsValue.status ? 1 : 0
      }

      if(editId === undefined){
        await createDict(transformedData)
      }else{
        await updateDict(editId,transformedData);
      }
      isShowModal(false);

      const defaultUpdateSuccessMessage = editId === undefined ?
        intl.formatMessage({ id: 'global.create.success', defaultMessage: '添加成功！'}):
        intl.formatMessage({ id: 'global.update.success', defaultMessage: '更新成功！'});

      message.success(defaultUpdateSuccessMessage);
      actionRef.current.reload();
    }catch (error: any){

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
      {
        Object.keys(initialValues).length === 0 && editId !== undefined ? (<Skeleton paragraph={{ rows: 4 }} />) : (
          <Form form={form} initialValues={initialValues} autoComplete="off">
            <Form.Item
              name="name"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.name'})
              }
              labelCol={{ span: 4 }}
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
              <Input placeholder={
                intl.formatMessage({ id: 'modal.createOrUpdateForm.name.placeholder', defaultMessage: '请输入 名称', })
              }
              />
            </Form.Item>

            <Form.Item
              name="code"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.dict.code'})
              }
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id='validator.admin.dict.code.required'
                      defaultMessage='编码是必填项！'
                    />
                  )
                }
              ]}
            >
              <Input placeholder={
                intl.formatMessage({ id: 'modal.createOrUpdateForm.dict.code.placeholder', defaultMessage: '请输入 编码', })
              }
              />
            </Form.Item>

            <Form.Item
              name="status"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.status'})
              }
              labelCol={{ span: 4 }}
              valuePropName="checked"
            >
              <Switch
                checkedChildren={intl.formatMessage({id: 'global.switch.checked.label'})}
                unCheckedChildren={intl.formatMessage({id: 'global.switch.unChecked.label'})}
              />
            </Form.Item>


            <Form.Item
              name="remark"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.remark'})
              }
              labelCol={{ span: 4 }}
            >
              <TextArea
                placeholder={
                  intl.formatMessage({ id: 'modal.createOrUpdateForm.remark.placeholder', defaultMessage: '请输入 备注', })
                }
              />

            </Form.Item>
          </Form>
        )
      }
    </Modal>
  )
};

export default CreateOrEdit;







