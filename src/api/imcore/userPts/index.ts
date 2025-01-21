import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { UserPtsVO, UserPtsForm, UserPtsQuery } from '@/api/imcore/userPts/types';

/**
 * 查询用户pts列表
 * @param query
 * @returns {*}
 */

export const listUserPts = (query?: UserPtsQuery): AxiosPromise<UserPtsVO[]> => {
  return request({
    url: '/imcore/userPts/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用户pts详细
 * @param userId
 */
export const getUserPts = (userId: string | number): AxiosPromise<UserPtsVO> => {
  return request({
    url: '/imcore/userPts/' + userId,
    method: 'get'
  });
};

/**
 * 新增用户pts
 * @param data
 */
export const addUserPts = (data: UserPtsForm) => {
  return request({
    url: '/imcore/userPts',
    method: 'post',
    data: data
  });
};

/**
 * 修改用户pts
 * @param data
 */
export const updateUserPts = (data: UserPtsForm) => {
  return request({
    url: '/imcore/userPts',
    method: 'put',
    data: data
  });
};

/**
 * 删除用户pts
 * @param userId
 */
export const delUserPts = (userId: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/userPts/' + userId,
    method: 'delete'
  });
};
