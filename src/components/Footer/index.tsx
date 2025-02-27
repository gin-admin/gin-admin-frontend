import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();

  const currentYear = new Date().getFullYear();

  const produced = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'LyricTian',
  });

  return (
    <DefaultFooter
      copyright={`${currentYear} ${produced}`}
      links={[
        {
          key: 'icp',
          title: '鲁ICP备2022031242号-2',
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
