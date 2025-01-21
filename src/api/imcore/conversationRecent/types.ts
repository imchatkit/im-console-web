export interface ConversationRecentVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 创建者id
   */
  fkUserId: string | number;

  /**
   * 会话id
   */
  fkConversationId: string | number;

  /**
   * 最后一条消息id
   */
  lastMsgId: string | number;

  /**
   * 最后一条消息时间，精确到毫秒
   */
  lastMsgTime: string;

  /**
   * 未读消息数量
   */
  noReadCount: number;

  /**
   * 置顶标志 0不置顶  1置顶
   */
  topFlag: number;

  /**
   * 置顶时间,用于排序
   */
  topTime: string;

  /**
   * 对话移除标志 0没移除  1移除
   */
  removedFlag: number;

  /**
   * 移除时间,用于判断是否展示
   */
  removedTime: string;

  /**
   * 是否有at我的消息 0无,1有 
   */
  atMeFlag: number;

  /**
   * 有at我的消息id
   */
  atMeMsgId: string | number;

  /**
   * 会话类型:1单聊,2群聊,3系统通知 5频道
   */
  conversationType: number;

}

export interface ConversationRecentForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 创建者id
   */
  fkUserId?: string | number;

  /**
   * 会话id
   */
  fkConversationId?: string | number;

  /**
   * 最后一条消息id
   */
  lastMsgId?: string | number;

  /**
   * 最后一条消息时间，精确到毫秒
   */
  lastMsgTime?: string;

  /**
   * 未读消息数量
   */
  noReadCount?: number;

  /**
   * 置顶标志 0不置顶  1置顶
   */
  topFlag?: number;

  /**
   * 置顶时间,用于排序
   */
  topTime?: string;

  /**
   * 对话移除标志 0没移除  1移除
   */
  removedFlag?: number;

  /**
   * 移除时间,用于判断是否展示
   */
  removedTime?: string;

  /**
   * 是否有at我的消息 0无,1有 
   */
  atMeFlag?: number;

  /**
   * 有at我的消息id
   */
  atMeMsgId?: string | number;

  /**
   * 会话类型:1单聊,2群聊,3系统通知 5频道
   */
  conversationType?: number;

}

export interface ConversationRecentQuery extends PageQuery {

  /**
   * 创建者id
   */
  fkUserId?: string | number;

  /**
   * 会话id
   */
  fkConversationId?: string | number;

  /**
   * 最后一条消息id
   */
  lastMsgId?: string | number;

  /**
   * 最后一条消息时间，精确到毫秒
   */
  lastMsgTime?: string;

  /**
   * 未读消息数量
   */
  noReadCount?: number;

  /**
   * 置顶标志 0不置顶  1置顶
   */
  topFlag?: number;

  /**
   * 置顶时间,用于排序
   */
  topTime?: string;

  /**
   * 对话移除标志 0没移除  1移除
   */
  removedFlag?: number;

  /**
   * 移除时间,用于判断是否展示
   */
  removedTime?: string;

  /**
   * 是否有at我的消息 0无,1有 
   */
  atMeFlag?: number;

  /**
   * 有at我的消息id
   */
  atMeMsgId?: string | number;

  /**
   * 会话类型:1单聊,2群聊,3系统通知 5频道
   */
  conversationType?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



