import React from 'react';
import { useIntl } from 'umi';
import { ProFormList, ProFormText, ProFormSelect, ProForm } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';

type ResourceFormProps = {
  formRef: React.MutableRefObject<ProFormInstance<API.Menu> | undefined>;
};

const ResourceForm: React.FC<ResourceFormProps> = (props: ResourceFormProps) => {
  const intl = useIntl();

  return (
    <ProForm<API.Menu> formRef={props.formRef} grid={true} submitter={false}>
      <ProForm.Group title={intl.formatMessage({ id: 'pages.system.menu.resource.form.title' })}>
        <ProFormList
          name="resources"
          copyIconProps={false}
          creatorButtonProps={{
            creatorButtonText: intl.formatMessage({ id: 'button.add' }),
          }}
          alwaysShowItemLabel={false}
          initialValue={[{ method: 'GET' }]}
          creatorRecord={{ method: 'GET' }}
        >
          <ProForm.Group key="id">
            <ProFormSelect
              name="method"
              label={intl.formatMessage({ id: 'pages.system.menu.resource.form.method' })}
              placeholder={intl.formatMessage({
                id: 'pages.system.menu.resource.form.method.placeholder',
              })}
              allowClear={false}
              options={['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD']}
              colProps={{
                span: 6,
              }}
            />
            <ProFormText
              label={intl.formatMessage({ id: 'pages.system.menu.resource.form.path' })}
              name="path"
              placeholder={intl.formatMessage({
                id: 'pages.system.menu.resource.form.path.placeholder',
              })}
              colProps={{
                span: 18,
              }}
            />
          </ProForm.Group>
        </ProFormList>
      </ProForm.Group>
    </ProForm>
  );
};

export default ResourceForm;
