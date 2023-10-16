import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { useIntl } from 'umi';
import { Tabs } from 'antd';

const Profile: React.FC = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Tabs tabPosition="left" defaultActiveKey="profile" type="card" destroyInactiveTabPane></Tabs>
    </PageContainer>
  );
};

export default Profile;
