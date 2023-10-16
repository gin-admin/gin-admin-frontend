// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query user list GET /api/v1/users */
export async function fetchUser(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.User[]>>('/api/v1/users', {
    method: 'GET',
    params: {
      current: '1',
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** Create user record POST /api/v1/users */
export async function addUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.User>>('/api/v1/users', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get user record by ID GET /api/v1/users/${id} */
export async function getUser(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.User>>(`/api/v1/users/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update user record by ID PUT /api/v1/users/${id} */
export async function updateUser(id: string, body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/users/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete user record by ID DELETE /api/v1/users/${id} */
export async function delUser(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/users/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** Reset user password by ID PATCH /api/v1/users/${id}/reset-pwd */
export async function resetUserPassword(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/users/${id}/reset-pwd`, {
    method: 'PATCH',
    ...(options || {}),
  });
}
