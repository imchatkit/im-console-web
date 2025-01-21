import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ChannelVO, ChannelForm, ChannelQuery } from '@/api/imcore/channel/types';

/**
 * 查询频道列表
 * @param query
 * @returns {*}
 */

export const listChannel = (query?: ChannelQuery): AxiosPromise<ChannelVO[]> => {
  return request({
    url: '/imcore/channel/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询频道详细
 * @param id
 */
export const getChannel = (id: string | number): AxiosPromise<ChannelVO> => {
  return request({
    url: '/imcore/channel/' + id,
    method: 'get'
  });
};

/**
 * 新增频道
 * @param data
 */
export const addChannel = (data: ChannelForm) => {
  return request({
    url: '/imcore/channel',
    method: 'post',
    data: data
  });
};

/**
 * 修改频道
 * @param data
 */
export const updateChannel = (data: ChannelForm) => {
  return request({
    url: '/imcore/channel',
    method: 'put',
    data: data
  });
};

/**
 * 删除频道
 * @param id
 */
export const delChannel = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/channel/' + id,
    method: 'delete'
  });
};
