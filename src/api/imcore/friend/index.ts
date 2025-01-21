import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FriendVO, FriendForm, FriendQuery } from '@/api/imcore/friend/types';

/**
 * 查询好友关系列表
 * @param query
 * @returns {*}
 */

export const listFriend = (query?: FriendQuery): AxiosPromise<FriendVO[]> => {
  return request({
    url: '/imcore/friend/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询好友关系详细
 * @param id
 */
export const getFriend = (id: string | number): AxiosPromise<FriendVO> => {
  return request({
    url: '/imcore/friend/' + id,
    method: 'get'
  });
};

/**
 * 新增好友关系
 * @param data
 */
export const addFriend = (data: FriendForm) => {
  return request({
    url: '/imcore/friend',
    method: 'post',
    data: data
  });
};

/**
 * 修改好友关系
 * @param data
 */
export const updateFriend = (data: FriendForm) => {
  return request({
    url: '/imcore/friend',
    method: 'put',
    data: data
  });
};

/**
 * 删除好友关系
 * @param id
 */
export const delFriend = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/friend/' + id,
    method: 'delete'
  });
};
