import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MsgReferencePathVO, MsgReferencePathForm, MsgReferencePathQuery } from '@/api/imcore/msgReferencePath/types';

/**
 * 查询消息引用路径列表
 * @param query
 * @returns {*}
 */

export const listMsgReferencePath = (query?: MsgReferencePathQuery): AxiosPromise<MsgReferencePathVO[]> => {
  return request({
    url: '/imcore/msgReferencePath/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询消息引用路径详细
 * @param id
 */
export const getMsgReferencePath = (id: string | number): AxiosPromise<MsgReferencePathVO> => {
  return request({
    url: '/imcore/msgReferencePath/' + id,
    method: 'get'
  });
};

/**
 * 新增消息引用路径
 * @param data
 */
export const addMsgReferencePath = (data: MsgReferencePathForm) => {
  return request({
    url: '/imcore/msgReferencePath',
    method: 'post',
    data: data
  });
};

/**
 * 修改消息引用路径
 * @param data
 */
export const updateMsgReferencePath = (data: MsgReferencePathForm) => {
  return request({
    url: '/imcore/msgReferencePath',
    method: 'put',
    data: data
  });
};

/**
 * 删除消息引用路径
 * @param id
 */
export const delMsgReferencePath = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/msgReferencePath/' + id,
    method: 'delete'
  });
};
