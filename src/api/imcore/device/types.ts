export interface DeviceVO {
  /**
   * 主键id
   */
  id: string | number;

  /**
   * 用户id
   */
  fkUserId: string | number;

  /**
   * 设备不想收到推送提醒
   */
  valid: string | number;

  /**
   * 通知推送token
   */
  pushToken: string;

  /**
   * 设备唯一编码(由设备端生成)
   */
  uniqueDeviceCode: string;

  /**
   * 推送通道 1极光 2友盟
   */
  pushChannel: string;

  /**
   * 客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac
   */
  platform: number;

  /**
   * 设备状态 0退出登录 1正常
   */
  deviceStatus: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface DeviceForm extends BaseEntity {
  /**
   * 主键id
   */
  id?: string | number;

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 设备不想收到推送提醒
   */
  valid?: string | number;

  /**
   * 通知推送token
   */
  pushToken?: string;

  /**
   * 设备唯一编码(由设备端生成)
   */
  uniqueDeviceCode?: string;

  /**
   * 推送通道 1极光 2友盟
   */
  pushChannel?: string;

  /**
   * 客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac
   */
  platform?: number;

  /**
   * 设备状态 0退出登录 1正常
   */
  deviceStatus?: number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface DeviceQuery extends PageQuery {

  /**
   * 用户id
   */
  fkUserId?: string | number;

  /**
   * 设备不想收到推送提醒
   */
  valid?: string | number;

  /**
   * 通知推送token
   */
  pushToken?: string;

  /**
   * 设备唯一编码(由设备端生成)
   */
  uniqueDeviceCode?: string;

  /**
   * 推送通道 1极光 2友盟
   */
  pushChannel?: string;

  /**
   * 客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac
   */
  platform?: number;

  /**
   * 设备状态 0退出登录 1正常
   */
  deviceStatus?: number;

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



