export interface MsgReferencePathVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 消息ID
   */
  fkMsgId: string | number;

  /**
   * 祖先消息ID
   */
  ancestorMsgId: string | number;

  /**
   * 引用深度(层级距离)
   */
  distance: number;

  /**
   * 引用路径(格式:id1->id2->id3)
   */
  path: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface MsgReferencePathForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 消息ID
   */
  fkMsgId?: string | number;

  /**
   * 祖先消息ID
   */
  ancestorMsgId?: string | number;

  /**
   * 引用深度(层级距离)
   */
  distance?: number;

  /**
   * 引用路径(格式:id1->id2->id3)
   */
  path?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface MsgReferencePathQuery extends PageQuery {

  /**
   * 消息ID
   */
  fkMsgId?: string | number;

  /**
   * 祖先消息ID
   */
  ancestorMsgId?: string | number;

  /**
   * 引用深度(层级距离)
   */
  distance?: number;

  /**
   * 引用路径(格式:id1->id2->id3)
   */
  path?: string;

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



