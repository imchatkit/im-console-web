import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WorkspaceVO, WorkspaceForm, WorkspaceQuery } from '@/api/imcore/workspace/types';

/**
 * 查询工作空间列表
 * @param query
 * @returns {*}
 */

export const listWorkspace = (query?: WorkspaceQuery): AxiosPromise<WorkspaceVO[]> => {
  return request({
    url: '/imcore/workspace/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询工作空间详细
 * @param id
 */
export const getWorkspace = (id: string | number): AxiosPromise<WorkspaceVO> => {
  return request({
    url: '/imcore/workspace/' + id,
    method: 'get'
  });
};

/**
 * 新增工作空间
 * @param data
 */
export const addWorkspace = (data: WorkspaceForm) => {
  return request({
    url: '/imcore/workspace',
    method: 'post',
    data: data
  });
};

/**
 * 修改工作空间
 * @param data
 */
export const updateWorkspace = (data: WorkspaceForm) => {
  return request({
    url: '/imcore/workspace',
    method: 'put',
    data: data
  });
};

/**
 * 删除工作空间
 * @param id
 */
export const delWorkspace = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/workspace/' + id,
    method: 'delete'
  });
};
