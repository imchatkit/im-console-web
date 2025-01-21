import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MsgReceiverVO, MsgReceiverForm, MsgReceiverQuery } from '@/api/imcore/msgReceiver/types';

/**
 * 查询消息接收列表
 * @param query
 * @returns {*}
 */

export const listMsgReceiver = (query?: MsgReceiverQuery): AxiosPromise<MsgReceiverVO[]> => {
  return request({
    url: '/imcore/msgReceiver/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询消息接收详细
 * @param id
 */
export const getMsgReceiver = (id: string | number): AxiosPromise<MsgReceiverVO> => {
  return request({
    url: '/imcore/msgReceiver/' + id,
    method: 'get'
  });
};

/**
 * 新增消息接收
 * @param data
 */
export const addMsgReceiver = (data: MsgReceiverForm) => {
  return request({
    url: '/imcore/msgReceiver',
    method: 'post',
    data: data
  });
};

/**
 * 修改消息接收
 * @param data
 */
export const updateMsgReceiver = (data: MsgReceiverForm) => {
  return request({
    url: '/imcore/msgReceiver',
    method: 'put',
    data: data
  });
};

/**
 * 删除消息接收
 * @param id
 */
export const delMsgReceiver = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/msgReceiver/' + id,
    method: 'delete'
  });
};
