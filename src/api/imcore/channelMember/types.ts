export interface ChannelMemberVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 频道ID
   */
  fkChannelId: string | number;

  /**
   * 用户ID
   */
  fkUserId: string | number;

  /**
   * 用户权限
   */
  memberRole: number;

  /**
   * 加入时间
   */
  joinTime: string;

  /**
   * 通知级别:0关闭,1提及时,2所有消息
   */
  notificationLevel: number;

  /**
   * 是否星标:0否,1是
   */
  starred: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface ChannelMemberForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 频道ID
   */
  fkChannelId?: string | number;

  /**
   * 用户ID
   */
  fkUserId?: string | number;

  /**
   * 用户权限
   */
  memberRole?: number;

  /**
   * 加入时间
   */
  joinTime?: string;

  /**
   * 通知级别:0关闭,1提及时,2所有消息
   */
  notificationLevel?: number;

  /**
   * 是否星标:0否,1是
   */
  starred?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface ChannelMemberQuery extends PageQuery {

  /**
   * 频道ID
   */
  fkChannelId?: string | number;

  /**
   * 用户ID
   */
  fkUserId?: string | number;

  /**
   * 用户权限
   */
  memberRole?: number;

  /**
   * 加入时间
   */
  joinTime?: string;

  /**
   * 通知级别:0关闭,1提及时,2所有消息
   */
  notificationLevel?: number;

  /**
   * 是否星标:0否,1是
   */
  starred?: number;

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



