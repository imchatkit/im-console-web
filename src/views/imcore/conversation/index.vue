<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="头像" prop="avatar">
              <el-input v-model="queryParams.avatar" placeholder="请输入头像" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否删除: 0-否 1-是" prop="deleted">
              <el-input v-model="queryParams.deleted" placeholder="请输入是否删除: 0-否 1-是" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="可选 自定义属性，供开发者扩展使用" prop="extras">
              <el-input v-model="queryParams.extras" placeholder="请输入可选 自定义属性，供开发者扩展使用" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:conversation:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:conversation:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:conversation:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:conversation:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="conversationList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="头像" align="center" prop="avatar" />
        <el-table-column label="会话类型: 1-单聊 2-群聊 3-系统通知 4-机器人 5频道" align="center" prop="conversationType" />
        <el-table-column label="会话状态: 1-正常 2-禁用 3-删除 4-归档" align="center" prop="conversationStatus" />
        <el-table-column label="是否删除: 0-否 1-是" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:conversation:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:conversation:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改聊天会话基础对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="conversationFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="form.avatar" placeholder="请输入头像" />
        </el-form-item>
        <el-form-item label="是否删除: 0-否 1-是" prop="deleted">
          <el-input v-model="form.deleted" placeholder="请输入是否删除: 0-否 1-是" />
        </el-form-item>
        <el-form-item label="可选 自定义属性，供开发者扩展使用" prop="extras">
            <el-input v-model="form.extras" type="textarea" placeholder="请输入内容" />
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

<script setup name="Conversation" lang="ts">
import { listConversation, getConversation, delConversation, addConversation, updateConversation } from '@/api/imcore/conversation';
import { ConversationVO, ConversationQuery, ConversationForm } from '@/api/imcore/conversation/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const conversationList = ref<ConversationVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const conversationFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ConversationForm = {
  id: undefined,
  avatar: undefined,
  conversationType: undefined,
  conversationStatus: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<ConversationForm, ConversationQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    avatar: undefined,
    conversationType: undefined,
    conversationStatus: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],
    avatar: [
      { required: true, message: "头像不能为空", trigger: "blur" }
    ],
    conversationType: [
      { required: true, message: "会话类型: 1-单聊 2-群聊 3-系统通知 4-机器人 5频道不能为空", trigger: "change" }
    ],
    conversationStatus: [
      { required: true, message: "会话状态: 1-正常 2-禁用 3-删除 4-归档不能为空", trigger: "change" }
    ],
    deleted: [
      { required: true, message: "是否删除: 0-否 1-是不能为空", trigger: "blur" }
    ],
    extras: [
      { required: true, message: "可选 自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询聊天会话基础列表 */
const getList = async () => {
  loading.value = true;
  const res = await listConversation(queryParams.value);
  conversationList.value = res.rows;
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
  conversationFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ConversationVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加聊天会话基础";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ConversationVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getConversation(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改聊天会话基础";
}

/** 提交按钮 */
const submitForm = () => {
  conversationFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateConversation(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addConversation(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ConversationVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除聊天会话基础编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delConversation(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/conversation/export', {
    ...queryParams.value
  }, `conversation_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
