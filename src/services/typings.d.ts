declare namespace API {
  type PaginationParam = {
    current?: number;
    pageSize?: number;
    [key: string]: any;
  };

  type ResponseResult<T> = {
    success?: boolean;
    data?: T;
    total?: number;
    error?: ErrorResult;
  };

  type ErrorResult = {
    id?: string;
    code?: number;
    detail?: string;
    status?: string;
  };

  type TreeItem = {
    id: string;
    key: string;
    value: string;
    title: string;
    parent_id?: string;
    disabled?: boolean;
    children?: TreeItem[];
    [key: string]: any;
  };
}
