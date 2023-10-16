import { LockOutlined, UserOutlined, SafetyOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { message, Col, Row, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import Settings from '../../../../config/defaultSettings';
import { history, useModel, useIntl, SelectLang, Helmet } from 'umi';
import { getCaptchaId, getCaptchaImageURL, login } from '@/services/system/login';
import styles from './index.less';
import { Util, Auth } from '@/utils';

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const [captchaID, setCaptchaID] = useState('');
  const [captchaURL, setCaptchaURL] = useState('');

  const fetchCaptchaID = () => {
    getCaptchaId().then((res?) => {
      if (res && res.data && res.data.captcha_id) {
        const cid = res.data.captcha_id;
        setCaptchaID(cid);
        setCaptchaURL(getCaptchaImageURL(cid));
      }
    });
  };

  useEffect(() => {
    fetchCaptchaID();
  }, []);

  const fetchInitData = async () => {
    const initData = await initialState?.fetchInitData?.();
    if (initData) {
      await setInitialState((s) => ({
        ...s,
        ...initData,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginForm) => {
    try {
      values.captcha_id = captchaID;
      values.password = Util.md5(values.password);
      const result = await login({ ...values });
      if (result.success) {
        message.success(
          intl.formatMessage({ id: 'pages.login.success', defaultMessage: '登录成功' }),
        );
        Util.setUsername(values.username);

        if (result.data?.access_token) {
          Auth.setToken(
            result.data?.access_token,
            result.data?.token_type,
            result.data?.expires_at,
          );
        }
        await fetchInitData();

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      if (result.error) {
        console.error(result.error?.detail || '');
      }
      message.error(intl.formatMessage({ id: 'pages.login.failure', defaultMessage: '登录失败' }));
    } catch (error) {
      const e = error as { data: API.ResponseResult<any> };
      if (e.data.error) {
        console.error(e.data.error?.detail || '');
      }
      message.error(intl.formatMessage({ id: 'pages.login.failure', defaultMessage: '登录失败' }));
    }

    fetchCaptchaID();
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title={Settings.title?.toString()}
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            login_name: Util.getUsername(),
          }}
          actions={null}
          submitter={{
            searchConfig: {
              submitText: intl.formatMessage({ id: 'pages.login.submit', defaultMessage: '登录' }),
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginForm);
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '请输入用户名',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'pages.login.username.required',
                  defaultMessage: '请输入用户名!',
                }),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '请输入密码',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'pages.login.password.required',
                  defaultMessage: '请输入密码！',
                }),
              },
            ]}
          />

          <Row justify={'space-between'} gutter={8}>
            <Col span={17}>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <SafetyOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: '请输入验证码',
                })}
                name="captcha_code"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'pages.login.captcha.required',
                      defaultMessage: '请输入验证码！',
                    }),
                  },
                ]}
              />
            </Col>
            <Col span={7}>
              <Button
                loading={captchaURL ? false : true}
                style={{ height: 40, width: '100%', padding: 0, overflow: 'hidden' }}
                onClick={() => {
                  setCaptchaURL(getCaptchaImageURL(captchaID));
                }}
              >
                {captchaURL && (
                  <img src={captchaURL} alt="" style={{ width: '100%', height: '100%' }} />
                )}
              </Button>
            </Col>
          </Row>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
