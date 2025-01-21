export interface WorkspaceVO {
  /**
   * 工作空间ID
   */
  id: string | number;

  /**
   * 工作空间名称
   */
  workspaceName: string;

  /**
   * 创建者ID
   */
  creatorUserId: string | number;

  /**
   * 工作空间描述
   */
  description: string;

  /**
   * 工作空间域名
   */
  domain: string;

  /**
   * logo地址
   */
  logoUrl: string;

  /**
   * 空间状态
   */
  workspaceStatus: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface WorkspaceForm extends BaseEntity {
  /**
   * 工作空间ID
   */
  id?: string | number;

  /**
   * 工作空间名称
   */
  workspaceName?: string;

  /**
   * 创建者ID
   */
  creatorUserId?: string | number;

  /**
   * 工作空间描述
   */
  description?: string;

  /**
   * 工作空间域名
   */
  domain?: string;

  /**
   * logo地址
   */
  logoUrl?: string;

  /**
   * 空间状态
   */
  workspaceStatus?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface WorkspaceQuery extends PageQuery {

  /**
   * 工作空间名称
   */
  workspaceName?: string;

  /**
   * 创建者ID
   */
  creatorUserId?: string | number;

  /**
   * 工作空间描述
   */
  description?: string;

  /**
   * 工作空间域名
   */
  domain?: string;

  /**
   * logo地址
   */
  logoUrl?: string;

  /**
   * 空间状态
   */
  workspaceStatus?: number;

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



