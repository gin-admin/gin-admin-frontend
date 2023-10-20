import React from 'react';
import { useIntl } from 'umi';
import {
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormRadio,
  ProFormSwitch,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';

type MenuFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.Menu> | undefined>;
  typeDisabled: boolean;
};

const MenuForm: React.FC<MenuFormProps> = (props: MenuFormProps) => {
  const intl = useIntl();

  return (
    <ProForm<API.Menu>
      formRef={props.formRef}
      layout="horizontal"
      grid={true}
      submitter={false}
      initialValues={{ type: 'page', sequence: 0, statusChecked: true, properties: '{\n\n}' }}
    >
      <ProForm.Group
        title={intl.formatMessage({ id: 'pages.system.menu.resource.form.basic' })}
        rowProps={{ gutter: 20 }}
      >
        <ProFormText
          disabled
          name="parent_name"
          label={intl.formatMessage({ id: 'pages.system.menu.form.parent_name' })}
          placeholder=""
          colProps={{ span: 12 }}
        />
        <ProFormRadio.Group
          disabled={props.typeDisabled}
          name="type"
          label={intl.formatMessage({ id: 'pages.system.menu.form.type' })}
          options={[
            {
              label: intl.formatMessage({ id: 'pages.system.menu.form.type.page' }),
              value: 'page',
            },
            {
              label: intl.formatMessage({ id: 'pages.system.menu.form.type.button' }),
              value: 'button',
            },
          ]}
          colProps={{ span: 12 }}
        />
        <ProFormText
          name="name"
          label={intl.formatMessage({ id: 'pages.system.menu.form.name' })}
          placeholder={intl.formatMessage({ id: 'pages.system.menu.form.name.placeholder' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'pages.system.menu.form.name.required' }),
            },
          ]}
          colProps={{ span: 12 }}
        />
        <ProFormText
          name="code"
          label={intl.formatMessage({ id: 'pages.system.menu.form.code' })}
          placeholder={intl.formatMessage({ id: 'pages.system.menu.form.code.placeholder' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'pages.system.menu.form.code.required' }),
            },
          ]}
          colProps={{ span: 12 }}
        />
        <ProFormText
          name="path"
          label={intl.formatMessage({ id: 'pages.system.menu.form.path' })}
          colProps={{ span: 12 }}
        />
        <ProFormText
          name="description"
          label={intl.formatMessage({ id: 'pages.system.menu.form.description' })}
          colProps={{ span: 12 }}
        />
        <ProFormDigit
          name="sequence"
          label={intl.formatMessage({ id: 'pages.system.menu.form.sequence' })}
          colProps={{ span: 12 }}
        />
        <ProFormSwitch
          name="statusChecked"
          label={intl.formatMessage({ id: 'pages.system.menu.form.status' })}
          fieldProps={{
            checkedChildren: intl.formatMessage({ id: 'pages.system.menu.form.status.enabled' }),
            unCheckedChildren: intl.formatMessage({ id: 'pages.system.menu.form.status.disabled' }),
          }}
          colProps={{ span: 12 }}
        />
        <ProFormTextArea
          name="properties"
          tooltip="JSON"
          label={intl.formatMessage({ id: 'pages.system.menu.form.properties' })}
          fieldProps={{ rows: 3 }}
          colProps={{ span: 24 }}
        />
      </ProForm.Group>
    </ProForm>
  );
};

export default MenuForm;
