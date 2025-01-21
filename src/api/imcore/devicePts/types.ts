export interface DevicePtsVO {
  /**
   * 主键id
   */
  id: string | number;

  /**
   * 用户id
   */
  fkUserId: string | number;

  /**
   * 设备id
   */
  fkDeviceId: string | number;

  /**
   * 用户某设备当前最大位点
   */
  maxPts: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface DevicePtsForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: string | number;

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 设备id
   */
  fkDeviceId?: string | number;

  /**
   * 用户某设备当前最大位点
   */
  maxPts?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface DevicePtsQuery extends PageQuery {

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 设备id
   */
  fkDeviceId?: string | number;

  /**
   * 用户某设备当前最大位点
   */
  maxPts?: number;

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



