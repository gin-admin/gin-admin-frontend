// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query role list GET /api/v1/roles */
export async function fetchRole(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Role[]>>('/api/v1/roles', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create role record POST /api/v1/roles */
export async function addRole(body: API.Role, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Role>>('/api/v1/roles', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get role record by ID GET /api/v1/roles/${id} */
export async function getRole(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Role>>(`/api/v1/roles/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update role record by ID PUT /api/v1/roles/${id} */
export async function updateRole(id: string, body: API.Role, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/roles/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete role record by ID DELETE /api/v1/roles/${id} */
export async function delRole(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/roles/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
