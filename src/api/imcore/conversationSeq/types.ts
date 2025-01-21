export interface ConversationSeqVO {
  /**
   * 主键id
   */
  conversationId: string | number;

  /**
   * 会话当前序列号
   */
  conversationSeq: number;

}

export interface ConversationSeqForm extends BaseEntity {
  /**
   * 主键id
   */
  conversationId?: string | number;

  /**
   * 会话当前序列号
   */
  conversationSeq?: number;

}

export interface ConversationSeqQuery extends PageQuery {

  /**
   * 会话当前序列号
   */
  conversationSeq?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



