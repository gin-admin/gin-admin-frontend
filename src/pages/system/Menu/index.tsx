import { PageContainer } from '@ant-design/pro-components';
import React, { useRef, useReducer } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Tag, message } from 'antd';
import { useIntl } from 'umi';
import { fetchMenu, delMenu } from '@/services/system/menu';
import MenuModal from './components/SaveForm';
import { AddButton, AddIconButton, EditIconButton, DelIconButton } from '@/components/Button';

enum ActionTypeEnum {
  ADD,
  ADD_CHILD,
  EDIT,
  CANCEL,
}

interface Action {
  type: ActionTypeEnum;
  payload?: API.Menu;
}

interface State {
  visible: boolean;
  title: string;
  id?: string;
  parentID?: string;
}

const Menu: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const addTitle = intl.formatMessage({ id: 'pages.system.menu.add' });
  const editTitle = intl.formatMessage({ id: 'pages.system.menu.edit' });
  const delTip = intl.formatMessage({ id: 'pages.system.menu.delTip' });

  const [state, dispatch] = useReducer(
    (pre: State, action: Action) => {
      switch (action.type) {
        case ActionTypeEnum.ADD:
          return {
            visible: true,
            title: addTitle,
            parentID: undefined,
          };
        case ActionTypeEnum.ADD_CHILD:
          return {
            visible: true,
            title: addTitle,
            parentID: action.payload?.id,
          };
        case ActionTypeEnum.EDIT:
          return {
            visible: true,
            title: editTitle,
            id: action.payload?.id,
            parentID: action.payload?.parent_id,
          };
        case ActionTypeEnum.CANCEL:
          return {
            visible: false,
            title: '',
            id: undefined,
            parentID: undefined,
          };
        default:
          return pre;
      }
    },
    { visible: false, title: '' },
  );

  const columns: ProColumns<API.Menu>[] = [
    {
      title: intl.formatMessage({ id: 'pages.system.menu.form.name' }),
      dataIndex: 'name',
      ellipsis: true,
      width: 200,
      key: 'name', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.menu.form.code' }),
      dataIndex: 'code',
      ellipsis: true,
      width: 160,
      key: 'code', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.menu.form.sequence' }),
      dataIndex: 'sequence',
      width: 120,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.system.menu.form.type' }),
      dataIndex: 'type',
      width: 120,
      search: false,
      render: (_, record) => {
        const status = record.type;
        return (
          <Tag style={{ border: 0 }}>
            {status === 'page'
              ? intl.formatMessage({ id: 'pages.system.menu.form.type.page' })
              : intl.formatMessage({ id: 'pages.system.menu.form.type.button' })}
          </Tag>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.system.menu.form.status' }),
      dataIndex: 'status',
      width: 130,
      search: false,
      render: (_, record) => {
        const status = record.status;
        return (
          <Tag color={status === 'enabled' ? 'success' : 'error'}>
            {status === 'enabled'
              ? intl.formatMessage({ id: 'pages.system.menu.form.status.enabled' })
              : intl.formatMessage({ id: 'pages.system.menu.form.status.disabled' })}
          </Tag>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.system.menu.form.created_at' }),
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
      width: 180,
    },
    {
      title: intl.formatMessage({ id: 'pages.system.menu.form.updated_at' }),
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
        <Space>
          <EditIconButton
            key="edit"
            code="edit"
            onClick={() => {
              dispatch({ type: ActionTypeEnum.EDIT, payload: record });
            }}
          />
          {record.type === 'page' && (
            <AddIconButton
              key="add"
              code="add"
              title={intl.formatMessage({ id: 'pages.system.menu.button.addChild' })}
              onClick={() => {
                dispatch({ type: ActionTypeEnum.ADD_CHILD, payload: record });
              }}
            />
          )}
          <DelIconButton
            key="delete"
            code="delete"
            title={delTip}
            onConfirm={async () => {
              const res = await delMenu(record.id!);
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
      <ProTable<API.Menu, API.PaginationParam>
        columns={columns}
        actionRef={actionRef}
        request={fetchMenu}
        rowKey="id"
        cardBordered
        search={{
          labelWidth: 'auto',
        }}
        pagination={false}
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

      <MenuModal
        visible={state.visible}
        id={state.id}
        parentID={state.parentID}
        title={state.title}
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

export default Menu;
