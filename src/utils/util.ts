import MD5 from 'md5';

/**
 * The function exports a TypeScript implementation of the MD5 hashing algorithm for a given string.
 */
export function md5(str: string) {
  return MD5(str);
}

/**
 * The function sets the username in the local storage.
 * @param {string} username - A string representing the username that needs to be set.
 */
export function setUsername(username: string) {
  localStorage.setItem('username', username);
}

/**
 * The function `getUsername` returns the value of the 'username' key from the localStorage, or null if
 * it doesn't exist.
 * @returns a string value or null.
 */
export function getUsername(): string | null {
  return localStorage.getItem('username');
}

export function convertTreeData<T>(
  data: T[],
  convertT?: (item: T) => {
    id: string;
    name: string;
    parent_id?: string;
    disabled?: boolean;
    children: T[];
  },
): API.TreeItem[] {
  const treeData: API.TreeItem[] = [];
  data.forEach((item) => {
    const dataItem = convertT
      ? convertT(item)
      : (item as {
          id: string;
          name: string;
          parent_id?: string;
          disabled?: boolean;
          children: T[];
        });

    const treeItem: API.TreeItem = {
      id: dataItem.id,
      key: dataItem.id,
      title: dataItem.name,
      value: dataItem.id,
      label: dataItem.name,
      parent_id: dataItem.parent_id,
      children: dataItem.children ? convertTreeData(dataItem.children, convertT) : [],
    };

    if (dataItem.disabled) {
      treeItem.disabled = dataItem.disabled!;
    }
    treeData.push(treeItem);
  });
  return treeData;
}
