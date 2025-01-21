export interface UserStatusVO {
  /**
   * 
   */
  userId: string | number;

  /**
   * 在线状态:0离线,1在线
   */
  onlineStatus: number;

  /**
   * 最后活跃时间
   */
  lastActiveTime: string;

  /**
   * 设备信息
   */
  deviceInfo: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface UserStatusForm extends BaseEntity {
  /**
   * 
   */
  userId?: string | number;

  /**
   * 在线状态:0离线,1在线
   */
  onlineStatus?: number;

  /**
   * 最后活跃时间
   */
  lastActiveTime?: string;

  /**
   * 设备信息
   */
  deviceInfo?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface UserStatusQuery extends PageQuery {

  /**
   * 在线状态:0离线,1在线
   */
  onlineStatus?: number;

  /**
   * 最后活跃时间
   */
  lastActiveTime?: string;

  /**
   * 设备信息
   */
  deviceInfo?: string;

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



