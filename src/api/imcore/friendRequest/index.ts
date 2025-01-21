import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FriendRequestVO, FriendRequestForm, FriendRequestQuery } from '@/api/imcore/friendRequest/types';

/**
 * 查询好友申请列表
 * @param query
 * @returns {*}
 */

export const listFriendRequest = (query?: FriendRequestQuery): AxiosPromise<FriendRequestVO[]> => {
  return request({
    url: '/imcore/friendRequest/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询好友申请详细
 * @param id
 */
export const getFriendRequest = (id: string | number): AxiosPromise<FriendRequestVO> => {
  return request({
    url: '/imcore/friendRequest/' + id,
    method: 'get'
  });
};

/**
 * 新增好友申请
 * @param data
 */
export const addFriendRequest = (data: FriendRequestForm) => {
  return request({
    url: '/imcore/friendRequest',
    method: 'post',
    data: data
  });
};

/**
 * 修改好友申请
 * @param data
 */
export const updateFriendRequest = (data: FriendRequestForm) => {
  return request({
    url: '/imcore/friendRequest',
    method: 'put',
    data: data
  });
};

/**
 * 删除好友申请
 * @param id
 */
export const delFriendRequest = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/friendRequest/' + id,
    method: 'delete'
  });
};
