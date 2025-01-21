export interface SysConversationInitVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 会话类型
   */
  conversationType: number;

  /**
   * 会话名称
   */
  conversationName: string;

  /**
   * 可选	自定义属性，供开发者扩展使用。
   */
  extras: string;

  /**
   * 头像
   */
  avatar: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

}

export interface SysConversationInitForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 会话类型
   */
  conversationType?: number;

  /**
   * 会话名称
   */
  conversationName?: string;

  /**
   * 可选	自定义属性，供开发者扩展使用。
   */
  extras?: string;

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

}

export interface SysConversationInitQuery extends PageQuery {

  /**
   * 会话类型
   */
  conversationType?: number;

  /**
   * 会话名称
   */
  conversationName?: string;

  /**
   * 可选	自定义属性，供开发者扩展使用。
   */
  extras?: string;

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



