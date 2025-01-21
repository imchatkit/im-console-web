export interface UserVO {
  /**
   * 主键id
   */
  id: string | number;

  /**
   * 手机号地区编码+86等等
   */
  addressCode: number;

  /**
   * 
   */
  phone: string;

  /**
   * 身份证号码
   */
  idCardNo: string | number;

  /**
   * 
   */
  email: string;

  /**
   * 密码
   */
  password: string;

  /**
   * 性别 1-男 2-女 3-未知
   */
  sex: number;

  /**
   * 头像
   */
  avatar: string;

  /**
   * 
   */
  nickname: string;

  /**
   * 最后离线时间
   */
  lastOfflineTime: string;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  attributes: string;

  /**
   * 所有设备不推送提醒 1提醒
   */
  allValid: string | number;

  /**
   * 用户状态
   */
  userStatus: number;

  /**
   * 最后登录时间
   */
  lastLoginTime: string;

  /**
   * 最后登录IP
   */
  lastLoginIp: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface UserForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: string | number;

  /**
   * 手机号地区编码+86等等
   */
  addressCode?: number;

  /**
   * 
   */
  phone?: string;

  /**
   * 身份证号码
   */
  idCardNo?: string | number;

  /**
   * 
   */
  email?: string;

  /**
   * 密码
   */
  password?: string;

  /**
   * 性别 1-男 2-女 3-未知
   */
  sex?: number;

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 
   */
  nickname?: string;

  /**
   * 最后离线时间
   */
  lastOfflineTime?: string;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  attributes?: string;

  /**
   * 所有设备不推送提醒 1提醒
   */
  allValid?: string | number;

  /**
   * 用户状态
   */
  userStatus?: number;

  /**
   * 最后登录时间
   */
  lastLoginTime?: string;

  /**
   * 最后登录IP
   */
  lastLoginIp?: string;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface UserQuery extends PageQuery {

  /**
   * 手机号地区编码+86等等
   */
  addressCode?: number;

  /**
   * 
   */
  phone?: string;

  /**
   * 身份证号码
   */
  idCardNo?: string | number;

  /**
   * 
   */
  email?: string;

  /**
   * 密码
   */
  password?: string;

  /**
   * 性别 1-男 2-女 3-未知
   */
  sex?: number;

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 
   */
  nickname?: string;

  /**
   * 最后离线时间
   */
  lastOfflineTime?: string;

  /**
   * 可选	自定义属性，供开发者扩展使用
   */
  attributes?: string;

  /**
   * 所有设备不推送提醒 1提醒
   */
  allValid?: string | number;

  /**
   * 用户状态
   */
  userStatus?: number;

  /**
   * 最后登录时间
   */
  lastLoginTime?: string;

  /**
   * 最后登录IP
   */
  lastLoginIp?: string;

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



