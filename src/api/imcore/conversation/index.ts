import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ConversationVO, ConversationForm, ConversationQuery } from '@/api/imcore/conversation/types';

/**
 * 查询聊天会话基础列表
 * @param query
 * @returns {*}
 */

export const listConversation = (query?: ConversationQuery): AxiosPromise<ConversationVO[]> => {
  return request({
    url: '/imcore/conversation/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询聊天会话基础详细
 * @param id
 */
export const getConversation = (id: string | number): AxiosPromise<ConversationVO> => {
  return request({
    url: '/imcore/conversation/' + id,
    method: 'get'
  });
};

/**
 * 新增聊天会话基础
 * @param data
 */
export const addConversation = (data: ConversationForm) => {
  return request({
    url: '/imcore/conversation',
    method: 'post',
    data: data
  });
};

/**
 * 修改聊天会话基础
 * @param data
 */
export const updateConversation = (data: ConversationForm) => {
  return request({
    url: '/imcore/conversation',
    method: 'put',
    data: data
  });
};

/**
 * 删除聊天会话基础
 * @param id
 */
export const delConversation = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/conversation/' + id,
    method: 'delete'
  });
};
