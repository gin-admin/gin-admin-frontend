import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const intl = useIntl();
  const titleStyle = { fontSize: 16, marginTop: 30 };
  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Title style={titleStyle}>
          <a
            href="https://github.com/LyricTian/gin-admin"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Title>
        <CodePreview>go install github.com/gin-admin/gin-admin-cli/v10@latest</CodePreview>
        <Typography.Title style={titleStyle}>
          <FormattedMessage id="pages.welcome.quickStart" />
        </Typography.Title>
        <CodePreview>
          gin-admin-cli new -d ~/go/src --name testapp --desc &#39;A test API service based on
          golang.&#39; --pkg &#39;github.com/xxx/testapp&#39;
        </CodePreview>
        <CodePreview>cd ~/go/src/testapp</CodePreview>
        <CodePreview>make start</CodePreview>
        <Typography.Text strong>
          Open your browser and visit&nbsp;
          <a
            href="http://localhost:8040/swagger/index.html"
            rel="noopener noreferrer"
            target="__blank"
          >
            http://localhost:8040/swagger/index.html
          </a>
        </Typography.Text>
        <Typography.Title style={titleStyle}>
          <FormattedMessage id="pages.welcome.generate" />
        </Typography.Title>
        <CodePreview>
          gin-admin-cli gen -d . -m CMS -s Category --structs-comment &#39;Category management&#39;
        </CodePreview>
        <Typography.Title style={titleStyle}>
          <FormattedMessage id="pages.welcome.remove" />
        </Typography.Title>
        <CodePreview>gin-admin-cli rm -d . -m CMS -s Category</CodePreview>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
