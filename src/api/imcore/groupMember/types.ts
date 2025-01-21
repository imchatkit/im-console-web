export interface GroupMemberVO {
  /**
   * 唯一id
   */
  id: string | number;

  /**
   * 会话ID
   */
  fkConversationId: string | number;

  /**
   * 群组表id
   */
  fkGroupId: string | number;

  /**
   * 会话成员表id
   */
  fkConversationMemberId: string | number;

  /**
   * 用户id
   */
  fkUserId: string | number;

  /**
   * 邀请该成员进群的用户
   */
  memberInvitedJoinUser: number;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  extras: string;

  /**
   * 群聊中用户的备注名
   */
  userGroupRemarkName: string;

  /**
   * 角色 1-普通群成员 2-管理员 3-群主
   */
  role: number;

  /**
   * 群组成员状态  0主动退群  1正常 2被移出群聊
   */
  groupMemberStatus: number;

  /**
   * 群组成员进群方式: 1创建时加入 2主动扫码加入 3被邀请进入
   */
  groupMemberJoinType: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

}

export interface GroupMemberForm extends BaseEntity {
  /**
   * 唯一id
   */
  id?: string | number;

  /**
   * 会话ID
   */
  fkConversationId?: string | number;

  /**
   * 群组表id
   */
  fkGroupId?: string | number;

  /**
   * 会话成员表id
   */
  fkConversationMemberId?: string | number;

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 邀请该成员进群的用户
   */
  memberInvitedJoinUser?: number;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  extras?: string;

  /**
   * 群聊中用户的备注名
   */
  userGroupRemarkName?: string;

  /**
   * 角色 1-普通群成员 2-管理员 3-群主
   */
  role?: number;

  /**
   * 群组成员状态  0主动退群  1正常 2被移出群聊
   */
  groupMemberStatus?: number;

  /**
   * 群组成员进群方式: 1创建时加入 2主动扫码加入 3被邀请进入
   */
  groupMemberJoinType?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

}

export interface GroupMemberQuery extends PageQuery {

  /**
   * 会话ID
   */
  fkConversationId?: string | number;

  /**
   * 群组表id
   */
  fkGroupId?: string | number;

  /**
   * 会话成员表id
   */
  fkConversationMemberId?: string | number;

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 邀请该成员进群的用户
   */
  memberInvitedJoinUser?: number;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  extras?: string;

  /**
   * 群聊中用户的备注名
   */
  userGroupRemarkName?: string;

  /**
   * 角色 1-普通群成员 2-管理员 3-群主
   */
  role?: number;

  /**
   * 群组成员状态  0主动退群  1正常 2被移出群聊
   */
  groupMemberStatus?: number;

  /**
   * 群组成员进群方式: 1创建时加入 2主动扫码加入 3被邀请进入
   */
  groupMemberJoinType?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



