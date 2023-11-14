import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import { useIntl } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { fetchUser, delUser } from '@/services/system/user';
import UserModal from './components/SaveForm';
import { AddButton, EditIconButton, DelIconButton } from '@/components/Button';

enum ActionTypeEnum {
  ADD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.User;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
}

const User: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const addTitle = intl.formatMessage({ id: 'pages.system.user.add' });
  const editTitle = intl.formatMessage({ id: 'pages.system.user.edit' });
  const delTip = intl.formatMessage({ id: 'pages.system.user.delTip' });

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

  const columns: ProColumns<API.User>[] = [
    {
      title: intl.formatMessage({ id: 'pages.system.user.form.username' }),
      dataIndex: 'username',
      width: 160,
      key: 'username', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.user.form.name' }),
      dataIndex: 'name',
      ellipsis: true,
      width: 160,
      key: 'name', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.user.form.roles' }),
      dataIndex: 'roles',
      width: 200,
      search: false,
      render: (_, record) => {
        return record.roles ? (
          <Space>
            {record.roles?.map((role) => (
              <Tag color="blue" key={role.role_id}>
                {role.role_name}
              </Tag>
            ))}
          </Space>
        ) : (
          '-'
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.system.user.form.status' }),
      dataIndex: 'status',
      width: 130,
      key: 'status', // Query field name
      valueType: 'select',
      valueEnum: {
        ['activated']: {
          text: intl.formatMessage({ id: 'pages.system.user.form.status.activated' }),
          status: 'Success',
        },
        ['freezed']: {
          text: intl.formatMessage({ id: 'pages.system.user.form.status.freezed' }),
          status: 'Error',
        },
      },
      render: (_, record) => {
        const status = record.status;
        return (
          <Tag color={status === 'activated' ? 'success' : 'error'}>
            {status === 'activated'
              ? intl.formatMessage({ id: 'pages.system.user.form.status.activated' })
              : intl.formatMessage({ id: 'pages.system.user.form.status.freezed' })}
          </Tag>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.system.user.form.created_at' }),
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
      width: 180,
    },
    {
      title: intl.formatMessage({ id: 'pages.system.user.form.updated_at' }),
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      search: false,
      width: 180,
    },
    {
      title: intl.formatMessage({ id: 'pages.table.column.operation' }),
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => (
        <Space size={2}>
          <EditIconButton
            key="edit"
            code="edit"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.EDIT, payload: record });
            }}
          />
          <DelIconButton
            key="delete"
            code="delete"
            title={delTip}
            onConfirm={async () => {
              const res = await delUser(record.id!);
              if (res.success) {
                message.success(intl.formatMessage({ id: 'component.message.success.delete' }));
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
      <ProTable<API.User, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        request={fetchUser}
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
            code="add"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.ADD });
            }}
          />,
        ]}
      />

      <UserModal
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

export default User;
