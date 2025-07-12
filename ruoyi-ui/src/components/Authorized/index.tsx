import { FC } from 'react';
import { useAccess, Access } from '@umijs/max';
import { Button, Result } from 'antd';
import { FormattedMessage, history } from '@@/exports';

export type AuthorizedProps =  {
  children: any,
  perms: string
}

const NoAuthorized: FC = () => (
  <Result
    status="403"
    title="403"
    subTitle={<FormattedMessage id='pages.403.subTitle'/>}
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        {<FormattedMessage id='pages.403.buttonText'/>}
      </Button>
    }
  />
);

const Authorized: FC<AuthorizedProps> = ( props: any )=>{
  const access = useAccess();
  const { children,perms } = props;
  return (
    <Access accessible={access.hasPerms(perms)} fallback={<NoAuthorized />}>
      {children}
    </Access>
  )
}

export default Authorized;