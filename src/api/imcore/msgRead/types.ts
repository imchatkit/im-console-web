export interface MsgReadVO {
  /**
   * 已读表id
   */
  id: string | number;

  /**
   * 消息id
   */
  fkMsgId: string | number;

  /**
   * 会话id
   */
  fkConversationId: string | number;

  /**
   * 接收方id
   */
  fkReceiverUserId: string | number;

  /**
   * 发送者id
   */
  fkFromUserId: string | number;

  /**
   * 读取时间
   */
  readTime: string;

  /**
   * 接收时间
   */
  receiverTime: string;

  /**
   * 0未读; 1已读
   */
  readMsgStatus: number;

  /**
   * 0未接收; 1已接收
   */
  receiverMsgStatus: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface MsgReadForm extends BaseEntity {
  /**
   * 已读表id
   */
  id?: string | number;

  /**
   * 消息id
   */
  fkMsgId?: string | number;

  /**
   * 会话id
   */
  fkConversationId?: string | number;

  /**
   * 接收方id
   */
  fkReceiverUserId?: string | number;

  /**
   * 发送者id
   */
  fkFromUserId?: string | number;

  /**
   * 读取时间
   */
  readTime?: string;

  /**
   * 接收时间
   */
  receiverTime?: string;

  /**
   * 0未读; 1已读
   */
  readMsgStatus?: number;

  /**
   * 0未接收; 1已接收
   */
  receiverMsgStatus?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface MsgReadQuery extends PageQuery {

  /**
   * 消息id
   */
  fkMsgId?: string | number;

  /**
   * 会话id
   */
  fkConversationId?: string | number;

  /**
   * 接收方id
   */
  fkReceiverUserId?: string | number;

  /**
   * 发送者id
   */
  fkFromUserId?: string | number;

  /**
   * 读取时间
   */
  readTime?: string;

  /**
   * 接收时间
   */
  receiverTime?: string;

  /**
   * 0未读; 1已读
   */
  readMsgStatus?: number;

  /**
   * 0未接收; 1已接收
   */
  receiverMsgStatus?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



