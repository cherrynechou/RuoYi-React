import { FC } from 'react';
import { App, Drawer } from 'antd';
import { useIntl } from '@umijs/max';


export type CreateOrEditProps = {
  isDrawerVisible: boolean;
  isShowDrawer: (show: boolean, id?: number | undefined) => void;
  editId : number;
  actionRef: any;
}

//创建角色权限
const CreateOrEditPermission: FC<CreateOrEditProps> = (props: any) => {
  const { isDrawerVisible, isShowDrawer, editId, actionRef } = props;

  const { message } = App.useApp();

  const intl = useIntl();

  const title = editId === undefined ?
    intl.formatMessage({ id: 'modal.createOrUpdateForm.create.title', defaultMessage: '添加' }) :
    intl.formatMessage({ id: 'modal.createOrUpdateForm.edit.title', defaultMessage: '编辑' });

  return (
    <Drawer
      title={title}
      open={isDrawerVisible}
      onClose={() => isShowDrawer(false)}
      width={750}
    >

    </Drawer>
  )
}

export default CreateOrEditPermission;