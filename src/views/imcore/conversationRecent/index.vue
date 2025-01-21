<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="创建者id" prop="fkUserId">
              <el-input v-model="queryParams.fkUserId" placeholder="请输入创建者id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="会话id" prop="fkConversationId">
              <el-input v-model="queryParams.fkConversationId" placeholder="请输入会话id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最后一条消息id" prop="lastMsgId">
              <el-input v-model="queryParams.lastMsgId" placeholder="请输入最后一条消息id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最后一条消息时间，精确到毫秒" prop="lastMsgTime">
              <el-date-picker clearable
                v-model="queryParams.lastMsgTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择最后一条消息时间，精确到毫秒"
              />
            </el-form-item>
            <el-form-item label="未读消息数量" prop="noReadCount">
              <el-input v-model="queryParams.noReadCount" placeholder="请输入未读消息数量" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="置顶标志 0不置顶  1置顶" prop="topFlag">
              <el-input v-model="queryParams.topFlag" placeholder="请输入置顶标志 0不置顶  1置顶" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="置顶时间,用于排序" prop="topTime">
              <el-date-picker clearable
                v-model="queryParams.topTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择置顶时间,用于排序"
              />
            </el-form-item>
            <el-form-item label="对话移除标志 0没移除  1移除" prop="removedFlag">
              <el-input v-model="queryParams.removedFlag" placeholder="请输入对话移除标志 0没移除  1移除" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="移除时间,用于判断是否展示" prop="removedTime">
              <el-date-picker clearable
                v-model="queryParams.removedTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择移除时间,用于判断是否展示"
              />
            </el-form-item>
            <el-form-item label="是否有at我的消息 0无,1有 " prop="atMeFlag">
              <el-input v-model="queryParams.atMeFlag" placeholder="请输入是否有at我的消息 0无,1有 " clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="有at我的消息id" prop="atMeMsgId">
              <el-input v-model="queryParams.atMeMsgId" placeholder="请输入有at我的消息id" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:conversationRecent:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:conversationRecent:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:conversationRecent:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:conversationRecent:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="conversationRecentList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="创建者id" align="center" prop="fkUserId" />
        <el-table-column label="会话id" align="center" prop="fkConversationId" />
        <el-table-column label="最后一条消息id" align="center" prop="lastMsgId" />
        <el-table-column label="最后一条消息时间，精确到毫秒" align="center" prop="lastMsgTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.lastMsgTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未读消息数量" align="center" prop="noReadCount" />
        <el-table-column label="置顶标志 0不置顶  1置顶" align="center" prop="topFlag" />
        <el-table-column label="置顶时间,用于排序" align="center" prop="topTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.topTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="对话移除标志 0没移除  1移除" align="center" prop="removedFlag" />
        <el-table-column label="移除时间,用于判断是否展示" align="center" prop="removedTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.removedTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否有at我的消息 0无,1有 " align="center" prop="atMeFlag" />
        <el-table-column label="有at我的消息id" align="center" prop="atMeMsgId" />
        <el-table-column label="会话类型:1单聊,2群聊,3系统通知 5频道" align="center" prop="conversationType" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:conversationRecent:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:conversationRecent:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改首页对话列对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="conversationRecentFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="创建者id" prop="fkUserId">
          <el-input v-model="form.fkUserId" placeholder="请输入创建者id" />
        </el-form-item>
        <el-form-item label="会话id" prop="fkConversationId">
          <el-input v-model="form.fkConversationId" placeholder="请输入会话id" />
        </el-form-item>
        <el-form-item label="最后一条消息id" prop="lastMsgId">
          <el-input v-model="form.lastMsgId" placeholder="请输入最后一条消息id" />
        </el-form-item>
        <el-form-item label="最后一条消息时间，精确到毫秒" prop="lastMsgTime">
          <el-date-picker clearable
            v-model="form.lastMsgTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择最后一条消息时间，精确到毫秒">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="未读消息数量" prop="noReadCount">
          <el-input v-model="form.noReadCount" placeholder="请输入未读消息数量" />
        </el-form-item>
        <el-form-item label="置顶标志 0不置顶  1置顶" prop="topFlag">
          <el-input v-model="form.topFlag" placeholder="请输入置顶标志 0不置顶  1置顶" />
        </el-form-item>
        <el-form-item label="置顶时间,用于排序" prop="topTime">
          <el-date-picker clearable
            v-model="form.topTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择置顶时间,用于排序">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对话移除标志 0没移除  1移除" prop="removedFlag">
          <el-input v-model="form.removedFlag" placeholder="请输入对话移除标志 0没移除  1移除" />
        </el-form-item>
        <el-form-item label="移除时间,用于判断是否展示" prop="removedTime">
          <el-date-picker clearable
            v-model="form.removedTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择移除时间,用于判断是否展示">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否有at我的消息 0无,1有 " prop="atMeFlag">
          <el-input v-model="form.atMeFlag" placeholder="请输入是否有at我的消息 0无,1有 " />
        </el-form-item>
        <el-form-item label="有at我的消息id" prop="atMeMsgId">
          <el-input v-model="form.atMeMsgId" placeholder="请输入有at我的消息id" />
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

<script setup name="ConversationRecent" lang="ts">
import { listConversationRecent, getConversationRecent, delConversationRecent, addConversationRecent, updateConversationRecent } from '@/api/imcore/conversationRecent';
import { ConversationRecentVO, ConversationRecentQuery, ConversationRecentForm } from '@/api/imcore/conversationRecent/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const conversationRecentList = ref<ConversationRecentVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const conversationRecentFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ConversationRecentForm = {
  id: undefined,
  fkUserId: undefined,
  fkConversationId: undefined,
  lastMsgId: undefined,
  lastMsgTime: undefined,
  noReadCount: undefined,
  topFlag: undefined,
  topTime: undefined,
  removedFlag: undefined,
  removedTime: undefined,
  atMeFlag: undefined,
  atMeMsgId: undefined,
  conversationType: undefined
}
const data = reactive<PageData<ConversationRecentForm, ConversationRecentQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkUserId: undefined,
    fkConversationId: undefined,
    lastMsgId: undefined,
    lastMsgTime: undefined,
    noReadCount: undefined,
    topFlag: undefined,
    topTime: undefined,
    removedFlag: undefined,
    removedTime: undefined,
    atMeFlag: undefined,
    atMeMsgId: undefined,
    conversationType: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],
    fkUserId: [
      { required: true, message: "创建者id不能为空", trigger: "blur" }
    ],
    fkConversationId: [
      { required: true, message: "会话id不能为空", trigger: "blur" }
    ],
    lastMsgId: [
      { required: true, message: "最后一条消息id不能为空", trigger: "blur" }
    ],
    lastMsgTime: [
      { required: true, message: "最后一条消息时间，精确到毫秒不能为空", trigger: "blur" }
    ],
    noReadCount: [
      { required: true, message: "未读消息数量不能为空", trigger: "blur" }
    ],
    topFlag: [
      { required: true, message: "置顶标志 0不置顶  1置顶不能为空", trigger: "blur" }
    ],
    topTime: [
      { required: true, message: "置顶时间,用于排序不能为空", trigger: "blur" }
    ],
    removedFlag: [
      { required: true, message: "对话移除标志 0没移除  1移除不能为空", trigger: "blur" }
    ],
    removedTime: [
      { required: true, message: "移除时间,用于判断是否展示不能为空", trigger: "blur" }
    ],
    atMeFlag: [
      { required: true, message: "是否有at我的消息 0无,1有 不能为空", trigger: "blur" }
    ],
    atMeMsgId: [
      { required: true, message: "有at我的消息id不能为空", trigger: "blur" }
    ],
    conversationType: [
      { required: true, message: "会话类型:1单聊,2群聊,3系统通知 5频道不能为空", trigger: "change" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询首页对话列列表 */
const getList = async () => {
  loading.value = true;
  const res = await listConversationRecent(queryParams.value);
  conversationRecentList.value = res.rows;
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
  conversationRecentFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ConversationRecentVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加首页对话列";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ConversationRecentVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getConversationRecent(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改首页对话列";
}

/** 提交按钮 */
const submitForm = () => {
  conversationRecentFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateConversationRecent(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addConversationRecent(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ConversationRecentVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除首页对话列编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delConversationRecent(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/conversationRecent/export', {
    ...queryParams.value
  }, `conversationRecent_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
