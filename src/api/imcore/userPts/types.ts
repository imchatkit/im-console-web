export interface UserPtsVO {
  /**
   * 主键id
   */
  userId: string | number;

  /**
   * 当前最大的同步位点
   */
  pts: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface UserPtsForm extends BaseEntity {
  /**
   * 主键id
   */
  userId?: string | number;

  /**
   * 当前最大的同步位点
   */
  pts?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface UserPtsQuery extends PageQuery {

  /**
   * 当前最大的同步位点
   */
  pts?: number;

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



