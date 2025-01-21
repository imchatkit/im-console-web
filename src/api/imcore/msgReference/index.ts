import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MsgReferenceVO, MsgReferenceForm, MsgReferenceQuery } from '@/api/imcore/msgReference/types';

/**
 * 查询消息引用关系列表
 * @param query
 * @returns {*}
 */

export const listMsgReference = (query?: MsgReferenceQuery): AxiosPromise<MsgReferenceVO[]> => {
  return request({
    url: '/imcore/msgReference/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询消息引用关系详细
 * @param id
 */
export const getMsgReference = (id: string | number): AxiosPromise<MsgReferenceVO> => {
  return request({
    url: '/imcore/msgReference/' + id,
    method: 'get'
  });
};

/**
 * 新增消息引用关系
 * @param data
 */
export const addMsgReference = (data: MsgReferenceForm) => {
  return request({
    url: '/imcore/msgReference',
    method: 'post',
    data: data
  });
};

/**
 * 修改消息引用关系
 * @param data
 */
export const updateMsgReference = (data: MsgReferenceForm) => {
  return request({
    url: '/imcore/msgReference',
    method: 'put',
    data: data
  });
};

/**
 * 删除消息引用关系
 * @param id
 */
export const delMsgReference = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/msgReference/' + id,
    method: 'delete'
  });
};
