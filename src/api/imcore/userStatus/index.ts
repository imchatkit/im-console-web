import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserStatusVO, UserStatusForm, UserStatusQuery } from '@/api/imcore/userStatus/types';

/**
 * 查询用户状态列表
 * @param query
 * @returns {*}
 */

export const listUserStatus = (query?: UserStatusQuery): AxiosPromise<UserStatusVO[]> => {
  return request({
    url: '/imcore/userStatus/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用户状态详细
 * @param userId
 */
export const getUserStatus = (userId: string | number): AxiosPromise<UserStatusVO> => {
  return request({
    url: '/imcore/userStatus/' + userId,
    method: 'get'
  });
};

/**
 * 新增用户状态
 * @param data
 */
export const addUserStatus = (data: UserStatusForm) => {
  return request({
    url: '/imcore/userStatus',
    method: 'post',
    data: data
  });
};

/**
 * 修改用户状态
 * @param data
 */
export const updateUserStatus = (data: UserStatusForm) => {
  return request({
    url: '/imcore/userStatus',
    method: 'put',
    data: data
  });
};

/**
 * 删除用户状态
 * @param userId
 */
export const delUserStatus = (userId: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/userStatus/' + userId,
    method: 'delete'
  });
};
