import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SyncVO, SyncForm, SyncQuery } from '@/api/imcore/sync/types';

/**
 * 查询多端同步列表
 * @param query
 * @returns {*}
 */

export const listSync = (query?: SyncQuery): AxiosPromise<SyncVO[]> => {
  return request({
    url: '/imcore/sync/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询多端同步详细
 * @param id
 */
export const getSync = (id: string | number): AxiosPromise<SyncVO> => {
  return request({
    url: '/imcore/sync/' + id,
    method: 'get'
  });
};

/**
 * 新增多端同步
 * @param data
 */
export const addSync = (data: SyncForm) => {
  return request({
    url: '/imcore/sync',
    method: 'post',
    data: data
  });
};

/**
 * 修改多端同步
 * @param data
 */
export const updateSync = (data: SyncForm) => {
  return request({
    url: '/imcore/sync',
    method: 'put',
    data: data
  });
};

/**
 * 删除多端同步
 * @param id
 */
export const delSync = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/sync/' + id,
    method: 'delete'
  });
};
