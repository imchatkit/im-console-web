export interface ConversationMemberVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 会话ID
   */
  fkConversationId: string | number;

  /**
   * 用户id
   */
  fkUserId: string | number;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  extras: string;

  /**
   * 会话中的备注名
   */
  userRemarkName: string;

  /**
   * 角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单
   */
  role: number;

  /**
   * 免打扰开关 0-关闭 1开启
   */
  disturbFlag: number;

  /**
   * 置顶开关 0-关闭 1开启
   */
  topFlag: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 屏蔽@全体成员 0-不屏蔽 1-屏蔽
   */
  muteAtAll: number;

  /**
   * 禁言状态: 1-正常发言 2-永久禁言 3-限时禁言
   */
  muted: number;

  /**
   * 禁言结束时间
   */
  muteEndTime: string;

}

export interface ConversationMemberForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 会话ID
   */
  fkConversationId?: string | number;

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  extras?: string;

  /**
   * 会话中的备注名
   */
  userRemarkName?: string;

  /**
   * 角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单
   */
  role?: number;

  /**
   * 免打扰开关 0-关闭 1开启
   */
  disturbFlag?: number;

  /**
   * 置顶开关 0-关闭 1开启
   */
  topFlag?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 屏蔽@全体成员 0-不屏蔽 1-屏蔽
   */
  muteAtAll?: number;

  /**
   * 禁言状态: 1-正常发言 2-永久禁言 3-限时禁言
   */
  muted?: number;

  /**
   * 禁言结束时间
   */
  muteEndTime?: string;

}

export interface ConversationMemberQuery extends PageQuery {

  /**
   * 会话ID
   */
  fkConversationId?: string | number;

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  extras?: string;

  /**
   * 会话中的备注名
   */
  userRemarkName?: string;

  /**
   * 角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单
   */
  role?: number;

  /**
   * 免打扰开关 0-关闭 1开启
   */
  disturbFlag?: number;

  /**
   * 置顶开关 0-关闭 1开启
   */
  topFlag?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 屏蔽@全体成员 0-不屏蔽 1-屏蔽
   */
  muteAtAll?: number;

  /**
   * 禁言状态: 1-正常发言 2-永久禁言 3-限时禁言
   */
  muted?: number;

  /**
   * 禁言结束时间
   */
  muteEndTime?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



