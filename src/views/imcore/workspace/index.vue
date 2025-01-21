<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="工作空间名称" prop="workspaceName">
              <el-input v-model="queryParams.workspaceName" placeholder="请输入工作空间名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="创建者ID" prop="creatorUserId">
              <el-input v-model="queryParams.creatorUserId" placeholder="请输入创建者ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="工作空间描述" prop="description">
              <el-input v-model="queryParams.description" placeholder="请输入工作空间描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="工作空间域名" prop="domain">
              <el-input v-model="queryParams.domain" placeholder="请输入工作空间域名" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="logo地址" prop="logoUrl">
              <el-input v-model="queryParams.logoUrl" placeholder="请输入logo地址" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:workspace:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:workspace:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:workspace:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:workspace:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="workspaceList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="工作空间ID" align="center" prop="id" v-if="true" />
        <el-table-column label="工作空间名称" align="center" prop="workspaceName" />
        <el-table-column label="创建者ID" align="center" prop="creatorUserId" />
        <el-table-column label="工作空间描述" align="center" prop="description" />
        <el-table-column label="工作空间域名" align="center" prop="domain" />
        <el-table-column label="logo地址" align="center" prop="logoUrl" />
        <el-table-column label="空间状态" align="center" prop="workspaceStatus" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:workspace:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:workspace:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改工作空间对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="workspaceFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工作空间名称" prop="workspaceName">
          <el-input v-model="form.workspaceName" placeholder="请输入工作空间名称" />
        </el-form-item>
        <el-form-item label="创建者ID" prop="creatorUserId">
          <el-input v-model="form.creatorUserId" placeholder="请输入创建者ID" />
        </el-form-item>
        <el-form-item label="工作空间描述" prop="description">
            <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="工作空间域名" prop="domain">
          <el-input v-model="form.domain" placeholder="请输入工作空间域名" />
        </el-form-item>
        <el-form-item label="logo地址" prop="logoUrl">
          <el-input v-model="form.logoUrl" placeholder="请输入logo地址" />
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

<script setup name="Workspace" lang="ts">
import { listWorkspace, getWorkspace, delWorkspace, addWorkspace, updateWorkspace } from '@/api/imcore/workspace';
import { WorkspaceVO, WorkspaceQuery, WorkspaceForm } from '@/api/imcore/workspace/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const workspaceList = ref<WorkspaceVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const workspaceFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: WorkspaceForm = {
  id: undefined,
  workspaceName: undefined,
  creatorUserId: undefined,
  description: undefined,
  domain: undefined,
  logoUrl: undefined,
  workspaceStatus: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<WorkspaceForm, WorkspaceQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    workspaceName: undefined,
    creatorUserId: undefined,
    description: undefined,
    domain: undefined,
    logoUrl: undefined,
    workspaceStatus: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "工作空间ID不能为空", trigger: "blur" }
    ],
    workspaceName: [
      { required: true, message: "工作空间名称不能为空", trigger: "blur" }
    ],
    creatorUserId: [
      { required: true, message: "创建者ID不能为空", trigger: "blur" }
    ],
    description: [
      { required: true, message: "工作空间描述不能为空", trigger: "blur" }
    ],
    domain: [
      { required: true, message: "工作空间域名不能为空", trigger: "blur" }
    ],
    logoUrl: [
      { required: true, message: "logo地址不能为空", trigger: "blur" }
    ],
    workspaceStatus: [
      { required: true, message: "空间状态不能为空", trigger: "change" }
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

/** 查询工作空间列表 */
const getList = async () => {
  loading.value = true;
  const res = await listWorkspace(queryParams.value);
  workspaceList.value = res.rows;
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
  workspaceFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: WorkspaceVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加工作空间";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: WorkspaceVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getWorkspace(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改工作空间";
}

/** 提交按钮 */
const submitForm = () => {
  workspaceFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateWorkspace(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addWorkspace(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: WorkspaceVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除工作空间编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delWorkspace(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/workspace/export', {
    ...queryParams.value
  }, `workspace_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
