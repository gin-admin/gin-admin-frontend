import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { useIntl } from 'umi';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Tag, Descriptions } from 'antd';
import { fetchLogger } from '@/services/system/logger';

const Logger: React.FC = () => {
  const intl = useIntl();
  const levelColor = {
    info: 'blue',
    warn: 'orange',
    error: 'red',
  };

  const columns: ProColumns<API.Logger>[] = [
    {
      title: intl.formatMessage({ id: 'pages.system.logger.form.level' }),
      dataIndex: 'level',
      width: 100,
      key: 'level', // Query field name
      valueEnum: {
        info: 'info'.toUpperCase(),
        warn: 'warn'.toUpperCase(),
        error: 'error'.toUpperCase(),
      },
      valueType: 'select',
      render: (_, record) => {
        const level = record.level ?? 'info';
        return (
          <Tag color={level in levelColor ? levelColor[level] : 'default'}>
            {level.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.system.logger.form.trace_id' }),
      dataIndex: 'trace_id',
      width: 160,
      key: 'traceID', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.logger.form.user_name' }),
      dataIndex: 'user_name',
      width: 160,
      key: 'userName', // Query field name
      render: (_, record) => {
        return record.user_name ? `${record.user_name}(${record.login_name})` : `${record.user_id}`;
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.system.logger.form.tag' }),
      dataIndex: 'tag',
      width: 120,
      key: 'tag', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.logger.form.message' }),
      dataIndex: 'message',
      width: 240,
      ellipsis: true,
      key: 'message', // Query field name
    },
    {
      title: intl.formatMessage({ id: 'pages.system.logger.form.created_at' }),
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
      width: 180,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Logger, API.PaginationParam>
        columns={columns}
        request={fetchLogger}
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
        expandable={{
          expandedRowRender: (record) => {
            if (record.data) {
              const data: Record<string, any> = JSON.parse(record.data);
              const items: { key: string; children: any }[] = [];
              Object.keys(data).forEach((key) => {
                items.push({
                  key: key,
                  children: data[key],
                });
              });

              const oneLine = { body: true, res_body: true, user_agent: true };

              return (
                <Descriptions bordered column={2}>
                  {items.map((item) => (
                    <Descriptions.Item
                      label={item.key}
                      key={item.key}
                      span={item.key in oneLine ? 2 : 1}
                    >
                      {item.children}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              );
            }
            return undefined;
          },
          rowExpandable: (record) => !!record.data,
        }}
      />
    </PageContainer>
  );
};

export default Logger;
