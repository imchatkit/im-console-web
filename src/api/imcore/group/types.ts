export interface GroupVO {
  /**
   * 群组ID
   */
  id: string | number;

  /**
   * 关联的会话ID
   */
  fkConversationId: string | number;

  /**
   * 群名称
   */
  name: string;

  /**
   * 群主ID
   */
  ownerId: string | number;

  /**
   * 群类型: 1-普通群 2-部门群 3-企业群
   */
  groupType: number;

  /**
   * 最大成员数
   */
  maxMemberCount: number;

  /**
   * 加群方式: 0-自由加入 1-需验证 2-禁止加入
   */
  joinType: number;

  /**
   * 群公告
   */
  notice: string;

  /**
   * 关联组织ID
   */
  orgId: string | number;

  /**
   * 关联部门ID
   */
  deptId: string | number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface GroupForm extends BaseEntity {
  /**
   * 群组ID
   */
  id?: string | number;

  /**
   * 关联的会话ID
   */
  fkConversationId?: string | number;

  /**
   * 群名称
   */
  name?: string;

  /**
   * 群主ID
   */
  ownerId?: string | number;

  /**
   * 群类型: 1-普通群 2-部门群 3-企业群
   */
  groupType?: number;

  /**
   * 最大成员数
   */
  maxMemberCount?: number;

  /**
   * 加群方式: 0-自由加入 1-需验证 2-禁止加入
   */
  joinType?: number;

  /**
   * 群公告
   */
  notice?: string;

  /**
   * 关联组织ID
   */
  orgId?: string | number;

  /**
   * 关联部门ID
   */
  deptId?: string | number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface GroupQuery extends PageQuery {

  /**
   * 关联的会话ID
   */
  fkConversationId?: string | number;

  /**
   * 群名称
   */
  name?: string;

  /**
   * 群主ID
   */
  ownerId?: string | number;

  /**
   * 群类型: 1-普通群 2-部门群 3-企业群
   */
  groupType?: number;

  /**
   * 最大成员数
   */
  maxMemberCount?: number;

  /**
   * 加群方式: 0-自由加入 1-需验证 2-禁止加入
   */
  joinType?: number;

  /**
   * 群公告
   */
  notice?: string;

  /**
   * 关联组织ID
   */
  orgId?: string | number;

  /**
   * 关联部门ID
   */
  deptId?: string | number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



