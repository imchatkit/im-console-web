export interface WebhookConfigVO {
  /**
   * 配置id
   */
  id: string | number;

  /**
   * webhook地址
   */
  webhookUrl: string;

  /**
   * webhook类型：1消息 2用户 3群组
   */
  webhookType: number;

  /**
   * 密钥
   */
  secretKey: string;

  /**
   * 
   */
  webhookStatus: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface WebhookConfigForm extends BaseEntity {
  /**
   * 配置id
   */
  id?: string | number;

  /**
   * webhook地址
   */
  webhookUrl?: string;

  /**
   * webhook类型：1消息 2用户 3群组
   */
  webhookType?: number;

  /**
   * 密钥
   */
  secretKey?: string;

  /**
   * 
   */
  webhookStatus?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface WebhookConfigQuery extends PageQuery {

  /**
   * webhook地址
   */
  webhookUrl?: string;

  /**
   * webhook类型：1消息 2用户 3群组
   */
  webhookType?: number;

  /**
   * 密钥
   */
  secretKey?: string;

  /**
   * 
   */
  webhookStatus?: number;

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



