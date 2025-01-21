import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WebhookConfigVO, WebhookConfigForm, WebhookConfigQuery } from '@/api/imcore/webhookConfig/types';

/**
 * 查询Webhook配置列表
 * @param query
 * @returns {*}
 */

export const listWebhookConfig = (query?: WebhookConfigQuery): AxiosPromise<WebhookConfigVO[]> => {
  return request({
    url: '/imcore/webhookConfig/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询Webhook配置详细
 * @param id
 */
export const getWebhookConfig = (id: string | number): AxiosPromise<WebhookConfigVO> => {
  return request({
    url: '/imcore/webhookConfig/' + id,
    method: 'get'
  });
};

/**
 * 新增Webhook配置
 * @param data
 */
export const addWebhookConfig = (data: WebhookConfigForm) => {
  return request({
    url: '/imcore/webhookConfig',
    method: 'post',
    data: data
  });
};

/**
 * 修改Webhook配置
 * @param data
 */
export const updateWebhookConfig = (data: WebhookConfigForm) => {
  return request({
    url: '/imcore/webhookConfig',
    method: 'put',
    data: data
  });
};

/**
 * 删除Webhook配置
 * @param id
 */
export const delWebhookConfig = (id: string | number | Array<string | number>) => {
  return request({
    url: '/imcore/webhookConfig/' + id,
    method: 'delete'
  });
};
