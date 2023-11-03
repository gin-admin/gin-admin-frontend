import { PageContainer, ProFormItem } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { useIntl, useModel } from 'umi';
import { Tabs, message, Col, Row, Space, Tag } from 'antd';
import { ProForm, ProFormText, ProFormSwitch, ProFormTextArea } from '@ant-design/pro-components';
import { updateCurrentUser, updateCurrentPassword } from '@/services/system/login';
import { Util } from '@/utils';
import type { ProFormInstance } from '@ant-design/pro-components';

const Profile: React.FC = () => {
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const securityFormRef = useRef<ProFormInstance<API.UpdateLoginPassword>>();

  const fetchInitData = async () => {
    const initData = await initialState?.fetchInitData?.();
    if (initData) {
      await setInitialState((s) => ({
        ...s,
        ...initData,
      }));
    }
  };

  return (
    <PageContainer title={intl.formatMessage({ id: 'menu.account.settings' })}>
      <Tabs
        tabPosition="left"
        defaultActiveKey="profile"
        style={{ background: '#fff', paddingTop: 25, paddingBottom: 50 }}
      >
        <Tabs.TabPane
          style={{ justifyContent: 'center' }}
          tab={intl.formatMessage({ id: 'pages.user.profile.tab.basic' })}
          key="basic"
        >
          <ProForm<API.User>
            style={{ width: 500 }}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({ id: 'button.save' }),
                resetText: '',
              },
              render: (props, doms) => {
                return (
                  <Row>
                    <Col span={14} offset={6}>
                      <Space>{doms}</Space>
                    </Col>
                  </Row>
                );
              },
            }}
            initialValues={initialState?.currentUser}
            onFinish={async (values: API.User) => {
              await updateCurrentUser({
                name: values.name,
                phone: values.phone,
                email: values.email,
                remark: values.remark,
              });
              message.success(intl.formatMessage({ id: 'component.message.success.save' }));
              await fetchInitData();
              return true;
            }}
          >
            <ProFormText
              name="username"
              label={intl.formatMessage({ id: 'pages.system.user.form.username' })}
              disabled
            />
            {initialState?.currentUser?.roles?.length === 0 && (
              <Col span={24}>
                <ProFormItem label={intl.formatMessage({ id: 'pages.system.user.form.roles' })}>
                  <Space wrap>
                    {initialState?.currentUser?.roles?.map((role) => (
                      <Tag color="processing" key={role.id}>
                        {role.role_name}
                      </Tag>
                    ))}
                  </Space>
                </ProFormItem>
              </Col>
            )}
            <ProFormText
              name="name"
              label={intl.formatMessage({ id: 'pages.system.user.form.name' })}
            />
            <ProFormText
              name="email"
              label={intl.formatMessage({ id: 'pages.system.user.form.email' })}
              placeholder={intl.formatMessage({ id: 'pages.system.user.form.email.placeholder' })}
            />
            <ProFormText
              name="phone"
              label={intl.formatMessage({ id: 'pages.system.user.form.phone' })}
              placeholder={intl.formatMessage({ id: 'pages.system.user.form.phone.placeholder' })}
            />
            <ProFormTextArea
              name="remark"
              label={intl.formatMessage({ id: 'pages.system.user.form.remark' })}
              fieldProps={{ rows: 2 }}
            />
            <ProFormSwitch
              name="statusChecked"
              label={intl.formatMessage({ id: 'pages.system.user.form.status' })}
              fieldProps={{
                checkedChildren: intl.formatMessage({
                  id: 'pages.system.user.form.status.activated',
                }),
                unCheckedChildren: intl.formatMessage({
                  id: 'pages.system.user.form.status.freezed',
                }),
              }}
              disabled
            />
          </ProForm>
        </Tabs.TabPane>
        <Tabs.TabPane
          style={{ justifyContent: 'center' }}
          tab={intl.formatMessage({ id: 'pages.user.profile.tab.security' })}
          key="security"
        >
          <ProForm<API.UpdateLoginPassword>
            formRef={securityFormRef}
            style={{ width: 500 }}
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({ id: 'button.confirm' }),
                resetText: '',
              },
              render: (props, doms) => {
                return (
                  <Row>
                    <Col span={14} offset={6}>
                      <Space>{doms}</Space>
                    </Col>
                  </Row>
                );
              },
            }}
            initialValues={initialState?.currentUser}
            onFinish={async (values: API.UpdateLoginPassword) => {
              if (values.new_password !== values.confirm_password) {
                message.error(
                  intl.formatMessage({
                    id: 'pages.user.profile.tab.security.form.confirm_password.validator',
                  }),
                );
                return false;
              }
              await updateCurrentPassword({
                old_password: Util.md5(values.old_password),
                new_password: Util.md5(values.new_password),
              });
              message.success(intl.formatMessage({ id: 'component.message.success.save' }));
              securityFormRef.current?.resetFields();
              return true;
            }}
          >
            <ProFormText.Password
              name="old_password"
              label={intl.formatMessage({
                id: 'pages.user.profile.tab.security.form.old_password',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.user.profile.tab.security.form.old_password.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.user.profile.tab.security.form.old_password.required',
                  }),
                },
              ]}
            />
            <ProFormText.Password
              name="new_password"
              label={intl.formatMessage({
                id: 'pages.user.profile.tab.security.form.password',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.user.profile.tab.security.form.password.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.user.profile.tab.security.form.password.required',
                  }),
                },
              ]}
            />
            <ProFormText.Password
              name="confirm_password"
              label={intl.formatMessage({
                id: 'pages.user.profile.tab.security.form.confirm_password',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.user.profile.tab.security.form.confirm_password.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'pages.user.profile.tab.security.form.confirm_password.required',
                  }),
                },
              ]}
            />
          </ProForm>
        </Tabs.TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Profile;
