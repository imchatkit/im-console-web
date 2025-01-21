import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ChannelMemberVO, ChannelMemberForm, ChannelMemberQuery } from '@/api/imcore/channelMember/types';

/**
 * 查询频道成员列表
 * @param query
 * @returns {*}
 */

export const listChannelMember = (query?: ChannelMemberQuery): AxiosPromise<ChannelMemberVO[]> => {
  return request({
    url: '/imcore/channelMember/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询频道成员详细
 * @param id
 */
export const getChannelMember = (id: string | number): AxiosPromise<ChannelMemberVO> => {
  return request({
    url: '/imcore/channelMember/' + id,
    method: 'get'
  });
};

/**
 * 新增频道成员
 * @param data
 */
export const addChannelMember = (data: ChannelMemberForm) => {
  return request({
    url: '/imcore/channelMember',
    method: 'post',
    data: data
  });
};

/**
 * 修改频道成员
 * @param data
 */
export const updateChannelMember = (data: ChannelMemberForm) => {
  return request({
    url: '/imcore/channelMember',
    method: 'put',
    data: data
  });
};

/**
 * 删除频道成员
 * @param id
 */
export const delChannelMember = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/channelMember/' + id,
    method: 'delete'
  });
};
