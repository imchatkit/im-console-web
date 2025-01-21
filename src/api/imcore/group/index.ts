import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GroupVO, GroupForm, GroupQuery } from '@/api/imcore/group/types';

/**
 * 查询群组列表
 * @param query
 * @returns {*}
 */

export const listGroup = (query?: GroupQuery): AxiosPromise<GroupVO[]> => {
  return request({
    url: '/imcore/group/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询群组详细
 * @param id
 */
export const getGroup = (id: string | number): AxiosPromise<GroupVO> => {
  return request({
    url: '/imcore/group/' + id,
    method: 'get'
  });
};

/**
 * 新增群组
 * @param data
 */
export const addGroup = (data: GroupForm) => {
  return request({
    url: '/imcore/group',
    method: 'post',
    data: data
  });
};

/**
 * 修改群组
 * @param data
 */
export const updateGroup = (data: GroupForm) => {
  return request({
    url: '/imcore/group',
    method: 'put',
    data: data
  });
};

/**
 * 删除群组
 * @param id
 */
export const delGroup = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/group/' + id,
    method: 'delete'
  });
};
