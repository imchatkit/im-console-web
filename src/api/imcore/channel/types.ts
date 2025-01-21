export interface ChannelVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 所属工作空间ID
   */
  fkWorkspaceId: string | number;

  /**
   * 关联的会话ID
   */
  fkConversationId: string | number;

  /**
   * 频道名称
   */
  channelName: string;

  /**
   * 频道类型:1公开,2私密
   */
  channelType: number;

  /**
   * 频道主题
   */
  topic: string;

  /**
   * 频道描述
   */
  description: string;

  /**
   * 父频道ID,用于嵌套
   */
  parentId: string | number;

  /**
   * 创建者ID
   */
  creatorUserId: string | number;

  /**
   * 排序号
   */
  sortOrder: number;

  /**
   * 是否归档:0否,1是
   */
  archived: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface ChannelForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 所属工作空间ID
   */
  fkWorkspaceId?: string | number;

  /**
   * 关联的会话ID
   */
  fkConversationId?: string | number;

  /**
   * 频道名称
   */
  channelName?: string;

  /**
   * 频道类型:1公开,2私密
   */
  channelType?: number;

  /**
   * 频道主题
   */
  topic?: string;

  /**
   * 频道描述
   */
  description?: string;

  /**
   * 父频道ID,用于嵌套
   */
  parentId?: string | number;

  /**
   * 创建者ID
   */
  creatorUserId?: string | number;

  /**
   * 排序号
   */
  sortOrder?: number;

  /**
   * 是否归档:0否,1是
   */
  archived?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface ChannelQuery extends PageQuery {

  /**
   * 所属工作空间ID
   */
  fkWorkspaceId?: string | number;

  /**
   * 关联的会话ID
   */
  fkConversationId?: string | number;

  /**
   * 频道名称
   */
  channelName?: string;

  /**
   * 频道类型:1公开,2私密
   */
  channelType?: number;

  /**
   * 频道主题
   */
  topic?: string;

  /**
   * 频道描述
   */
  description?: string;

  /**
   * 父频道ID,用于嵌套
   */
  parentId?: string | number;

  /**
   * 创建者ID
   */
  creatorUserId?: string | number;

  /**
   * 排序号
   */
  sortOrder?: number;

  /**
   * 是否归档:0否,1是
   */
  archived?: number;

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



