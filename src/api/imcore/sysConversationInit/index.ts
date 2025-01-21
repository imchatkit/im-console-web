import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SysConversationInitVO, SysConversationInitForm, SysConversationInitQuery } from '@/api/imcore/sysConversationInit/types';

/**
 * 查询系统会话初始化列表
 * @param query
 * @returns {*}
 */

export const listSysConversationInit = (query?: SysConversationInitQuery): AxiosPromise<SysConversationInitVO[]> => {
  return request({
    url: '/imcore/sysConversationInit/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询系统会话初始化详细
 * @param id
 */
export const getSysConversationInit = (id: string | number): AxiosPromise<SysConversationInitVO> => {
  return request({
    url: '/imcore/sysConversationInit/' + id,
    method: 'get'
  });
};

/**
 * 新增系统会话初始化
 * @param data
 */
export const addSysConversationInit = (data: SysConversationInitForm) => {
  return request({
    url: '/imcore/sysConversationInit',
    method: 'post',
    data: data
  });
};

/**
 * 修改系统会话初始化
 * @param data
 */
export const updateSysConversationInit = (data: SysConversationInitForm) => {
  return request({
    url: '/imcore/sysConversationInit',
    method: 'put',
    data: data
  });
};

/**
 * 删除系统会话初始化
 * @param id
 */
export const delSysConversationInit = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/sysConversationInit/' + id,
    method: 'delete'
  });
};
