<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="会话ID" prop="fkConversationId">
              <el-input v-model="queryParams.fkConversationId" placeholder="请输入会话ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户id" prop="fkUserId">
              <el-input v-model="queryParams.fkUserId" placeholder="请输入用户id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="可选	自定义属性，供开发者扩展使用" prop="extras">
              <el-input v-model="queryParams.extras" placeholder="请输入可选	自定义属性，供开发者扩展使用" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="会话中的备注名" prop="userRemarkName">
              <el-input v-model="queryParams.userRemarkName" placeholder="请输入会话中的备注名" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单" prop="role">
              <el-input v-model="queryParams.role" placeholder="请输入角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="免打扰开关 0-关闭 1开启" prop="disturbFlag">
              <el-input v-model="queryParams.disturbFlag" placeholder="请输入免打扰开关 0-关闭 1开启" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="置顶开关 0-关闭 1开启" prop="topFlag">
              <el-input v-model="queryParams.topFlag" placeholder="请输入置顶开关 0-关闭 1开启" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否删除 0-未删除 1-已删除" prop="deleted">
              <el-input v-model="queryParams.deleted" placeholder="请输入是否删除 0-未删除 1-已删除" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="屏蔽@全体成员 0-不屏蔽 1-屏蔽" prop="muteAtAll">
              <el-input v-model="queryParams.muteAtAll" placeholder="请输入屏蔽@全体成员 0-不屏蔽 1-屏蔽" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="禁言状态: 1-正常发言 2-永久禁言 3-限时禁言" prop="muted">
              <el-input v-model="queryParams.muted" placeholder="请输入禁言状态: 1-正常发言 2-永久禁言 3-限时禁言" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="禁言结束时间" prop="muteEndTime">
              <el-date-picker clearable
                v-model="queryParams.muteEndTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择禁言结束时间"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:conversationMember:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:conversationMember:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:conversationMember:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:conversationMember:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="conversationMemberList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="会话ID" align="center" prop="fkConversationId" />
        <el-table-column label="用户id" align="center" prop="fkUserId" />
        <el-table-column label="可选	自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="会话中的备注名" align="center" prop="userRemarkName" />
        <el-table-column label="角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单" align="center" prop="role" />
        <el-table-column label="免打扰开关 0-关闭 1开启" align="center" prop="disturbFlag" />
        <el-table-column label="置顶开关 0-关闭 1开启" align="center" prop="topFlag" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="屏蔽@全体成员 0-不屏蔽 1-屏蔽" align="center" prop="muteAtAll" />
        <el-table-column label="禁言状态: 1-正常发言 2-永久禁言 3-限时禁言" align="center" prop="muted" />
        <el-table-column label="禁言结束时间" align="center" prop="muteEndTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.muteEndTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:conversationMember:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:conversationMember:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改会话成员对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="conversationMemberFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会话ID" prop="fkConversationId">
          <el-input v-model="form.fkConversationId" placeholder="请输入会话ID" />
        </el-form-item>
        <el-form-item label="用户id" prop="fkUserId">
          <el-input v-model="form.fkUserId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="可选	自定义属性，供开发者扩展使用" prop="extras">
            <el-input v-model="form.extras" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="会话中的备注名" prop="userRemarkName">
          <el-input v-model="form.userRemarkName" placeholder="请输入会话中的备注名" />
        </el-form-item>
        <el-form-item label="角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单" prop="role">
          <el-input v-model="form.role" placeholder="请输入角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单" />
        </el-form-item>
        <el-form-item label="免打扰开关 0-关闭 1开启" prop="disturbFlag">
          <el-input v-model="form.disturbFlag" placeholder="请输入免打扰开关 0-关闭 1开启" />
        </el-form-item>
        <el-form-item label="置顶开关 0-关闭 1开启" prop="topFlag">
          <el-input v-model="form.topFlag" placeholder="请输入置顶开关 0-关闭 1开启" />
        </el-form-item>
        <el-form-item label="是否删除 0-未删除 1-已删除" prop="deleted">
          <el-input v-model="form.deleted" placeholder="请输入是否删除 0-未删除 1-已删除" />
        </el-form-item>
        <el-form-item label="屏蔽@全体成员 0-不屏蔽 1-屏蔽" prop="muteAtAll">
          <el-input v-model="form.muteAtAll" placeholder="请输入屏蔽@全体成员 0-不屏蔽 1-屏蔽" />
        </el-form-item>
        <el-form-item label="禁言状态: 1-正常发言 2-永久禁言 3-限时禁言" prop="muted">
          <el-input v-model="form.muted" placeholder="请输入禁言状态: 1-正常发言 2-永久禁言 3-限时禁言" />
        </el-form-item>
        <el-form-item label="禁言结束时间" prop="muteEndTime">
          <el-date-picker clearable
            v-model="form.muteEndTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择禁言结束时间">
          </el-date-picker>
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

<script setup name="ConversationMember" lang="ts">
import { listConversationMember, getConversationMember, delConversationMember, addConversationMember, updateConversationMember } from '@/api/imcore/conversationMember';
import { ConversationMemberVO, ConversationMemberQuery, ConversationMemberForm } from '@/api/imcore/conversationMember/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const conversationMemberList = ref<ConversationMemberVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const conversationMemberFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ConversationMemberForm = {
  id: undefined,
  fkConversationId: undefined,
  fkUserId: undefined,
  extras: undefined,
  userRemarkName: undefined,
  role: undefined,
  disturbFlag: undefined,
  topFlag: undefined,
  deleted: undefined,
  muteAtAll: undefined,
  muted: undefined,
  muteEndTime: undefined
}
const data = reactive<PageData<ConversationMemberForm, ConversationMemberQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkConversationId: undefined,
    fkUserId: undefined,
    extras: undefined,
    userRemarkName: undefined,
    role: undefined,
    disturbFlag: undefined,
    topFlag: undefined,
    deleted: undefined,
    muteAtAll: undefined,
    muted: undefined,
    muteEndTime: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],
    fkConversationId: [
      { required: true, message: "会话ID不能为空", trigger: "blur" }
    ],
    fkUserId: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    extras: [
      { required: true, message: "可选	自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ],
    userRemarkName: [
      { required: true, message: "会话中的备注名不能为空", trigger: "blur" }
    ],
    role: [
      { required: true, message: "角色: 1-普通成员 2-管理员 3-群主 4-访客 5-黑名单不能为空", trigger: "blur" }
    ],
    disturbFlag: [
      { required: true, message: "免打扰开关 0-关闭 1开启不能为空", trigger: "blur" }
    ],
    topFlag: [
      { required: true, message: "置顶开关 0-关闭 1开启不能为空", trigger: "blur" }
    ],
    deleted: [
      { required: true, message: "是否删除 0-未删除 1-已删除不能为空", trigger: "blur" }
    ],
    muteAtAll: [
      { required: true, message: "屏蔽@全体成员 0-不屏蔽 1-屏蔽不能为空", trigger: "blur" }
    ],
    muted: [
      { required: true, message: "禁言状态: 1-正常发言 2-永久禁言 3-限时禁言不能为空", trigger: "blur" }
    ],
    muteEndTime: [
      { required: true, message: "禁言结束时间不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询会话成员列表 */
const getList = async () => {
  loading.value = true;
  const res = await listConversationMember(queryParams.value);
  conversationMemberList.value = res.rows;
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
  conversationMemberFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ConversationMemberVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加会话成员";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ConversationMemberVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getConversationMember(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改会话成员";
}

/** 提交按钮 */
const submitForm = () => {
  conversationMemberFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateConversationMember(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addConversationMember(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ConversationMemberVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除会话成员编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delConversationMember(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/conversationMember/export', {
    ...queryParams.value
  }, `conversationMember_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
