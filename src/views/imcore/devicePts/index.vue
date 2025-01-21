<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="用户id" prop="fkUserId">
              <el-input v-model="queryParams.fkUserId" placeholder="请输入用户id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备id" prop="fkDeviceId">
              <el-input v-model="queryParams.fkDeviceId" placeholder="请输入设备id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户某设备当前最大位点" prop="maxPts">
              <el-input v-model="queryParams.maxPts" placeholder="请输入用户某设备当前最大位点" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:devicePts:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:devicePts:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:devicePts:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:devicePts:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="devicePtsList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键id" align="center" prop="id" v-if="true" />
        <el-table-column label="用户id" align="center" prop="fkUserId" />
        <el-table-column label="设备id" align="center" prop="fkDeviceId" />
        <el-table-column label="用户某设备当前最大位点" align="center" prop="maxPts" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:devicePts:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:devicePts:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改设备pts对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="devicePtsFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="fkUserId">
          <el-input v-model="form.fkUserId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="设备id" prop="fkDeviceId">
          <el-input v-model="form.fkDeviceId" placeholder="请输入设备id" />
        </el-form-item>
        <el-form-item label="用户某设备当前最大位点" prop="maxPts">
          <el-input v-model="form.maxPts" placeholder="请输入用户某设备当前最大位点" />
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

<script setup name="DevicePts" lang="ts">
import { listDevicePts, getDevicePts, delDevicePts, addDevicePts, updateDevicePts } from '@/api/imcore/devicePts';
import { DevicePtsVO, DevicePtsQuery, DevicePtsForm } from '@/api/imcore/devicePts/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const devicePtsList = ref<DevicePtsVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const devicePtsFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: DevicePtsForm = {
  id: undefined,
  fkUserId: undefined,
  fkDeviceId: undefined,
  maxPts: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<DevicePtsForm, DevicePtsQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkUserId: undefined,
    fkDeviceId: undefined,
    maxPts: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键id不能为空", trigger: "blur" }
    ],
    fkUserId: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    fkDeviceId: [
      { required: true, message: "设备id不能为空", trigger: "blur" }
    ],
    maxPts: [
      { required: true, message: "用户某设备当前最大位点不能为空", trigger: "blur" }
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

/** 查询设备pts列表 */
const getList = async () => {
  loading.value = true;
  const res = await listDevicePts(queryParams.value);
  devicePtsList.value = res.rows;
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
  devicePtsFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: DevicePtsVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加设备pts";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: DevicePtsVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getDevicePts(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改设备pts";
}

/** 提交按钮 */
const submitForm = () => {
  devicePtsFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDevicePts(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addDevicePts(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: DevicePtsVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除设备pts编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delDevicePts(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/devicePts/export', {
    ...queryParams.value
  }, `devicePts_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
