import { FC, useState } from 'react';
import { App, Form, Input, InputNumber, Modal, Skeleton, Switch } from 'antd';
import { useIntl,FormattedMessage } from '@umijs/max';
import {createDictData,updateDictData,getDictData} from '@/services/auth/DictDataController';
import { useAsyncEffect } from 'ahooks';
import { getDict } from '@/services/auth/DictController';
const { TextArea } = Input;

export interface CreateOrEditProps {
  isModalVisible: boolean,
  isShowModal: (show: boolean, id?: number | undefined) => void,
  editId : number,
  dictId: number,
  actionRef: any
}

const CreateOrEditDictData:FC<CreateOrEditProps> = (props: any) =>{
  const [initialValues, setInitialValues] = useState<any>({});
  const { isModalVisible, isShowModal, editId, dictId, actionRef } = props;

  const intl = useIntl();

  const [form] = Form.useForm();
  const { message} = App.useApp();

  const title = editId === undefined ?
    intl.formatMessage({ id: 'modal.createOrUpdateForm.create.title', defaultMessage: '添加' }) :
    intl.formatMessage({ id: 'modal.createOrUpdateForm.edit.title', defaultMessage: '编辑' });

  const fetchApi = async () => {
    const dictRes = await getDict(dictId);
    const dictData = dictRes.data;

    if (editId !== undefined) {
      const res = await getDictData(editId);
      const currentData = res.data;
      setInitialValues({
        dictId: currentData.dictId,
        label: currentData.label,
        value: currentData.value,
        sort: currentData.sort,
        status: currentData.status,
        isDefault: currentData.isDefault,
        code: dictData.code
      })
    }else{
      form.setFieldsValue({
        sort: 1,
        status: 1,
        code: dictData.code,
        dictId: dictId
      })
    }
  }


  useAsyncEffect(async () => {
    await fetchApi();
  }, []);

  const handleOk = async() =>{
    try {
      const fieldsValue = await form.validateFields();

      if(editId === undefined){
        await createDictData(fieldsValue)
      }else{
        await updateDictData(editId,fieldsValue);
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
              name="label"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.dict.data.label'})
              }
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id='validator.admin.dict.data.label.required'
                      defaultMessage='数据标签是必填项！'
                    />
                  )
                }
              ]}
            >
              <Input placeholder={
                intl.formatMessage({ id: 'modal.createOrUpdateForm.dict.data.label.placeholder', defaultMessage: '请输入 数据标签', })
              }
              />
            </Form.Item>

            <Form.Item
              name="dictId"
              hidden
            >
              <Input hidden />
            </Form.Item>

            <Form.Item
              name="code"
              hidden
            >
              <Input hidden />
            </Form.Item>

            <Form.Item
              name="value"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.dict.data.value'})
              }
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id='validator.admin.dict.data.value.required'
                      defaultMessage='数据标签是必填项！'
                    />
                  )
                }
              ]}
            >
              <Input placeholder={
                intl.formatMessage({ id: 'modal.createOrUpdateForm.dict.data.value.placeholder', defaultMessage: '请输入 字典键值', })
              }
              />
            </Form.Item>

            <Form.Item
              name="sort"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.sort'})
              }
              labelCol={{ span: 4 }}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="isDefault"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.isDefault'})
              }
              labelCol={{ span: 4 }}
              valuePropName="checked"
            >
              <Switch
                checkedChildren={intl.formatMessage({id: 'global.switch.true.label'})}
                unCheckedChildren={intl.formatMessage({id: 'global.switch.false.label'})}
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

}

export default CreateOrEditDictData;