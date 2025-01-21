export interface FriendRequestVO {
  /**
   * 申请ID
   */
  id: string | number;

  /**
   * 申请人ID
   */
  fromUserId: string | number;

  /**
   * 给接收人的备注
   */
  fromUserRemarkName: string;

  /**
   * 接收人ID
   */
  toUserId: string | number;

  /**
   * 验证信息
   */
  message: string;

  /**
   * 状态: 0-待处理 1-同意 2-拒绝 3-已过期 4-已取消 5-已删除 6-已忽略
   */
  status: number;

  /**
   * 处理时间
   */
  handleTime: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface FriendRequestForm extends BaseEntity {
  /**
   * 申请ID
   */
  id?: string | number;

  /**
   * 申请人ID
   */
  fromUserId?: string | number;

  /**
   * 给接收人的备注
   */
  fromUserRemarkName?: string;

  /**
   * 接收人ID
   */
  toUserId?: string | number;

  /**
   * 验证信息
   */
  message?: string;

  /**
   * 状态: 0-待处理 1-同意 2-拒绝 3-已过期 4-已取消 5-已删除 6-已忽略
   */
  status?: number;

  /**
   * 处理时间
   */
  handleTime?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface FriendRequestQuery extends PageQuery {

  /**
   * 申请人ID
   */
  fromUserId?: string | number;

  /**
   * 给接收人的备注
   */
  fromUserRemarkName?: string;

  /**
   * 接收人ID
   */
  toUserId?: string | number;

  /**
   * 验证信息
   */
  message?: string;

  /**
   * 状态: 0-待处理 1-同意 2-拒绝 3-已过期 4-已取消 5-已删除 6-已忽略
   */
  status?: number;

  /**
   * 处理时间
   */
  handleTime?: string;

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



