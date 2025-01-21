import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CallbackRecordVO, CallbackRecordForm, CallbackRecordQuery } from '@/api/imcore/callbackRecord/types';

/**
 * 查询消息回调记录列表
 * @param query
 * @returns {*}
 */

export const listCallbackRecord = (query?: CallbackRecordQuery): AxiosPromise<CallbackRecordVO[]> => {
  return request({
    url: '/imcore/callbackRecord/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询消息回调记录详细
 * @param id
 */
export const getCallbackRecord = (id: string | number): AxiosPromise<CallbackRecordVO> => {
  return request({
    url: '/imcore/callbackRecord/' + id,
    method: 'get'
  });
};

/**
 * 新增消息回调记录
 * @param data
 */
export const addCallbackRecord = (data: CallbackRecordForm) => {
  return request({
    url: '/imcore/callbackRecord',
    method: 'post',
    data: data
  });
};

/**
 * 修改消息回调记录
 * @param data
 */
export const updateCallbackRecord = (data: CallbackRecordForm) => {
  return request({
    url: '/imcore/callbackRecord',
    method: 'put',
    data: data
  });
};

/**
 * 删除消息回调记录
 * @param id
 */
export const delCallbackRecord = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/callbackRecord/' + id,
    method: 'delete'
  });
};
