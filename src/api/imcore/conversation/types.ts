export interface ConversationVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 头像
   */
  avatar: string;

  /**
   * 会话类型: 1-单聊 2-群聊 3-系统通知 4-机器人 5频道
   */
  conversationType: number;

  /**
   * 会话状态: 1-正常 2-禁用 3-删除 4-归档
   */
  conversationStatus: number;

  /**
   * 是否删除: 0-否 1-是
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface ConversationForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 会话类型: 1-单聊 2-群聊 3-系统通知 4-机器人 5频道
   */
  conversationType?: number;

  /**
   * 会话状态: 1-正常 2-禁用 3-删除 4-归档
   */
  conversationStatus?: number;

  /**
   * 是否删除: 0-否 1-是
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface ConversationQuery extends PageQuery {

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 会话类型: 1-单聊 2-群聊 3-系统通知 4-机器人 5频道
   */
  conversationType?: number;

  /**
   * 会话状态: 1-正常 2-禁用 3-删除 4-归档
   */
  conversationStatus?: number;

  /**
   * 是否删除: 0-否 1-是
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



