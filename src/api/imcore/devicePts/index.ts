import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DevicePtsVO, DevicePtsForm, DevicePtsQuery } from '@/api/imcore/devicePts/types';

/**
 * 查询设备pts列表
 * @param query
 * @returns {*}
 */

export const listDevicePts = (query?: DevicePtsQuery): AxiosPromise<DevicePtsVO[]> => {
  return request({
    url: '/imcore/devicePts/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询设备pts详细
 * @param id
 */
export const getDevicePts = (id: string | number): AxiosPromise<DevicePtsVO> => {
  return request({
    url: '/imcore/devicePts/' + id,
    method: 'get'
  });
};

/**
 * 新增设备pts
 * @param data
 */
export const addDevicePts = (data: DevicePtsForm) => {
  return request({
    url: '/imcore/devicePts',
    method: 'post',
    data: data
  });
};

/**
 * 修改设备pts
 * @param data
 */
export const updateDevicePts = (data: DevicePtsForm) => {
  return request({
    url: '/imcore/devicePts',
    method: 'put',
    data: data
  });
};

/**
 * 删除设备pts
 * @param id
 */
export const delDevicePts = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/devicePts/' + id,
    method: 'delete'
  });
};
