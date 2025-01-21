export interface CallbackRecordVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 回调类型
   */
  callbackType: number;

  /**
   * 回调地址
   */
  callbackUrl: string;

  /**
   * 请求内容
   */
  requestBody: string;

  /**
   * 响应内容
   */
  responseBody: string;

  /**
   * 
   */
  callbackStatus: number;

  /**
   * 重试次数
   */
  retryCount: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface CallbackRecordForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 回调类型
   */
  callbackType?: number;

  /**
   * 回调地址
   */
  callbackUrl?: string;

  /**
   * 请求内容
   */
  requestBody?: string;

  /**
   * 响应内容
   */
  responseBody?: string;

  /**
   * 
   */
  callbackStatus?: number;

  /**
   * 重试次数
   */
  retryCount?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface CallbackRecordQuery extends PageQuery {

  /**
   * 回调类型
   */
  callbackType?: number;

  /**
   * 回调地址
   */
  callbackUrl?: string;

  /**
   * 请求内容
   */
  requestBody?: string;

  /**
   * 响应内容
   */
  responseBody?: string;

  /**
   * 
   */
  callbackStatus?: number;

  /**
   * 重试次数
   */
  retryCount?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



