import { FC, useState } from 'react';
import { useIntl,FormattedMessage } from '@umijs/max';
import { App, Form, Input, InputNumber, Modal, Select, Radio, Skeleton, Switch } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { queryListMaxValue,treeToOrderList } from '@/utils/utils';
import { useAsyncEffect } from 'ahooks';
import { createMenu, getMenu ,updateMenu } from '@/services/auth/MenuController';
import { routeList } from './routeListData';
import {IconSelector} from '@/components';
import { getAllRoles } from '@/services/auth/RoleController';
import { IListOption } from '@/interfaces/tree';

export type CreateOrEditProps = {
  isModalVisible: boolean;
  isShowModal: (show: boolean, id?: number | undefined) => void;
  editId : number;
  menuData: any[];
  actionRef: any;
}

//默认类型
const defaultOptionKeys: IListOption = {
  childrenKey: 'children',
  titleKey: 'name',
  parentIdKey: 'parentId',
  optionIdKey: 'menuId',
  rootNameKey: 'Root',
  fieldsKey: "['sort']",
};

const CreateOrEdit: FC<CreateOrEditProps> = (props: any) => {
  const [treeData, setTreeData] = useState<any>([]);
  const [initialValues, setInitialValues] = useState<any>({});
  const [linkTarget, setLinkTarget] = useState<any>([]);
  const [menuTypes,setMenuTypes] = useState<any>([]);
  const [currentMenuType,setCurrentType] = useState<any>(0);
  const [urlVisible,setUrlVisible] = useState<boolean>(false);
  const {isModalVisible, isShowModal, editId, menuData } = props;

  const [roles, setRoles] = useState<any>([]);
  const [routes, setRoutes] = useState<any>([]);

  const [form] = Form.useForm();
  const { message } = App.useApp();

  const intl = useIntl();

  const title = editId === undefined ?
    intl.formatMessage({ id: 'modal.createOrUpdateForm.create.title', defaultMessage: '添加' }) :
    intl.formatMessage({ id: 'modal.createOrUpdateForm.edit.title', defaultMessage: '编辑' });

  const fetchApi = async () => {
    try {
      //生成树型结构
      const treeValues = treeToOrderList(menuData, defaultOptionKeys);
      setTreeData(treeValues);

      //目标
      const targets = [
        {
          label: intl.formatMessage({ id: 'modal.createOrUpdateForm.target.blank', defaultMessage: '新窗口'}),
          value: '_blank'
        }, {
          label: intl.formatMessage({ id: 'modal.createOrUpdateForm.target.current', defaultMessage: '当前窗口'}),
          value: ''
        },
      ];

      setLinkTarget(targets);

      //类型
      const types = [
        {
          label: intl.formatMessage({ id: 'modal.createOrUpdateForm.menu.directory', defaultMessage: '目录'}),
          value: 1
        }, {
          label: intl.formatMessage({ id: 'modal.createOrUpdateForm.target.menu', defaultMessage: '子菜单'}),
          value: 2
        }, {
          label: intl.formatMessage({ id: 'modal.createOrUpdateForm.target.button', defaultMessage: '按钮'}),
          value: 3
        }
      ]

      setMenuTypes(types);

      //生成路由列表
      if (routeList.length > 0) {
        const _routeList: any[] = [];
        routeList.forEach((item: string) => {
          _routeList.push({
            label: item,
            value: item,
          });
        });
        setRoutes(_routeList);
      }

      //角色列表
      //获取角色列表
      const rolesRes = await getAllRoles();
      const _rolesData = rolesRes.data;
      const _rolesValue: any[] = [];
      _rolesData.forEach((item: any) => {
        _rolesValue.push({ value: item.roleId, label: item.name });
      });
      setRoles(_rolesValue);

      if (editId !== undefined) {
        const menuRes = await getMenu(editId);
        const currentData = menuRes.data;
        let rolesValue: any[] = [];
        if (currentData.roles.length > 0) {
          rolesValue = currentData.roles.map((item: any) => {
            return item.roleId;
          });
        }

        setInitialValues({
          name: currentData.name,
          locale: currentData.locale,
          path: currentData.path,
          type:currentData.type,
          parentId: currentData.parentId,
          target: currentData.target,
          url: currentData.url,
          icon: currentData.icon,
          sort: currentData.sort,
          visible: currentData.visible,
          roleIds: rolesValue
        });

        setCurrentType(currentData.type);
        setUrlVisible(currentData.isExtern);

      }else{
        const sort_max = queryListMaxValue(treeValues, 'sort');
        form.setFieldsValue({
          sort: sort_max + 1,
          type: 1,
          visible: 1
        })
      }
    }catch (error: any){
      message.error(error.message);
    }
  }

  useAsyncEffect(async () => {
    await fetchApi();
  }, []);

  /**
   * 图标
   * @param icon
   */
  const handleIconChange = (icon: string) => {
    setInitialValues({
      ...initialValues,
      icon: icon,
    });
  };

  const onMenuTypeChange = (e: RadioChangeEvent)=>{
    setCurrentType(e.target.value);
  }

  const onSwitchChange = (checked: boolean)=>{
    setUrlVisible(checked);
  }

  const handleOk = async () => {
    try {
      const fieldsValue = await form.validateFields();

      //最终提交数据格式化
      const transformedData  = {
        ...fieldsValue,
        visible: fieldsValue.visible ? 1 : 0
      }

      if (editId === undefined) {
        await createMenu(transformedData );
      } else {
        await updateMenu(editId, transformedData );
      }

      isShowModal(false);

      const defaultUpdateSuccessMessage = editId === undefined ?
        intl.formatMessage({ id: 'global.create.success', defaultMessage: '添加成功！'}):
        intl.formatMessage({ id: 'global.update.success', defaultMessage: '更新成功！'});

      message.success(defaultUpdateSuccessMessage);

      setTimeout(() => {
        window.location.reload();
      }, 100);

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
      {
        Object.keys(initialValues).length === 0 && editId !== undefined ? <Skeleton paragraph={{ rows: 4 }} /> : (
          <Form form={form} initialValues={initialValues} autoComplete="off">
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
              <Select
                options={treeData}
                style={{ width: 400 }}
                placeholder="请选择父级"
              />
            </Form.Item>

            <Form.Item
              name="name"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.name'})
              }
              labelCol={{ span: 3 }}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: 'modal.createOrUpdateForm.name.placeholder',
                  defaultMessage: '请输入 名称！',
                })}
              />
            </Form.Item>

            <Form.Item
              name="type"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.menu.type'})
              }
              labelCol={{ span: 3 }}
            >
              <Radio.Group
                onChange={onMenuTypeChange}
                options={menuTypes}
              />
            </Form.Item>

            {currentMenuType == 1 &&
              <Form.Item
                name="icon"
                label={
                  intl.formatMessage({id: 'modal.createOrUpdateForm.icon'})
                }
                labelCol={{ span: 3 }}
              >
                <IconSelector />
              </Form.Item>
            }

            <Form.Item
              name="locale"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.locale'})
              }
              labelCol={{ span: 3 }}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id='validator.admin.locale.required'
                      defaultMessage='国际化标识是必填项！'
                    />
                  )
                }
              ]}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: 'modal.createOrUpdateForm.locale.placeholder',
                  defaultMessage: '请输入 国际化标识！',
                })}
                style={{ width: 500 }}
              />
            </Form.Item>

            <Form.Item
              name="path"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.router'})
              }
              labelCol={{ span: 3 }}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id='validator.admin.path.required'
                      defaultMessage='路由不能为空！'
                    />
                  )
                }
              ]}
            >
              <Select
                options={routes}
                style={{ width: 400 }}
                placeholder={intl.formatMessage({
                  id: 'modal.createOrUpdateForm.router.placeholder',
                  defaultMessage: '请选择 路由！',
                })}
              />
            </Form.Item>

            {currentMenuType == 3 &&
              <>
                <Form.Item
                  name="isExtern"
                  label={
                    intl.formatMessage({id: 'modal.createOrUpdateForm.menu.isExtern'})
                  }
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren={intl.formatMessage({id: 'global.switch.true.label'})}
                    unCheckedChildren={intl.formatMessage({id: 'global.switch.false.label'})}
                    onChange={onSwitchChange}
                  />
                </Form.Item>

                {urlVisible && <Form.Item
                  name="url"
                  label={
                    intl.formatMessage({id: 'modal.createOrUpdateForm.url'})
                  }
                  labelCol={{ span: 3 }}
                >
                  <Input
                    placeholder={intl.formatMessage({
                      id: 'modal.createOrUpdateForm.url.placeholder',
                      defaultMessage: '请输入 跳转地址！',
                    })}
                    style={{ width: 500 }}
                  />
                </Form.Item>}

                <Form.Item
                  name="target"
                  label={
                    intl.formatMessage({id: 'modal.createOrUpdateForm.target'})
                  }
                  labelCol={{ span: 3 }}
                >
                  <Select
                    options={linkTarget}
                    style={{ width: 250 }}
                    placeholder={intl.formatMessage({
                      id: 'modal.createOrUpdateForm.target.placeholder',
                      defaultMessage: '请选择目标方式！',
                    })}
                  />
                </Form.Item>
              </>
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

            <Form.Item
              name="visible"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.display'})
              }
              labelCol={{ span: 3 }}
              valuePropName="checked"
            >
              <Switch
                checkedChildren={intl.formatMessage({id: 'global.switch.checked.label'})}
                unCheckedChildren={intl.formatMessage({id: 'global.switch.unChecked.label'})}
              />
            </Form.Item>

            <Form.Item
              name="roleIds"
              label={
                intl.formatMessage({id: 'modal.createOrUpdateForm.role'})
              }
              labelCol={{ span: 3 }}
            >
              <Select
                mode="multiple"
                options={roles}
                style={{ width: 500 }}
                placeholder={intl.formatMessage({
                  id: 'modal.createOrUpdateForm.role.placeholder',
                  defaultMessage: '请选择角色',
                })}
              />
            </Form.Item>

          </Form>
        )
      }
    </Modal>
  )
};


export default CreateOrEdit;