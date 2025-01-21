import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DeviceVO, DeviceForm, DeviceQuery } from '@/api/imcore/device/types';

/**
 * 查询客户端设备列表
 * @param query
 * @returns {*}
 */

export const listDevice = (query?: DeviceQuery): AxiosPromise<DeviceVO[]> => {
  return request({
    url: '/imcore/device/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询客户端设备详细
 * @param id
 */
export const getDevice = (id: string | number): AxiosPromise<DeviceVO> => {
  return request({
    url: '/imcore/device/' + id,
    method: 'get'
  });
};

/**
 * 新增客户端设备
 * @param data
 */
export const addDevice = (data: DeviceForm) => {
  return request({
    url: '/imcore/device',
    method: 'post',
    data: data
  });
};

/**
 * 修改客户端设备
 * @param data
 */
export const updateDevice = (data: DeviceForm) => {
  return request({
    url: '/imcore/device',
    method: 'put',
    data: data
  });
};

/**
 * 删除客户端设备
 * @param id
 */
export const delDevice = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/device/' + id,
    method: 'delete'
  });
};
