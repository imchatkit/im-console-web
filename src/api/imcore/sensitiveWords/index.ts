import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SensitiveWordsVO, SensitiveWordsForm, SensitiveWordsQuery } from '@/api/imcore/sensitiveWords/types';

/**
 * 查询敏感词过滤列表
 * @param query
 * @returns {*}
 */

export const listSensitiveWords = (query?: SensitiveWordsQuery): AxiosPromise<SensitiveWordsVO[]> => {
  return request({
    url: '/imcore/sensitiveWords/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询敏感词过滤详细
 * @param id
 */
export const getSensitiveWords = (id: string | number): AxiosPromise<SensitiveWordsVO> => {
  return request({
    url: '/imcore/sensitiveWords/' + id,
    method: 'get'
  });
};

/**
 * 新增敏感词过滤
 * @param data
 */
export const addSensitiveWords = (data: SensitiveWordsForm) => {
  return request({
    url: '/imcore/sensitiveWords',
    method: 'post',
    data: data
  });
};

/**
 * 修改敏感词过滤
 * @param data
 */
export const updateSensitiveWords = (data: SensitiveWordsForm) => {
  return request({
    url: '/imcore/sensitiveWords',
    method: 'put',
    data: data
  });
};

/**
 * 删除敏感词过滤
 * @param id
 */
export const delSensitiveWords = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/sensitiveWords/' + id,
    method: 'delete'
  });
};
