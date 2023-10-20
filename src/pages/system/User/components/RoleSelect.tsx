import { useState, useEffect } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { fetchRole } from '@/services/system/role';

type RoleSelectProps = {
  value?: API.UserRole[];
  onChange?: (value: API.RoleMenu[]) => void;
} & SelectProps;

const RoleSelect: React.FC<RoleSelectProps> = (props) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
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

    request({ status: 'enabled', resultType: 'select' }).then((data) => {
      setOptions(data);
    });
  }, []);

  useEffect(() => {
    if (props.value) {
      setValues(props.value.map((item) => item.role_id!));
    } else {
      setValues([]);
    }
  }, [props.value]);

  return (
    <Select
      allowClear={false}
      showSearch
      mode="tags"
      {...props}
      options={options}
      value={values}
      onChange={(value: string[]) => {
        setValues(value);
        if (props.onChange) {
          props.onChange(
            value.map((item) => {
              return { role_id: item };
            }),
          );
        }
      }}
    />
  );
};

export default RoleSelect;
