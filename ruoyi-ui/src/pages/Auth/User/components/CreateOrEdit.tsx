import { FC, useState } from 'react';
import { CreateOrEditProps } from '@/interfaces/modal';
import { useIntl,FormattedMessage } from '@umijs/max';
import { Form, Input, App, Modal, Select, Skeleton, Tree } from 'antd';
import { createUser, getUser, updateUser } from '@/services/auth/UserController';
import { useAsyncEffect } from 'ahooks';
import { getAllRoles } from '@/services/auth/RoleController';
import { map, pick } from 'lodash-es';
import { ImageUpload } from '@/components';
import { UploadFile } from 'antd/es/upload/interface';

const CreateOrEdit: FC<CreateOrEditProps> = (props: any) => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [roles, setRoles] = useState<any>([]);
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);
  const { isModalVisible, isShowModal, editId, actionRef } = props;

  const intl = useIntl();

  const [form] = Form.useForm();
  const { message} = App.useApp();

  const title = editId === undefined ?
    intl.formatMessage({ id: 'modal.createOrUpdateForm.create.title', defaultMessage: '添加' }) :
    intl.formatMessage({ id: 'modal.createOrUpdateForm.edit.title', defaultMessage: '编辑' });

  const fetchApi = async () => {
    try {
      const roleRes = await getAllRoles();

      const _roleData = roleRes.data;
      const _roleList = map(_roleData,(item:any)=>{
        return {label: item.name, value: item.roleId};
      });
      setRoles(_roleList);

      if (editId !== undefined) {
        const userRes = await getUser(editId);
        const currentData = userRes.data;

        const roleList: any[] = [];
        currentData.roles.forEach((item: any) => {
          roleList.push(item.roleId);
        });

        setAvatarFileList([
          {
            uid: currentData.id,
            name: currentData.avatar,
            status: 'done',
            url: currentData.avatarUrl,
          },
        ]);

        setInitialValues({
          userName: currentData.userName,
          nickName: currentData.nickName,
          avatar: currentData.avatar,
          roleIds: roleList,
        });

      }
    }catch (error: any){
      message.error(error.message);
    }
  }

  useAsyncEffect(async () => {
    await fetchApi();
  }, []);


  /**
   * 处理回调
   * @param fileList
   */
  const handleAvatarImageChange = (fileList: any) => {
    form.setFieldsValue({
      avatar: fileList.length === 0 ? '' : fileList.pop(),
    });
  };

  /**
   * 提交
   */
  const handleOk = async () => {
    try {
      const fieldsValue = await form.validateFields();

      //去掉 confirm
      const fieldsPostValue = pick(fieldsValue, ['nickName', 'userName', 'avatar', 'roleIds', 'password', 'permissions']);
      if (editId === undefined) {
         await createUser(fieldsPostValue);
      } else {
         await updateUser(editId, fieldsPostValue);
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
  };


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
              name="userName"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.username'})
              }
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id='validator.admin.username.required'
                      defaultMessage='用户名是必填项！'
                    />
                  )
                }
              ]}
            >
              <Input placeholder={
                intl.formatMessage({ id: 'modal.createOrUpdateForm.username.placeholder', defaultMessage: '请输入 用户名', })
              }
              />
            </Form.Item>

            <Form.Item
              name="nickName"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.nickname'})
              }
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id='validator.admin.nickname.required'
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

            <Form.Item name="avatar" hidden>
              <Input hidden />
            </Form.Item>

            {/*头像*/}
            <Form.Item
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.avatar'})
              }
              labelCol={{ span: 4 }}
            >
              <ImageUpload
                accept="image/*"
                listType="picture-card"
                fileList={avatarFileList}
                maxCount={1}
                onUploadChange={handleAvatarImageChange}
              />
            </Form.Item>

            {/*添加*/}
            {editId === undefined && (
              <>
                <Form.Item
                  name="password"
                  label={
                    intl.formatMessage({id: 'modal.createOrUpdateForm.password'})
                  }
                  labelCol={{ span: 4 }}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id='validator.admin.password.required'
                          defaultMessage='密码不能为空！'
                        />
                      ),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value.length >= 6) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error( intl.formatMessage({id: 'message.password.length.failure'})));
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder={
                      intl.formatMessage({id: 'modal.createOrUpdateForm.password.placeholder'})
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label={
                    intl.formatMessage({id: 'modal.createOrUpdateForm.password.confirm'})
                  }
                  labelCol={{ span: 4 }}
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id='validator.admin.password.confirm.required'
                          defaultMessage='请确认你的密码！'
                        />
                      ),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(intl.formatMessage({id: 'message.password.not.match'})));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder={
                      intl.formatMessage({id: 'modal.createOrUpdateForm.password.confirm.placeholder'})
                    }
                  />
                </Form.Item>
              </>
            )}

            {/*编辑*/}
            {editId !== undefined && (
              <>
                <Form.Item
                  name="password"
                  label={
                    intl.formatMessage({id: 'modal.createOrUpdateForm.password'})
                  }
                  labelCol={{ span: 4 }}
                  hasFeedback
                >
                  <Input.Password
                    placeholder={
                      intl.formatMessage({id: 'modal.createOrUpdateForm.password.placeholder'})
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label={
                    intl.formatMessage({id: 'modal.createOrUpdateForm.password.confirm'})
                  }
                  labelCol={{ span: 4 }}
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(intl.formatMessage({id: 'message.password.not.match'})));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder={
                      intl.formatMessage({id: 'modal.createOrUpdateForm.password.confirm.placeholder'})
                    }
                  />
                </Form.Item>
              </>
            )}

            <Form.Item
              name="telephone"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.telephone'})
              }
              labelCol={{ span: 4 }}
            >
              <Input placeholder={
                intl.formatMessage({ id: 'modal.createOrUpdateForm.telephone.placeholder', defaultMessage: '请输入 手机号', })
              }
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.email'})
              }
              labelCol={{ span: 4 }}
            >
              <Input placeholder={
                intl.formatMessage({ id: 'modal.createOrUpdateForm.email.placeholder', defaultMessage: '请输入 邮箱', })
              }
              />
            </Form.Item>

            <Form.Item
              name="roleIds"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.role'})
              }
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id='validator.admin.role.required'
                      defaultMessage='角色是必填项！'
                    />
                  )
                }
              ]}
            >
              <Select
                mode="multiple"
                options={roles}
                placeholder={
                  intl.formatMessage({id: 'modal.createOrUpdateForm.role.placeholder'})
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
