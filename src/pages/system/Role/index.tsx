import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import { useIntl } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { fetchRole, delRole } from '@/services/system/role';
import RoleModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton } from '@/components/Button';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.Role;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const Role: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const addTitle = intl.formatMessage({ id: 'pages.system.role.add' });
  const editTitle = intl.formatMessage({ id: 'pages.system.role.edit' });
  const delTip = intl.formatMessage({ id: 'pages.system.role.delTip' });

  const [state, dispatch] = useReducer(
    (pre: State, action: Action) => {
      switch (action.type) {
        case ActionTypeEnum.ADD:
          return {
            visible: true,
            title: addTitle,
          };
        case ActionTypeEnum.EDIT:
          return {
            visible: true,
            title: editTitle,
            id: action.payload?.id,
          };
        case ActionTypeEnum.CANCEL:
          return {
            visible: false,
            title: '',
            id: undefined,
          };
        default:
          return pre;
      }
    },
    { visible: false, title: '' },
  );

  const columns: ProColumns<API.Role>[] = [
    {
      title: intl.formatMessage({ id: 'pages.system.role.name' }),
      dataIndex: 'name',
      ellipsis: true,
      width: 200,
      key: 'name', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.role.code' }),
      dataIndex: 'code',
      width: 160,
      key: 'code', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.role.sequence' }),
      dataIndex: 'sequence',
      width: 100,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.system.role.description' }),
      dataIndex: 'description',
      ellipsis: true,
      width: 200,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.system.role.status' }),
      dataIndex: 'status',
      width: 120,
      search: false,
      render: (_, record) => {
        const status = record.status;
        return (
          <Tag color={status === API.RoleStatus.Enabled ? 'success' : 'error'}>
            {status === API.RoleStatus.Enabled
              ? intl.formatMessage({ id: 'pages.system.role.status.enabled' })
              : intl.formatMessage({ id: 'pages.system.role.status.disabled' })}
          </Tag>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.system.role.updated_at' }),
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.table.column.operation' }),
      valueType: 'option',
      key: 'option',
      width: 100,
      render: (_, record) => (
        <Space size={2}>
          <EditIconButton
            key="edit"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.EDIT, payload: record });
            }}
          />
          <DelIconButton
            key="delete"
            title={delTip}
            onConfirm={async () => {
              const res = await delRole(record.id!);
              if (res.success) {
                actionRef.current?.reload();
              }
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Role, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        request={fetchRole}
        rowKey="id"
        cardBordered
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <AddButton
            key="add"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.ADD });
            }}
          />,
        ]}
      />

      <RoleModal
        visible={state.visible}
        title={state.title}
        id={state.id}
        onCancel={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
        }}
        onSuccess={() => {
          dispatch({ type: ActionTypeEnum.CANCEL });
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default Role;
