export interface MsgRecallVO {
  /**
   * 撤回记录id
   */
  id: string | number;

  /**
   * 消息id
   */
  fkMsgId: string | number;

  /**
   * 撤回用户id
   */
  fkUserId: string | number;

  /**
   * 撤回时间，精确到毫秒
   */
  recallTime: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface MsgRecallForm extends BaseEntity {
  /**
   * 撤回记录id
   */
  id?: string | number;

  /**
   * 消息id
   */
  fkMsgId?: string | number;

  /**
   * 撤回用户id
   */
  fkUserId?: string | number;

  /**
   * 撤回时间，精确到毫秒
   */
  recallTime?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface MsgRecallQuery extends PageQuery {

  /**
   * 消息id
   */
  fkMsgId?: string | number;

  /**
   * 撤回用户id
   */
  fkUserId?: string | number;

  /**
   * 撤回时间，精确到毫秒
   */
  recallTime?: string;

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



