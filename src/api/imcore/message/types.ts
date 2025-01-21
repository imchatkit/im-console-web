export interface MessageVO {
  /**
   * 消息id
   */
  id: string | number;

  /**
   * 会话id
   */
  fkConversationId: string | number;

  /**
   * 发送者id
   */
  fkFromUserId: string | number;

  /**
   * 会话粒度单调自增序列号
   */
  conversationSeq: number;

  /**
   * 客户端本地消息id
   */
  localMsgId: string | number;

  /**
   * 消息类型
   */
  msgType: number;

  /**
   * 载荷内容如图片视频卡片等不同的参数
   */
  payload: string;

  /**
   * 媒体文件地址
   */
  mediaUrl: string;

  /**
   * 文字内容
   */
  msgText: string;

  /**
   * 被@用户列表 格式:[{userId:1,name:"张三"},{userId:2,name:"李四"}]
   */
  atUsers: string;

  /**
   * 消息状态 1正常 2已撤回
   */
  msgStatus: number;

  /**
   * 接收人,多人用英文逗号分隔-群内指定人员可见场景
   */
  receiverOnly: string;

  /**
   * 接收方总人数
   */
  receiverCount: number;

  /**
   * 被引用次数
   */
  refCount: number;

  /**
   * 引用类型:0原创,1回复,2转发,3引用
   */
  refType: number;

  /**
   * 会话根消息ID(第一条被引用的消息)
   */
  rootMsgId: string | number;

  /**
   * 直接引用的消息ID
   */
  parentMsgId: string | number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted: number;

  /**
   * @全体成员标记 0-否 1-是
   */
  atAll: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras: string;

  /**
   * 应用ID
   */
  appId: string | number;

  /**
   * 会话类型:1单聊,2群聊,3聊天室
   */
  conversationType: number;

  /**
   * 接收者ID(单聊必填)
   */
  toUid: string | number;

  /**
   * 命令类型
   */
  cmd: number;

  /**
   * 是否持久化
   */
  persistent: number;

  /**
   * 消息优先级
   */
  priority: number;

  /**
   * 是否需要回执
   */
  needReceipt: number;

}

export interface MessageForm extends BaseEntity {
  /**
   * 消息id
   */
  id?: string | number;

  /**
   * 会话id
   */
  fkConversationId?: string | number;

  /**
   * 发送者id
   */
  fkFromUserId?: string | number;

  /**
   * 会话粒度单调自增序列号
   */
  conversationSeq?: number;

  /**
   * 客户端本地消息id
   */
  localMsgId?: string | number;

  /**
   * 消息类型
   */
  msgType?: number;

  /**
   * 载荷内容如图片视频卡片等不同的参数
   */
  payload?: string;

  /**
   * 媒体文件地址
   */
  mediaUrl?: string;

  /**
   * 文字内容
   */
  msgText?: string;

  /**
   * 被@用户列表 格式:[{userId:1,name:"张三"},{userId:2,name:"李四"}]
   */
  atUsers?: string;

  /**
   * 消息状态 1正常 2已撤回
   */
  msgStatus?: number;

  /**
   * 接收人,多人用英文逗号分隔-群内指定人员可见场景
   */
  receiverOnly?: string;

  /**
   * 接收方总人数
   */
  receiverCount?: number;

  /**
   * 被引用次数
   */
  refCount?: number;

  /**
   * 引用类型:0原创,1回复,2转发,3引用
   */
  refType?: number;

  /**
   * 会话根消息ID(第一条被引用的消息)
   */
  rootMsgId?: string | number;

  /**
   * 直接引用的消息ID
   */
  parentMsgId?: string | number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * @全体成员标记 0-否 1-是
   */
  atAll?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

  /**
   * 应用ID
   */
  appId?: string | number;

  /**
   * 会话类型:1单聊,2群聊,3聊天室
   */
  conversationType?: number;

  /**
   * 接收者ID(单聊必填)
   */
  toUid?: string | number;

  /**
   * 命令类型
   */
  cmd?: number;

  /**
   * 是否持久化
   */
  persistent?: number;

  /**
   * 消息优先级
   */
  priority?: number;

  /**
   * 是否需要回执
   */
  needReceipt?: number;

}

export interface MessageQuery extends PageQuery {

  /**
   * 会话id
   */
  fkConversationId?: string | number;

  /**
   * 发送者id
   */
  fkFromUserId?: string | number;

  /**
   * 会话粒度单调自增序列号
   */
  conversationSeq?: number;

  /**
   * 客户端本地消息id
   */
  localMsgId?: string | number;

  /**
   * 消息类型
   */
  msgType?: number;

  /**
   * 载荷内容如图片视频卡片等不同的参数
   */
  payload?: string;

  /**
   * 媒体文件地址
   */
  mediaUrl?: string;

  /**
   * 文字内容
   */
  msgText?: string;

  /**
   * 被@用户列表 格式:[{userId:1,name:"张三"},{userId:2,name:"李四"}]
   */
  atUsers?: string;

  /**
   * 消息状态 1正常 2已撤回
   */
  msgStatus?: number;

  /**
   * 接收人,多人用英文逗号分隔-群内指定人员可见场景
   */
  receiverOnly?: string;

  /**
   * 接收方总人数
   */
  receiverCount?: number;

  /**
   * 被引用次数
   */
  refCount?: number;

  /**
   * 引用类型:0原创,1回复,2转发,3引用
   */
  refType?: number;

  /**
   * 会话根消息ID(第一条被引用的消息)
   */
  rootMsgId?: string | number;

  /**
   * 直接引用的消息ID
   */
  parentMsgId?: string | number;

  /**
   * 是否删除 0-未删除 1-已删除
   */
  deleted?: number;

  /**
   * @全体成员标记 0-否 1-是
   */
  atAll?: number;

  /**
   * 可选 自定义属性，供开发者扩展使用
   */
  extras?: string;

  /**
   * 应用ID
   */
  appId?: string | number;

  /**
   * 会话类型:1单聊,2群聊,3聊天室
   */
  conversationType?: number;

  /**
   * 接收者ID(单聊必填)
   */
  toUid?: string | number;

  /**
   * 命令类型
   */
  cmd?: number;

  /**
   * 是否持久化
   */
  persistent?: number;

  /**
   * 消息优先级
   */
  priority?: number;

  /**
   * 是否需要回执
   */
  needReceipt?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



