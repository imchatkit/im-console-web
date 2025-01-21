import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ConversationSeqVO, ConversationSeqForm, ConversationSeqQuery } from '@/api/imcore/conversationSeq/types';

/**
 * 查询会话序列号列表
 * @param query
 * @returns {*}
 */

export const listConversationSeq = (query?: ConversationSeqQuery): AxiosPromise<ConversationSeqVO[]> => {
  return request({
    url: '/imcore/conversationSeq/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询会话序列号详细
 * @param conversationId
 */
export const getConversationSeq = (conversationId: string | number): AxiosPromise<ConversationSeqVO> => {
  return request({
    url: '/imcore/conversationSeq/' + conversationId,
    method: 'get'
  });
};

/**
 * 新增会话序列号
 * @param data
 */
export const addConversationSeq = (data: ConversationSeqForm) => {
  return request({
    url: '/imcore/conversationSeq',
    method: 'post',
    data: data
  });
};

/**
 * 修改会话序列号
 * @param data
 */
export const updateConversationSeq = (data: ConversationSeqForm) => {
  return request({
    url: '/imcore/conversationSeq',
    method: 'put',
    data: data
  });
};

/**
 * 删除会话序列号
 * @param conversationId
 */
export const delConversationSeq = (conversationId: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/conversationSeq/' + conversationId,
    method: 'delete'
  });
};
