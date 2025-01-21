<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="会话id" prop="fkConversationId">
              <el-input v-model="queryParams.fkConversationId" placeholder="请输入会话id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="发送者id" prop="fkFromUserId">
              <el-input v-model="queryParams.fkFromUserId" placeholder="请输入发送者id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="会话粒度单调自增序列号" prop="conversationSeq">
              <el-input v-model="queryParams.conversationSeq" placeholder="请输入会话粒度单调自增序列号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="客户端本地消息id" prop="localMsgId">
              <el-input v-model="queryParams.localMsgId" placeholder="请输入客户端本地消息id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="载荷内容如图片视频卡片等不同的参数" prop="payload">
              <el-input v-model="queryParams.payload" placeholder="请输入载荷内容如图片视频卡片等不同的参数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="媒体文件地址" prop="mediaUrl">
              <el-input v-model="queryParams.mediaUrl" placeholder="请输入媒体文件地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="文字内容" prop="msgText">
              <el-input v-model="queryParams.msgText" placeholder="请输入文字内容" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="接收人,多人用英文逗号分隔-群内指定人员可见场景" prop="receiverOnly">
              <el-input v-model="queryParams.receiverOnly" placeholder="请输入接收人,多人用英文逗号分隔-群内指定人员可见场景" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="接收方总人数" prop="receiverCount">
              <el-input v-model="queryParams.receiverCount" placeholder="请输入接收方总人数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="被引用次数" prop="refCount">
              <el-input v-model="queryParams.refCount" placeholder="请输入被引用次数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="会话根消息ID(第一条被引用的消息)" prop="rootMsgId">
              <el-input v-model="queryParams.rootMsgId" placeholder="请输入会话根消息ID(第一条被引用的消息)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="直接引用的消息ID" prop="parentMsgId">
              <el-input v-model="queryParams.parentMsgId" placeholder="请输入直接引用的消息ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否删除 0-未删除 1-已删除" prop="deleted">
              <el-input v-model="queryParams.deleted" placeholder="请输入是否删除 0-未删除 1-已删除" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="@全体成员标记 0-否 1-是" prop="atAll">
              <el-input v-model="queryParams.atAll" placeholder="请输入@全体成员标记 0-否 1-是" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="可选 自定义属性，供开发者扩展使用" prop="extras">
              <el-input v-model="queryParams.extras" placeholder="请输入可选 自定义属性，供开发者扩展使用" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="应用ID" prop="appId">
              <el-input v-model="queryParams.appId" placeholder="请输入应用ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="接收者ID(单聊必填)" prop="toUid">
              <el-input v-model="queryParams.toUid" placeholder="请输入接收者ID(单聊必填)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="命令类型" prop="cmd">
              <el-input v-model="queryParams.cmd" placeholder="请输入命令类型" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否持久化" prop="persistent">
              <el-input v-model="queryParams.persistent" placeholder="请输入是否持久化" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="消息优先级" prop="priority">
              <el-input v-model="queryParams.priority" placeholder="请输入消息优先级" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否需要回执" prop="needReceipt">
              <el-input v-model="queryParams.needReceipt" placeholder="请输入是否需要回执" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:message:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:message:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:message:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:message:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="messageList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="消息id" align="center" prop="id" v-if="true" />
        <el-table-column label="会话id" align="center" prop="fkConversationId" />
        <el-table-column label="发送者id" align="center" prop="fkFromUserId" />
        <el-table-column label="会话粒度单调自增序列号" align="center" prop="conversationSeq" />
        <el-table-column label="客户端本地消息id" align="center" prop="localMsgId" />
        <el-table-column label="消息类型" align="center" prop="msgType" />
        <el-table-column label="载荷内容如图片视频卡片等不同的参数" align="center" prop="payload" />
        <el-table-column label="媒体文件地址" align="center" prop="mediaUrl" />
        <el-table-column label="文字内容" align="center" prop="msgText" />
        <el-table-column label="被@用户列表 格式:[{userId:1,name:"张三"},{userId:2,name:"李四"}]" align="center" prop="atUsers" />
        <el-table-column label="消息状态 1正常 2已撤回" align="center" prop="msgStatus" />
        <el-table-column label="接收人,多人用英文逗号分隔-群内指定人员可见场景" align="center" prop="receiverOnly" />
        <el-table-column label="接收方总人数" align="center" prop="receiverCount" />
        <el-table-column label="被引用次数" align="center" prop="refCount" />
        <el-table-column label="引用类型:0原创,1回复,2转发,3引用" align="center" prop="refType" />
        <el-table-column label="会话根消息ID(第一条被引用的消息)" align="center" prop="rootMsgId" />
        <el-table-column label="直接引用的消息ID" align="center" prop="parentMsgId" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="@全体成员标记 0-否 1-是" align="center" prop="atAll" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="应用ID" align="center" prop="appId" />
        <el-table-column label="会话类型:1单聊,2群聊,3聊天室" align="center" prop="conversationType" />
        <el-table-column label="接收者ID(单聊必填)" align="center" prop="toUid" />
        <el-table-column label="命令类型" align="center" prop="cmd" />
        <el-table-column label="是否持久化" align="center" prop="persistent" />
        <el-table-column label="消息优先级" align="center" prop="priority" />
        <el-table-column label="是否需要回执" align="center" prop="needReceipt" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:message:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:message:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改消息存储对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="messageFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会话id" prop="fkConversationId">
          <el-input v-model="form.fkConversationId" placeholder="请输入会话id" />
        </el-form-item>
        <el-form-item label="发送者id" prop="fkFromUserId">
          <el-input v-model="form.fkFromUserId" placeholder="请输入发送者id" />
        </el-form-item>
        <el-form-item label="会话粒度单调自增序列号" prop="conversationSeq">
          <el-input v-model="form.conversationSeq" placeholder="请输入会话粒度单调自增序列号" />
        </el-form-item>
        <el-form-item label="客户端本地消息id" prop="localMsgId">
          <el-input v-model="form.localMsgId" placeholder="请输入客户端本地消息id" />
        </el-form-item>
        <el-form-item label="载荷内容如图片视频卡片等不同的参数" prop="payload">
            <el-input v-model="form.payload" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="媒体文件地址" prop="mediaUrl">
          <el-input v-model="form.mediaUrl" placeholder="请输入媒体文件地址" />
        </el-form-item>
        <el-form-item label="文字内容" prop="msgText">
            <el-input v-model="form.msgText" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="接收人,多人用英文逗号分隔-群内指定人员可见场景" prop="receiverOnly">
            <el-input v-model="form.receiverOnly" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="接收方总人数" prop="receiverCount">
          <el-input v-model="form.receiverCount" placeholder="请输入接收方总人数" />
        </el-form-item>
        <el-form-item label="被引用次数" prop="refCount">
          <el-input v-model="form.refCount" placeholder="请输入被引用次数" />
        </el-form-item>
        <el-form-item label="会话根消息ID(第一条被引用的消息)" prop="rootMsgId">
          <el-input v-model="form.rootMsgId" placeholder="请输入会话根消息ID(第一条被引用的消息)" />
        </el-form-item>
        <el-form-item label="直接引用的消息ID" prop="parentMsgId">
          <el-input v-model="form.parentMsgId" placeholder="请输入直接引用的消息ID" />
        </el-form-item>
        <el-form-item label="是否删除 0-未删除 1-已删除" prop="deleted">
          <el-input v-model="form.deleted" placeholder="请输入是否删除 0-未删除 1-已删除" />
        </el-form-item>
        <el-form-item label="@全体成员标记 0-否 1-是" prop="atAll">
          <el-input v-model="form.atAll" placeholder="请输入@全体成员标记 0-否 1-是" />
        </el-form-item>
        <el-form-item label="可选 自定义属性，供开发者扩展使用" prop="extras">
            <el-input v-model="form.extras" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="应用ID" prop="appId">
          <el-input v-model="form.appId" placeholder="请输入应用ID" />
        </el-form-item>
        <el-form-item label="接收者ID(单聊必填)" prop="toUid">
          <el-input v-model="form.toUid" placeholder="请输入接收者ID(单聊必填)" />
        </el-form-item>
        <el-form-item label="命令类型" prop="cmd">
          <el-input v-model="form.cmd" placeholder="请输入命令类型" />
        </el-form-item>
        <el-form-item label="是否持久化" prop="persistent">
          <el-input v-model="form.persistent" placeholder="请输入是否持久化" />
        </el-form-item>
        <el-form-item label="消息优先级" prop="priority">
          <el-input v-model="form.priority" placeholder="请输入消息优先级" />
        </el-form-item>
        <el-form-item label="是否需要回执" prop="needReceipt">
          <el-input v-model="form.needReceipt" placeholder="请输入是否需要回执" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Message" lang="ts">
import { listMessage, getMessage, delMessage, addMessage, updateMessage } from '@/api/imcore/message';
import { MessageVO, MessageQuery, MessageForm } from '@/api/imcore/message/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const messageList = ref<MessageVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const messageFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MessageForm = {
  id: undefined,
  fkConversationId: undefined,
  fkFromUserId: undefined,
  conversationSeq: undefined,
  localMsgId: undefined,
  msgType: undefined,
  payload: undefined,
  mediaUrl: undefined,
  msgText: undefined,
  atUsers: undefined,
  msgStatus: undefined,
  receiverOnly: undefined,
  receiverCount: undefined,
  refCount: undefined,
  refType: undefined,
  rootMsgId: undefined,
  parentMsgId: undefined,
  deleted: undefined,
  atAll: undefined,
  extras: undefined,
  appId: undefined,
  conversationType: undefined,
  toUid: undefined,
  cmd: undefined,
  persistent: undefined,
  priority: undefined,
  needReceipt: undefined
}
const data = reactive<PageData<MessageForm, MessageQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkConversationId: undefined,
    fkFromUserId: undefined,
    conversationSeq: undefined,
    localMsgId: undefined,
    msgType: undefined,
    payload: undefined,
    mediaUrl: undefined,
    msgText: undefined,
    atUsers: undefined,
    msgStatus: undefined,
    receiverOnly: undefined,
    receiverCount: undefined,
    refCount: undefined,
    refType: undefined,
    rootMsgId: undefined,
    parentMsgId: undefined,
    deleted: undefined,
    atAll: undefined,
    extras: undefined,
    appId: undefined,
    conversationType: undefined,
    toUid: undefined,
    cmd: undefined,
    persistent: undefined,
    priority: undefined,
    needReceipt: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "消息id不能为空", trigger: "blur" }
    ],
    fkConversationId: [
      { required: true, message: "会话id不能为空", trigger: "blur" }
    ],
    fkFromUserId: [
      { required: true, message: "发送者id不能为空", trigger: "blur" }
    ],
    conversationSeq: [
      { required: true, message: "会话粒度单调自增序列号不能为空", trigger: "blur" }
    ],
    localMsgId: [
      { required: true, message: "客户端本地消息id不能为空", trigger: "blur" }
    ],
    msgType: [
      { required: true, message: "消息类型不能为空", trigger: "change" }
    ],
    payload: [
      { required: true, message: "载荷内容如图片视频卡片等不同的参数不能为空", trigger: "blur" }
    ],
    mediaUrl: [
      { required: true, message: "媒体文件地址不能为空", trigger: "blur" }
    ],
    msgText: [
      { required: true, message: "文字内容不能为空", trigger: "blur" }
    ],
    atUsers: [
      { required: true, message: "被@用户列表 格式:[{userId:1,name:"张三"},{userId:2,name:"李四"}]不能为空", trigger: "blur" }
    ],
    msgStatus: [
      { required: true, message: "消息状态 1正常 2已撤回不能为空", trigger: "change" }
    ],
    receiverOnly: [
      { required: true, message: "接收人,多人用英文逗号分隔-群内指定人员可见场景不能为空", trigger: "blur" }
    ],
    receiverCount: [
      { required: true, message: "接收方总人数不能为空", trigger: "blur" }
    ],
    refCount: [
      { required: true, message: "被引用次数不能为空", trigger: "blur" }
    ],
    refType: [
      { required: true, message: "引用类型:0原创,1回复,2转发,3引用不能为空", trigger: "change" }
    ],
    rootMsgId: [
      { required: true, message: "会话根消息ID(第一条被引用的消息)不能为空", trigger: "blur" }
    ],
    parentMsgId: [
      { required: true, message: "直接引用的消息ID不能为空", trigger: "blur" }
    ],
    deleted: [
      { required: true, message: "是否删除 0-未删除 1-已删除不能为空", trigger: "blur" }
    ],
    atAll: [
      { required: true, message: "@全体成员标记 0-否 1-是不能为空", trigger: "blur" }
    ],
    extras: [
      { required: true, message: "可选 自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ],
    appId: [
      { required: true, message: "应用ID不能为空", trigger: "blur" }
    ],
    conversationType: [
      { required: true, message: "会话类型:1单聊,2群聊,3聊天室不能为空", trigger: "change" }
    ],
    toUid: [
      { required: true, message: "接收者ID(单聊必填)不能为空", trigger: "blur" }
    ],
    cmd: [
      { required: true, message: "命令类型不能为空", trigger: "blur" }
    ],
    persistent: [
      { required: true, message: "是否持久化不能为空", trigger: "blur" }
    ],
    priority: [
      { required: true, message: "消息优先级不能为空", trigger: "blur" }
    ],
    needReceipt: [
      { required: true, message: "是否需要回执不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询消息存储列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMessage(queryParams.value);
  messageList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  messageFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: MessageVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加消息存储";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MessageVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMessage(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改消息存储";
}

/** 提交按钮 */
const submitForm = () => {
  messageFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMessage(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMessage(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MessageVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除消息存储编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMessage(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/message/export', {
    ...queryParams.value
  }, `message_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
