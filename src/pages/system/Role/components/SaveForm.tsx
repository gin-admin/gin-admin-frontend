import React, { useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormSwitch,
  ProForm,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import MenuTree from './MenuTree';
import { addRole, getRole, updateRole } from '@/services/system/role';

type RoleModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  id?: string;
};

const RoleModal: React.FC<RoleModalProps> = (props: RoleModalProps) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance<API.Role>>();
  const [roleData, setRoleData] = React.useState<API.Role>();

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    formRef.current?.resetFields();
    if (props.id) {
      getRole(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          setRoleData(data);
          data.statusChecked = data.status === 'enabled';
          formRef.current?.setFieldsValue(data);
        }
      });
    }
  }, [props]);

  return (
    <ModalForm<API.Role>
      visible={props.visible}
      title={props.title}
      width={650}
      formRef={formRef}
      layout="horizontal"
      grid={true}
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
      onFinish={async (values: API.Role) => {
        values.status = values.statusChecked ? 'enabled' : 'disabled';
        delete values.statusChecked;

        if (!values.menus || values.menus.length === 0) {
          message.warning(intl.formatMessage({ id: 'pages.system.role.form.menu.required' }));
          return false;
        }

        if (props.id) {
          if (roleData?.menus) {
            const menus = values.menus!;
            for (let i = 0; i < menus.length; i++) {
              for (let j = 0; j < roleData.menus.length; j++) {
                if (menus[i].menu_id === roleData.menus[j].menu_id) {
                  menus[i].id = roleData.menus[j].id;
                  break;
                }
              }
            }
            values.menus = menus;
          }
          await updateRole(props.id, values);
        } else {
          await addRole(values);
        }

        message.success(intl.formatMessage({ id: 'component.message.success.save' }));
        props.onSuccess();
        return true;
      }}
      initialValues={{ sequence: 0, statusChecked: true }}
    >
      <ProForm.Group
        title={intl.formatMessage({ id: 'pages.system.role.form.basic' })}
        rowProps={{ gutter: 20 }}
      >
        <ProFormText
          name="name"
          label={intl.formatMessage({ id: 'pages.system.role.form.name' })}
          placeholder={intl.formatMessage({ id: 'pages.system.role.form.name.placeholder' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'pages.system.role.form.name.required' }),
            },
          ]}
          colProps={{ span: 12 }}
        />
        <ProFormText
          name="code"
          label={intl.formatMessage({ id: 'pages.system.role.form.code' })}
          placeholder={intl.formatMessage({ id: 'pages.system.role.form.code.placeholder' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'pages.system.role.form.code.required' }),
            },
          ]}
          colProps={{ span: 12 }}
        />
        <ProFormTextArea
          name="description"
          label={intl.formatMessage({ id: 'pages.system.menu.form.description' })}
          fieldProps={{ rows: 1 }}
          colProps={{ span: 24 }}
        />
        <ProFormDigit
          name="sequence"
          label={intl.formatMessage({ id: 'pages.system.role.form.sequence' })}
          colProps={{ span: 12 }}
          wrapperCol={{ span: 12 }}
        />
        <ProFormSwitch
          name="statusChecked"
          label={intl.formatMessage({ id: 'pages.system.role.form.status' })}
          fieldProps={{
            checkedChildren: intl.formatMessage({ id: 'pages.system.role.form.status.enabled' }),
            unCheckedChildren: intl.formatMessage({ id: 'pages.system.role.form.status.disabled' }),
          }}
          colProps={{ span: 12 }}
        />
      </ProForm.Group>
      <ProForm.Group title={intl.formatMessage({ id: 'pages.system.role.form.menu' })}>
        <ProForm.Item name="menus" noStyle>
          <MenuTree />
        </ProForm.Item>
      </ProForm.Group>
    </ModalForm>
  );
};

export default RoleModal;
