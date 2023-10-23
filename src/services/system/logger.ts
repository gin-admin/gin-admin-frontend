// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query user list GET /api/v1/loggers */
export async function fetchLogger(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.User[]>>('/api/v1/loggers', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}
