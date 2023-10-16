import { useState, useEffect } from 'react';
import { ProFormSelect } from '@ant-design/pro-components';
import type { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import { fetchRole } from '@/services/system/role';

type RoleSelectProps = {
  value?: API.UserRole[];
  onChange?: (value: API.RoleMenu[]) => void;
} & ProFormSelectProps;

const RoleSelect: React.FC<RoleSelectProps> = (props) => {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    if (props.value) {
      setValues(props.value.map((item) => item.role_id!));
    } else {
      setValues([]);
    }
  }, [props.value]);

  const request = async (params: API.PaginationParam) => {
    const res = await fetchRole(params);
    if (res.data) {
      return res.data.map((item) => {
        return { label: item.name, value: item.id };
      });
    } else {
      return [];
    }
  };

  return (
    <ProFormSelect
      allowClear={false}
      showSearch
      mode="tags"
      {...props}
      request={request}
      params={{ resultType: 'select', status: 'enabled' }}
      fieldProps={{
        value: values,
        onChange: (value: string[]) => {
          setValues(value);
          if (props.onChange) {
            props.onChange(
              value.map((item) => {
                return { role_id: item };
              }),
            );
          }
        },
      }}
    />
  );
};

export default RoleSelect;
