<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="回调地址" prop="callbackUrl">
              <el-input v-model="queryParams.callbackUrl" placeholder="请输入回调地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="请求内容" prop="requestBody">
              <el-input v-model="queryParams.requestBody" placeholder="请输入请求内容" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="响应内容" prop="responseBody">
              <el-input v-model="queryParams.responseBody" placeholder="请输入响应内容" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="重试次数" prop="retryCount">
              <el-input v-model="queryParams.retryCount" placeholder="请输入重试次数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否删除 0-未删除 1-已删除" prop="deleted">
              <el-input v-model="queryParams.deleted" placeholder="请输入是否删除 0-未删除 1-已删除" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:callbackRecord:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:callbackRecord:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:callbackRecord:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:callbackRecord:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="callbackRecordList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="回调类型" align="center" prop="callbackType" />
        <el-table-column label="回调地址" align="center" prop="callbackUrl" />
        <el-table-column label="请求内容" align="center" prop="requestBody" />
        <el-table-column label="响应内容" align="center" prop="responseBody" />
        <el-table-column label="" align="center" prop="callbackStatus" />
        <el-table-column label="重试次数" align="center" prop="retryCount" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:callbackRecord:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:callbackRecord:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改消息回调记录对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="callbackRecordFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="回调地址" prop="callbackUrl">
          <el-input v-model="form.callbackUrl" placeholder="请输入回调地址" />
        </el-form-item>
        <el-form-item label="请求内容" prop="requestBody">
            <el-input v-model="form.requestBody" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="响应内容" prop="responseBody">
            <el-input v-model="form.responseBody" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="重试次数" prop="retryCount">
          <el-input v-model="form.retryCount" placeholder="请输入重试次数" />
        </el-form-item>
        <el-form-item label="是否删除 0-未删除 1-已删除" prop="deleted">
          <el-input v-model="form.deleted" placeholder="请输入是否删除 0-未删除 1-已删除" />
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

<script setup name="CallbackRecord" lang="ts">
import { listCallbackRecord, getCallbackRecord, delCallbackRecord, addCallbackRecord, updateCallbackRecord } from '@/api/imcore/callbackRecord';
import { CallbackRecordVO, CallbackRecordQuery, CallbackRecordForm } from '@/api/imcore/callbackRecord/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const callbackRecordList = ref<CallbackRecordVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const callbackRecordFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: CallbackRecordForm = {
  id: undefined,
  callbackType: undefined,
  callbackUrl: undefined,
  requestBody: undefined,
  responseBody: undefined,
  callbackStatus: undefined,
  retryCount: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<CallbackRecordForm, CallbackRecordQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    callbackType: undefined,
    callbackUrl: undefined,
    requestBody: undefined,
    responseBody: undefined,
    callbackStatus: undefined,
    retryCount: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],
    callbackType: [
      { required: true, message: "回调类型不能为空", trigger: "change" }
    ],
    callbackUrl: [
      { required: true, message: "回调地址不能为空", trigger: "blur" }
    ],
    requestBody: [
      { required: true, message: "请求内容不能为空", trigger: "blur" }
    ],
    responseBody: [
      { required: true, message: "响应内容不能为空", trigger: "blur" }
    ],
    callbackStatus: [
      { required: true, message: "不能为空", trigger: "change" }
    ],
    retryCount: [
      { required: true, message: "重试次数不能为空", trigger: "blur" }
    ],
    deleted: [
      { required: true, message: "是否删除 0-未删除 1-已删除不能为空", trigger: "blur" }
    ],
    extras: [
      { required: true, message: "可选 自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询消息回调记录列表 */
const getList = async () => {
  loading.value = true;
  const res = await listCallbackRecord(queryParams.value);
  callbackRecordList.value = res.rows;
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
  callbackRecordFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: CallbackRecordVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加消息回调记录";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: CallbackRecordVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getCallbackRecord(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改消息回调记录";
}

/** 提交按钮 */
const submitForm = () => {
  callbackRecordFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateCallbackRecord(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addCallbackRecord(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: CallbackRecordVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除消息回调记录编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delCallbackRecord(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/callbackRecord/export', {
    ...queryParams.value
  }, `callbackRecord_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
