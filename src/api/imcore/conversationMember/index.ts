import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ConversationMemberVO, ConversationMemberForm, ConversationMemberQuery } from '@/api/imcore/conversationMember/types';

/**
 * 查询会话成员列表
 * @param query
 * @returns {*}
 */

export const listConversationMember = (query?: ConversationMemberQuery): AxiosPromise<ConversationMemberVO[]> => {
  return request({
    url: '/imcore/conversationMember/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询会话成员详细
 * @param id
 */
export const getConversationMember = (id: string | number): AxiosPromise<ConversationMemberVO> => {
  return request({
    url: '/imcore/conversationMember/' + id,
    method: 'get'
  });
};

/**
 * 新增会话成员
 * @param data
 */
export const addConversationMember = (data: ConversationMemberForm) => {
  return request({
    url: '/imcore/conversationMember',
    method: 'post',
    data: data
  });
};

/**
 * 修改会话成员
 * @param data
 */
export const updateConversationMember = (data: ConversationMemberForm) => {
  return request({
    url: '/imcore/conversationMember',
    method: 'put',
    data: data
  });
};

/**
 * 删除会话成员
 * @param id
 */
export const delConversationMember = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/conversationMember/' + id,
    method: 'delete'
  });
};
