export interface GroupSettingVO {
  /**
   * 群组ID
   */
  fkGroupId: string | number;

  /**
   * 全员禁言: 0-否 1-是
   */
  allMute: number;

  /**
   * 成员邀请开关 0-关闭 1-开启
   */
  memberInvite: number;

  /**
   * 成员修改群信息开关 0-关闭 1-开启
   */
  memberModify: number;

  /**
   * 成员列表可见开关 0-关闭 1-开启
   */
  memberVisible: number;

  /**
   * 禁止群内加好友 0-关闭 1-开启
   */
  forbidAddFriend: string | number;

  /**
   * 禁止发红包 0-关闭 1-开启
   */
  forbidSendRedpacket: string | number;

  /**
   * 禁止发图片 0-关闭 1-开启
   */
  forbidSendImage: string | number;

  /**
   * 禁止发图片 0-关闭 1-开启Url
   */
  forbidSendImageUrl: string;
  /**
   * 禁止发链接 0-关闭 1-开启
   */
  forbidSendLink: string | number;

  /**
   * 群组是否已解散 0-否 1-是
   */
  groupDisbanded: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

}

export interface GroupSettingForm extends BaseEntity {
  /**
   * 群组ID
   */
  fkGroupId?: string | number;

  /**
   * 全员禁言: 0-否 1-是
   */
  allMute?: number;

  /**
   * 成员邀请开关 0-关闭 1-开启
   */
  memberInvite?: number;

  /**
   * 成员修改群信息开关 0-关闭 1-开启
   */
  memberModify?: number;

  /**
   * 成员列表可见开关 0-关闭 1-开启
   */
  memberVisible?: number;

  /**
   * 禁止群内加好友 0-关闭 1-开启
   */
  forbidAddFriend?: string | number;

  /**
   * 禁止发红包 0-关闭 1-开启
   */
  forbidSendRedpacket?: string | number;

  /**
   * 禁止发图片 0-关闭 1-开启
   */
  forbidSendImage?: string | number;

  /**
   * 禁止发链接 0-关闭 1-开启
   */
  forbidSendLink?: string | number;

  /**
   * 群组是否已解散 0-否 1-是
   */
  groupDisbanded?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

}

export interface GroupSettingQuery extends PageQuery {

  /**
   * 全员禁言: 0-否 1-是
   */
  allMute?: number;

  /**
   * 成员邀请开关 0-关闭 1-开启
   */
  memberInvite?: number;

  /**
   * 成员修改群信息开关 0-关闭 1-开启
   */
  memberModify?: number;

  /**
   * 成员列表可见开关 0-关闭 1-开启
   */
  memberVisible?: number;

  /**
   * 禁止群内加好友 0-关闭 1-开启
   */
  forbidAddFriend?: string | number;

  /**
   * 禁止发红包 0-关闭 1-开启
   */
  forbidSendRedpacket?: string | number;

  /**
   * 禁止发图片 0-关闭 1-开启
   */
  forbidSendImage?: string | number;

  /**
   * 禁止发链接 0-关闭 1-开启
   */
  forbidSendLink?: string | number;

  /**
   * 群组是否已解散 0-否 1-是
   */
  groupDisbanded?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



