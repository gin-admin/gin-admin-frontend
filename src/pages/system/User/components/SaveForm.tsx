import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { message, Col } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormItem,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import RoleSelect from './RoleSelect';
import { addUser, getUser, updateUser } from '@/services/system/user';
import { Util } from '@/utils';

type UserModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const UserModal: React.FC<UserModalProps> = (props: UserModalProps) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance<API.User>>();
  const [userData, setUserData] = useState<API.User>();

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      getUser(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          setUserData(data);
          data.statusChecked = data.status === 'activated';
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  return (
    <ModalForm<API.User>
      visible={props.visible}
      title={props.title}
      width={800}
      formRef={formRef}
      layout="horizontal"
      grid={true}
      rowProps={{ gutter: 20 }}
      submitTimeout={3000}
      submitter={{
        searchConfig: {
          submitText: intl.formatMessage({ id: 'button.confirm' }),
          resetText: intl.formatMessage({ id: 'button.cancel' }),
        },
      }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: () => {
          props.onCancel();
        },
      }}
      onFinish={async (values: API.User) => {
        values.status = values.statusChecked ? 'activated' : 'freezed';
        delete values.statusChecked;
        values.password = values.password ? Util.md5(values.password) : undefined;

        if (props.id) {
          if (userData?.roles) {
            const roles = values.roles!;
            for (let i = 0; i < roles.length; i++) {
              for (let j = 0; j < userData?.roles?.length; j++) {
                if (roles[i].role_id === userData?.roles[j].role_id) {
                  roles[i].id = userData?.roles[j].id;
                  break;
                }
              }
            }
            values.roles = roles;
          }
          await updateUser(props.id, values);
        } else {
          await addUser(values);
        }

        message.success(intl.formatMessage({ id: 'component.message.success.save' }));
        props.onSuccess();
        return true;
      }}
      initialValues={{ statusChecked: true }}
    >
      <ProFormText
        name="username"
        label={intl.formatMessage({ id: 'pages.system.user.form.username' })}
        placeholder={intl.formatMessage({ id: 'pages.system.user.form.username.placeholder' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'pages.system.user.form.username.required' }),
          },
        ]}
        colProps={{ span: 12 }}
      />
      <ProFormText.Password
        name="password"
        label={intl.formatMessage({ id: 'pages.system.user.form.password' })}
        placeholder={
          props.id
            ? intl.formatMessage({ id: 'pages.system.user.form.password.update.placeholder' })
            : intl.formatMessage({ id: 'pages.system.user.form.password.placeholder' })
        }
        colProps={{ span: 12 }}
      />
      <ProFormText
        name="name"
        label={intl.formatMessage({ id: 'pages.system.user.form.name' })}
        placeholder={intl.formatMessage({ id: 'pages.system.user.form.name.placeholder' })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({ id: 'pages.system.user.form.name.required' }),
          },
        ]}
        colProps={{ span: 12 }}
      />
      <Col span={12}>
        <ProFormItem
          name="roles"
          label={intl.formatMessage({ id: 'pages.system.user.form.roles' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'pages.system.user.form.roles.required' }),
            },
          ]}
        >
          <RoleSelect
            placeholder={intl.formatMessage({ id: 'pages.system.user.form.roles.placeholder' })}
          />
        </ProFormItem>
      </Col>
      <ProFormText
        name="email"
        label={intl.formatMessage({ id: 'pages.system.user.form.email' })}
        placeholder={intl.formatMessage({ id: 'pages.system.user.form.email.placeholder' })}
        colProps={{ span: 12 }}
      />
      <ProFormText
        name="phone"
        label={intl.formatMessage({ id: 'pages.system.user.form.phone' })}
        placeholder={intl.formatMessage({ id: 'pages.system.user.form.phone.placeholder' })}
        colProps={{ span: 12 }}
      />
      <ProFormTextArea
        name="remark"
        label={intl.formatMessage({ id: 'pages.system.user.form.remark' })}
        fieldProps={{ rows: 2 }}
        colProps={{ span: 24 }}
      />
      <ProFormSwitch
        name="statusChecked"
        label={intl.formatMessage({ id: 'pages.system.user.form.status' })}
        fieldProps={{
          checkedChildren: intl.formatMessage({ id: 'pages.system.user.form.status.activated' }),
          unCheckedChildren: intl.formatMessage({ id: 'pages.system.user.form.status.freezed' }),
        }}
        colProps={{ span: 12 }}
      />
    </ModalForm>
  );
};

export default UserModal;
