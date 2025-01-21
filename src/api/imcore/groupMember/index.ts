import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GroupMemberVO, GroupMemberForm, GroupMemberQuery } from '@/api/imcore/groupMember/types';

/**
 * 查询群成员列表
 * @param query
 * @returns {*}
 */

export const listGroupMember = (query?: GroupMemberQuery): AxiosPromise<GroupMemberVO[]> => {
  return request({
    url: '/imcore/groupMember/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询群成员详细
 * @param id
 */
export const getGroupMember = (id: string | number): AxiosPromise<GroupMemberVO> => {
  return request({
    url: '/imcore/groupMember/' + id,
    method: 'get'
  });
};

/**
 * 新增群成员
 * @param data
 */
export const addGroupMember = (data: GroupMemberForm) => {
  return request({
    url: '/imcore/groupMember',
    method: 'post',
    data: data
  });
};

/**
 * 修改群成员
 * @param data
 */
export const updateGroupMember = (data: GroupMemberForm) => {
  return request({
    url: '/imcore/groupMember',
    method: 'put',
    data: data
  });
};

/**
 * 删除群成员
 * @param id
 */
export const delGroupMember = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/groupMember/' + id,
    method: 'delete'
  });
};
