export interface FriendVO {
  /**
   * 关系ID
   */
  id: string | number;

  /**
   * 用户ID
   */
  fkUserId: string | number;

  /**
   * 好友ID
   */
  fkFriendId: string | number;

  /**
   * 单聊会话ID
   */
  conversationId: string | number;

  /**
   * 备注名
   */
  remark: string;

  /**
   * 来源: 1-搜索 2-群聊 3-名片
   */
  source: number;

  /**
   * 状态: 1-正常 2-删除 3-拉黑
   */
  status: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface FriendForm extends BaseEntity {
  /**
   * 关系ID
   */
  id?: string | number;

  /**
   * 用户ID
   */
  fkUserId?: string | number;

  /**
   * 好友ID
   */
  fkFriendId?: string | number;

  /**
   * 单聊会话ID
   */
  conversationId?: string | number;

  /**
   * 备注名
   */
  remark?: string;

  /**
   * 来源: 1-搜索 2-群聊 3-名片
   */
  source?: number;

  /**
   * 状态: 1-正常 2-删除 3-拉黑
   */
  status?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface FriendQuery extends PageQuery {

  /**
   * 用户ID
   */
  fkUserId?: string | number;

  /**
   * 好友ID
   */
  fkFriendId?: string | number;

  /**
   * 单聊会话ID
   */
  conversationId?: string | number;

  /**
   * 来源: 1-搜索 2-群聊 3-名片
   */
  source?: number;

  /**
   * 状态: 1-正常 2-删除 3-拉黑
   */
  status?: number;

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



