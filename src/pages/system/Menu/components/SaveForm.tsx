import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'umi';
import { message, Modal } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-components';
import { addMenu, getMenu, updateMenu } from '@/services/system/menu';
import MenuForm from './MenuForm';
import ResourceForm from './ResourceForm';

type MenuModalProps = {
  onSuccess: () => void;
  onCancel: () => void;
  visible: boolean;
  id?: string;
  parentID?: string;
  title: string;
};

const MenuModal: React.FC<MenuModalProps> = (props: MenuModalProps) => {
  const intl = useIntl();
  const menuFormRef = useRef<ProFormInstance<API.Menu>>();
  const resourceFormRef = useRef<ProFormInstance<API.Menu>>();
  const [formData, setFormData] = useState<API.Menu>({});

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    menuFormRef.current?.resetFields();
    resourceFormRef.current?.resetFields();
    if (props.parentID) {
      getMenu(props.parentID).then((res) => {
        menuFormRef.current?.setFieldValue('parent_name', `${res.data?.name}`);
      });
    }

    if (props.id) {
      getMenu(props.id).then(async (res) => {
        if (res.data) {
          const data = res.data;
          data.statusChecked = data.status === 'enabled';
          menuFormRef.current?.setFieldsValue(data);
          resourceFormRef.current?.setFieldsValue(data);
          setFormData(data);
        }
      });
    }
  }, [props]);

  const handleFinish = async () => {
    const menu = await menuFormRef.current?.validateFields();
    if (menu) {
      menu.parent_id = props.parentID;
      menu.status = menu.statusChecked ? 'enabled' : 'disabled';
      delete menu.statusChecked;
      delete menu.parent_name;

      const resource = await resourceFormRef.current?.validateFields();
      if (resource) {
        menu.resources = resource?.resources;
      }

      if (props.id) {
        delete formData.resources;
        await updateMenu(props.id, { ...formData, ...menu });
      } else {
        await addMenu(menu);
      }
      message.success(intl.formatMessage({ id: 'component.message.success.save' }));
      props.onSuccess();
    }
  };

  return (
    <Modal
      open={props.visible}
      title={props.title}
      width={800}
      destroyOnClose
      maskClosable={false}
      okText={intl.formatMessage({ id: 'button.confirm' })}
      cancelText={intl.formatMessage({ id: 'button.cancel' })}
      onOk={async () => {
        try {
          await handleFinish();
        } catch {
          message.error(intl.formatMessage({ id: 'component.message.error.save' }));
        }
      }}
      onCancel={props.onCancel}
    >
      <MenuForm
        formRef={menuFormRef}
        typeDisabled={(props.parentID ? false : true) || props.id ? true : false}
      />
      <ResourceForm formRef={resourceFormRef} />
    </Modal>
  );
};

export default MenuModal;
