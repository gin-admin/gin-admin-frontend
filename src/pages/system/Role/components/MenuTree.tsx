import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import { fetchMenu } from '@/services/system/menu';
import { convertTreeData } from '@/utils/util';

type MenuTreeProps = {
  value?: API.RoleMenu[];
  onChange?: (value: API.RoleMenu[]) => void;
};

const MenuTree: React.FC<MenuTreeProps> = (props: MenuTreeProps) => {
  const [data, setData] = useState<API.TreeItem[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    fetchMenu({ status: 'enabled' }).then((res) => {
      if (res.data) {
        setData(convertTreeData(res.data));
        setExpandedKeys(res.data.map((v) => v.id!));
      }
    });
  }, []);

  useEffect(() => {
    if (props.value) {
      setCheckedKeys(props.value.map((item) => item.menu_id!));
    } else {
      setCheckedKeys([]);
    }
  }, [props.value]);

  const convertTreeDataToTreeNode = (items: API.TreeItem[]) => {
    return items.map((item) => {
      return (
        <Tree.TreeNode
          selectable={false}
          isLeaf={item.children && item.children.length > 0 ? false : true}
          key={item.key}
          title={item.title}
        >
          {item.children && convertTreeDataToTreeNode(item.children)}
        </Tree.TreeNode>
      );
    });
  };

  const handleCheck = (
    keys: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] },
  ): void => {
    let iCheckedKeys: React.Key[] = [];
    if (Array.isArray(keys)) {
      iCheckedKeys = keys;
    } else {
      iCheckedKeys = keys.checked;
    }

    setCheckedKeys(iCheckedKeys.map((item) => item.toString()));
    if (props.onChange) {
      props.onChange(
        iCheckedKeys.map((item) => {
          return { menu_id: item.toString() };
        }),
      );
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxHeight: 280,
        overflowY: 'scroll',
        border: '1px solid #f0f0f0',
        padding: '15px 30px',
      }}
    >
      <Tree
        checkable
        selectable={false}
        checkedKeys={checkedKeys}
        expandedKeys={expandedKeys}
        onExpand={(keys: React.Key[]) => setExpandedKeys(keys.map((item) => item.toString()))}
        onCheck={handleCheck}
      >
        {convertTreeDataToTreeNode(data)}
      </Tree>
    </div>
  );
};

export default MenuTree;
