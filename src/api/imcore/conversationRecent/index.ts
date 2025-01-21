import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ConversationRecentVO, ConversationRecentForm, ConversationRecentQuery } from '@/api/imcore/conversationRecent/types';

/**
 * 查询首页对话列列表
 * @param query
 * @returns {*}
 */

export const listConversationRecent = (query?: ConversationRecentQuery): AxiosPromise<ConversationRecentVO[]> => {
  return request({
    url: '/imcore/conversationRecent/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询首页对话列详细
 * @param id
 */
export const getConversationRecent = (id: string | number): AxiosPromise<ConversationRecentVO> => {
  return request({
    url: '/imcore/conversationRecent/' + id,
    method: 'get'
  });
};

/**
 * 新增首页对话列
 * @param data
 */
export const addConversationRecent = (data: ConversationRecentForm) => {
  return request({
    url: '/imcore/conversationRecent',
    method: 'post',
    data: data
  });
};

/**
 * 修改首页对话列
 * @param data
 */
export const updateConversationRecent = (data: ConversationRecentForm) => {
  return request({
    url: '/imcore/conversationRecent',
    method: 'put',
    data: data
  });
};

/**
 * 删除首页对话列
 * @param id
 */
export const delConversationRecent = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/conversationRecent/' + id,
    method: 'delete'
  });
};
