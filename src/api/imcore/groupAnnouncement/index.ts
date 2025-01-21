import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GroupAnnouncementVO, GroupAnnouncementForm, GroupAnnouncementQuery } from '@/api/imcore/groupAnnouncement/types';

/**
 * 查询群公告列表
 * @param query
 * @returns {*}
 */

export const listGroupAnnouncement = (query?: GroupAnnouncementQuery): AxiosPromise<GroupAnnouncementVO[]> => {
  return request({
    url: '/imcore/groupAnnouncement/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询群公告详细
 * @param id
 */
export const getGroupAnnouncement = (id: string | number): AxiosPromise<GroupAnnouncementVO> => {
  return request({
    url: '/imcore/groupAnnouncement/' + id,
    method: 'get'
  });
};

/**
 * 新增群公告
 * @param data
 */
export const addGroupAnnouncement = (data: GroupAnnouncementForm) => {
  return request({
    url: '/imcore/groupAnnouncement',
    method: 'post',
    data: data
  });
};

/**
 * 修改群公告
 * @param data
 */
export const updateGroupAnnouncement = (data: GroupAnnouncementForm) => {
  return request({
    url: '/imcore/groupAnnouncement',
    method: 'put',
    data: data
  });
};

/**
 * 删除群公告
 * @param id
 */
export const delGroupAnnouncement = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/groupAnnouncement/' + id,
    method: 'delete'
  });
};
