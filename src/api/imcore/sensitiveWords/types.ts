export interface SensitiveWordsVO {
  /**
   * 敏感词id
   */
  id: string | number;

  /**
   * 敏感词
   */
  word: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface SensitiveWordsForm extends BaseEntity {
  /**
   * 敏感词id
   */
  id?: string | number;

  /**
   * 敏感词
   */
  word?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface SensitiveWordsQuery extends PageQuery {

  /**
   * 敏感词
   */
  word?: string;

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



