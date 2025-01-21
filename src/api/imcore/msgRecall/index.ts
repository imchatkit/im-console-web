import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MsgRecallVO, MsgRecallForm, MsgRecallQuery } from '@/api/imcore/msgRecall/types';

/**
 * 查询消息撤回记录列表
 * @param query
 * @returns {*}
 */

export const listMsgRecall = (query?: MsgRecallQuery): AxiosPromise<MsgRecallVO[]> => {
  return request({
    url: '/imcore/msgRecall/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询消息撤回记录详细
 * @param id
 */
export const getMsgRecall = (id: string | number): AxiosPromise<MsgRecallVO> => {
  return request({
    url: '/imcore/msgRecall/' + id,
    method: 'get'
  });
};

/**
 * 新增消息撤回记录
 * @param data
 */
export const addMsgRecall = (data: MsgRecallForm) => {
  return request({
    url: '/imcore/msgRecall',
    method: 'post',
    data: data
  });
};

/**
 * 修改消息撤回记录
 * @param data
 */
export const updateMsgRecall = (data: MsgRecallForm) => {
  return request({
    url: '/imcore/msgRecall',
    method: 'put',
    data: data
  });
};

/**
 * 删除消息撤回记录
 * @param id
 */
export const delMsgRecall = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/msgRecall/' + id,
    method: 'delete'
  });
};
