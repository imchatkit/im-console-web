import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { GroupSettingVO, GroupSettingForm, GroupSettingQuery } from '@/api/imcore/groupSetting/types';

/**
 * 查询群组设置列表
 * @param query
 * @returns {*}
 */

export const listGroupSetting = (query?: GroupSettingQuery): AxiosPromise<GroupSettingVO[]> => {
  return request({
    url: '/imcore/groupSetting/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询群组设置详细
 * @param fkGroupId
 */
export const getGroupSetting = (fkGroupId: string | number): AxiosPromise<GroupSettingVO> => {
  return request({
    url: '/imcore/groupSetting/' + fkGroupId,
    method: 'get'
  });
};

/**
 * 新增群组设置
 * @param data
 */
export const addGroupSetting = (data: GroupSettingForm) => {
  return request({
    url: '/imcore/groupSetting',
    method: 'post',
    data: data
  });
};

/**
 * 修改群组设置
 * @param data
 */
export const updateGroupSetting = (data: GroupSettingForm) => {
  return request({
    url: '/imcore/groupSetting',
    method: 'put',
    data: data
  });
};

/**
 * 删除群组设置
 * @param fkGroupId
 */
export const delGroupSetting = (fkGroupId: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/groupSetting/' + fkGroupId,
    method: 'delete'
  });
};
