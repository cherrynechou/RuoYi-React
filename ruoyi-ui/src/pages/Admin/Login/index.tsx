import { FC, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, history, SelectLang, useModel, useIntl } from '@umijs/max';
import type { FormProps } from 'antd';
import { Button, Form, Image, Input, App, Row } from 'antd';
import { flushSync } from 'react-dom';
import { createStyles } from 'antd-style';
import localforage from 'localforage';

import { login } from '@/services/system/CommonController';

import backgroundImage from '@/assets/images/background.png';
import logoIcon from '@/assets/images/logo.png';

export type LoginFieldProps = {
  userName?: string;
  password?: string;
};

export type AccessTokenEntity = {
  accessToken: string;
  refreshToken: string;
};

const useStyles = createStyles(({ token, css }) => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      height: '100%',
      backgroundSize: 'contain',
    },
    lang:{
      width: '42px',
      height: '42px',
      lineHeight: '42px',
      position: 'fixed',
      right: '16px'
    },
    boxContainer: {
      width: '400px',
      padding: '33px',
      marginTop: '170px',
      backgroundColor: '#fff',
    },
    loginHeader: {
      marginBottom: '20px',
    },
    loginDesc: {
      fontSize: '20px',
      fontWeight: '600',
      paddingLeft: '20px'
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const intl = useIntl();

  const { message } = App.useApp();

  /**
   * 设置凭证
   * @param data
   */
  const setToken = async (data: AccessTokenEntity) => {
    await localforage.setItem('access_token', data.accessToken);
    await localforage.setItem('refresh_token',data.refreshToken);
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s: any) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  /**
   * 用户登录
   * @param values
   */
  const onFinish: FormProps<LoginFieldProps>['onFinish'] = async (values) => {
    setSubmitting(true);
    try {
      const { data } = await login(values);
      await setToken(data);
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'message.login.success',
        defaultMessage: '登录成功！',
      });

      message.success(defaultLoginSuccessMessage);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } catch (error: any) {
      message.error(error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Lang />
      <Row align="top" justify="center" className="px-3" style={{ minHeight: '100vh', background: '#fff' }}>
        <div className={styles.boxContainer}>
          <div className={`flex items-center ${styles.loginHeader}`}>
            <Image src={logoIcon} width={'15%'} height={'15%'} alt="logo" />
            <span className={styles.loginDesc}>
              <FormattedMessage id="pages.login.title" />
            </span>
          </div>

          <Form
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="userName"
              rules={[
               {
                 required: true,
                 message: (
                   <FormattedMessage
                     id='validator.login.username.required'
                     defaultMessage='请输入用户名'
                   />
                 )
               }
             ]}>
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '请输入用户名！',
                })}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
               {
                 required: true,
                 message: (
                   <FormattedMessage
                     id='validator.login.password.required'
                     defaultMessage='请输入密码'
                   />
                 )
               }
             ]}>
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '请输入密码！',
                })}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={submitting} block>
                <FormattedMessage id='pages.login.submit' />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Row>
    </div>
  );
};

export default Login;
