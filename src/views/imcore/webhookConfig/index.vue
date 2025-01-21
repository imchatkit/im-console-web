<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="webhook地址" prop="webhookUrl">
              <el-input v-model="queryParams.webhookUrl" placeholder="请输入webhook地址" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="密钥" prop="secretKey">
              <el-input v-model="queryParams.secretKey" placeholder="请输入密钥" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:webhookConfig:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:webhookConfig:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:webhookConfig:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:webhookConfig:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="webhookConfigList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="配置id" align="center" prop="id" v-if="true" />
        <el-table-column label="webhook地址" align="center" prop="webhookUrl" />
        <el-table-column label="webhook类型：1消息 2用户 3群组" align="center" prop="webhookType" />
        <el-table-column label="密钥" align="center" prop="secretKey" />
        <el-table-column label="" align="center" prop="webhookStatus" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:webhookConfig:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:webhookConfig:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改Webhook配置对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="webhookConfigFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="webhook地址" prop="webhookUrl">
          <el-input v-model="form.webhookUrl" placeholder="请输入webhook地址" />
        </el-form-item>
        <el-form-item label="密钥" prop="secretKey">
          <el-input v-model="form.secretKey" placeholder="请输入密钥" />
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

<script setup name="WebhookConfig" lang="ts">
import { listWebhookConfig, getWebhookConfig, delWebhookConfig, addWebhookConfig, updateWebhookConfig } from '@/api/imcore/webhookConfig';
import { WebhookConfigVO, WebhookConfigQuery, WebhookConfigForm } from '@/api/imcore/webhookConfig/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const webhookConfigList = ref<WebhookConfigVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const webhookConfigFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: WebhookConfigForm = {
  id: undefined,
  webhookUrl: undefined,
  webhookType: undefined,
  secretKey: undefined,
  webhookStatus: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<WebhookConfigForm, WebhookConfigQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    webhookUrl: undefined,
    webhookType: undefined,
    secretKey: undefined,
    webhookStatus: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "配置id不能为空", trigger: "blur" }
    ],
    webhookUrl: [
      { required: true, message: "webhook地址不能为空", trigger: "blur" }
    ],
    webhookType: [
      { required: true, message: "webhook类型：1消息 2用户 3群组不能为空", trigger: "change" }
    ],
    secretKey: [
      { required: true, message: "密钥不能为空", trigger: "blur" }
    ],
    webhookStatus: [
      { required: true, message: "不能为空", trigger: "change" }
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

/** 查询Webhook配置列表 */
const getList = async () => {
  loading.value = true;
  const res = await listWebhookConfig(queryParams.value);
  webhookConfigList.value = res.rows;
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
  webhookConfigFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: WebhookConfigVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加Webhook配置";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: WebhookConfigVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getWebhookConfig(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改Webhook配置";
}

/** 提交按钮 */
const submitForm = () => {
  webhookConfigFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateWebhookConfig(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addWebhookConfig(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: WebhookConfigVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除Webhook配置编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delWebhookConfig(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/webhookConfig/export', {
    ...queryParams.value
  }, `webhookConfig_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
