import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MsgReadVO, MsgReadForm, MsgReadQuery } from '@/api/imcore/msgRead/types';

/**
 * 查询消息已读记录列表
 * @param query
 * @returns {*}
 */

export const listMsgRead = (query?: MsgReadQuery): AxiosPromise<MsgReadVO[]> => {
  return request({
    url: '/imcore/msgRead/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询消息已读记录详细
 * @param id
 */
export const getMsgRead = (id: string | number): AxiosPromise<MsgReadVO> => {
  return request({
    url: '/imcore/msgRead/' + id,
    method: 'get'
  });
};

/**
 * 新增消息已读记录
 * @param data
 */
export const addMsgRead = (data: MsgReadForm) => {
  return request({
    url: '/imcore/msgRead',
    method: 'post',
    data: data
  });
};

/**
 * 修改消息已读记录
 * @param data
 */
export const updateMsgRead = (data: MsgReadForm) => {
  return request({
    url: '/imcore/msgRead',
    method: 'put',
    data: data
  });
};

/**
 * 删除消息已读记录
 * @param id
 */
export const delMsgRead = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/msgRead/' + id,
    method: 'delete'
  });
};
