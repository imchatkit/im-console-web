export interface MsgReferenceVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 当前消息ID
   */
  fkMsgId: string | number;

  /**
   * 被引用的消息ID
   */
  fkRefMsgId: string | number;

  /**
   * 引用类型:1回复,2转发,3引用
   */
  refType: number;

  /**
   * 引用时添加的评论文本
   */
  refText: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface MsgReferenceForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 当前消息ID
   */
  fkMsgId?: string | number;

  /**
   * 被引用的消息ID
   */
  fkRefMsgId?: string | number;

  /**
   * 引用类型:1回复,2转发,3引用
   */
  refType?: number;

  /**
   * 引用时添加的评论文本
   */
  refText?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface MsgReferenceQuery extends PageQuery {

  /**
   * 当前消息ID
   */
  fkMsgId?: string | number;

  /**
   * 被引用的消息ID
   */
  fkRefMsgId?: string | number;

  /**
   * 引用类型:1回复,2转发,3引用
   */
  refType?: number;

  /**
   * 引用时添加的评论文本
   */
  refText?: string;

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



