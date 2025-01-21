export interface GroupAnnouncementVO {
  /**
   * 公告id
   */
  id: string | number;

  /**
   * 群组id
   */
  fkGroupId: string | number;

  /**
   * 公告内容
   */
  content: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface GroupAnnouncementForm extends BaseEntity {
  /**
   * 公告id
   */
  id?: string | number;

  /**
   * 群组id
   */
  fkGroupId?: string | number;

  /**
   * 公告内容
   */
  content?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface GroupAnnouncementQuery extends PageQuery {

  /**
   * 群组id
   */
  fkGroupId?: string | number;

  /**
   * 公告内容
   */
  content?: string;

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



