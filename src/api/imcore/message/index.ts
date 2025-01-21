import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MessageVO, MessageForm, MessageQuery } from '@/api/imcore/message/types';

/**
 * 查询消息存储列表
 * @param query
 * @returns {*}
 */

export const listMessage = (query?: MessageQuery): AxiosPromise<MessageVO[]> => {
  return request({
    url: '/imcore/message/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询消息存储详细
 * @param id
 */
export const getMessage = (id: string | number): AxiosPromise<MessageVO> => {
  return request({
    url: '/imcore/message/' + id,
    method: 'get'
  });
};

/**
 * 新增消息存储
 * @param data
 */
export const addMessage = (data: MessageForm) => {
  return request({
    url: '/imcore/message',
    method: 'post',
    data: data
  });
};

/**
 * 修改消息存储
 * @param data
 */
export const updateMessage = (data: MessageForm) => {
  return request({
    url: '/imcore/message',
    method: 'put',
    data: data
  });
};

/**
 * 删除消息存储
 * @param id
 */
export const delMessage = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/message/' + id,
    method: 'delete'
  });
};
