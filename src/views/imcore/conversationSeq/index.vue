<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="会话当前序列号" prop="conversationSeq">
              <el-input v-model="queryParams.conversationSeq" placeholder="请输入会话当前序列号" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:conversationSeq:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:conversationSeq:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:conversationSeq:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:conversationSeq:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="conversationSeqList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键id" align="center" prop="conversationId" v-if="true" />
        <el-table-column label="会话当前序列号" align="center" prop="conversationSeq" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:conversationSeq:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:conversationSeq:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改会话序列号对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="conversationSeqFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会话当前序列号" prop="conversationSeq">
          <el-input v-model="form.conversationSeq" placeholder="请输入会话当前序列号" />
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

<script setup name="ConversationSeq" lang="ts">
import { listConversationSeq, getConversationSeq, delConversationSeq, addConversationSeq, updateConversationSeq } from '@/api/imcore/conversationSeq';
import { ConversationSeqVO, ConversationSeqQuery, ConversationSeqForm } from '@/api/imcore/conversationSeq/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const conversationSeqList = ref<ConversationSeqVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const conversationSeqFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ConversationSeqForm = {
  conversationId: undefined,
  conversationSeq: undefined
}
const data = reactive<PageData<ConversationSeqForm, ConversationSeqQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    conversationSeq: undefined,
    params: {
    }
  },
  rules: {
    conversationId: [
      { required: true, message: "主键id不能为空", trigger: "blur" }
    ],
    conversationSeq: [
      { required: true, message: "会话当前序列号不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询会话序列号列表 */
const getList = async () => {
  loading.value = true;
  const res = await listConversationSeq(queryParams.value);
  conversationSeqList.value = res.rows;
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
  conversationSeqFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ConversationSeqVO[]) => {
  ids.value = selection.map(item => item.conversationId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加会话序列号";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ConversationSeqVO) => {
  reset();
  const _conversationId = row?.conversationId || ids.value[0]
  const res = await getConversationSeq(_conversationId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改会话序列号";
}

/** 提交按钮 */
const submitForm = () => {
  conversationSeqFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.conversationId) {
        await updateConversationSeq(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addConversationSeq(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ConversationSeqVO) => {
  const _conversationIds = row?.conversationId || ids.value;
  await proxy?.$modal.confirm('是否确认删除会话序列号编号为"' + _conversationIds + '"的数据项？').finally(() => loading.value = false);
  await delConversationSeq(_conversationIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/conversationSeq/export', {
    ...queryParams.value
  }, `conversationSeq_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
