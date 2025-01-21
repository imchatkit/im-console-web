export interface MsgReceiverVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 消息ID
   */
  fkMsgId: string | number;

  /**
   * 接收者ID
   */
  fkReceiverId: string | number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface MsgReceiverForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 消息ID
   */
  fkMsgId?: string | number;

  /**
   * 接收者ID
   */
  fkReceiverId?: string | number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface MsgReceiverQuery extends PageQuery {

  /**
   * 消息ID
   */
  fkMsgId?: string | number;

  /**
   * 接收者ID
   */
  fkReceiverId?: string | number;

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



