// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get captcha ID GET /api/v1/captcha/id */
export async function getCaptchaId(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Captcha>>('/api/v1/captcha/id', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Response captcha image GET /api/v1/captcha/image */
export function getCaptchaImageURL(id: string) {
  return `/api/v1/captcha/image?id=${id}&reload=1&ts=${new Date().getTime()}`;
}

/** Login system with username and password POST /api/v1/login */
export async function login(body: API.LoginForm, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.LoginToken>>('/api/v1/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Logout system POST /api/v1/current/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>('/api/v1/current/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Query current user menus based on the current user role GET /api/v1/current/menus */
export async function fetchCurrentMenus(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Menu[]>>('/api/v1/current/menus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Change current user password PUT /api/v1/current/password */
export async function updateCurrentPassword(
  body: API.UpdateLoginPassword,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>('/api/v1/current/password', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Refresh current access token POST /api/v1/current/refresh-token */
export async function refreshToken(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.LoginToken>>('/api/v1/current/refresh-token', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get current user info GET /api/v1/current/user */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.User>>('/api/v1/current/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Change current user info PUT /api/v1/current/user */
export async function updateCurrentUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>('/api/v1/current/user', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
