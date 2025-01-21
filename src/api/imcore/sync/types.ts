export interface SyncVO {
  /**
   * 同步id
   */
  id: string | number;

  /**
   * 用户id
   */
  fkUserId: string | number;

  /**
   * 用户维度单调递增的PTS位点
   */
  pts: number;

  /**
   * 消息id
   */
  fkMsgId: string | number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface SyncForm extends BaseEntity {
  /**
   * 同步id
   */
  id?: string | number;

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 用户维度单调递增的PTS位点
   */
  pts?: number;

  /**
   * 消息id
   */
  fkMsgId?: string | number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface SyncQuery extends PageQuery {

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 用户维度单调递增的PTS位点
   */
  pts?: number;

  /**
   * 消息id
   */
  fkMsgId?: string | number;

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



