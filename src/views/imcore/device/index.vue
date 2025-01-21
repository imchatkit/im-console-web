<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="用户id" prop="fkUserId">
              <el-input v-model="queryParams.fkUserId" placeholder="请输入用户id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备不想收到推送提醒" prop="valid">
              <el-input v-model="queryParams.valid" placeholder="请输入设备不想收到推送提醒" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="通知推送token" prop="pushToken">
              <el-input v-model="queryParams.pushToken" placeholder="请输入通知推送token" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="设备唯一编码(由设备端生成)" prop="uniqueDeviceCode">
              <el-input v-model="queryParams.uniqueDeviceCode" placeholder="请输入设备唯一编码(由设备端生成)" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="推送通道 1极光 2友盟" prop="pushChannel">
              <el-input v-model="queryParams.pushChannel" placeholder="请输入推送通道 1极光 2友盟" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac" prop="platform">
              <el-input v-model="queryParams.platform" placeholder="请输入客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:device:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:device:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:device:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:device:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="deviceList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键id" align="center" prop="id" v-if="true" />
        <el-table-column label="用户id" align="center" prop="fkUserId" />
        <el-table-column label="设备不想收到推送提醒" align="center" prop="valid" />
        <el-table-column label="通知推送token" align="center" prop="pushToken" />
        <el-table-column label="设备唯一编码(由设备端生成)" align="center" prop="uniqueDeviceCode" />
        <el-table-column label="推送通道 1极光 2友盟" align="center" prop="pushChannel" />
        <el-table-column label="客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac" align="center" prop="platform" />
        <el-table-column label="设备状态 0退出登录 1正常" align="center" prop="deviceStatus" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:device:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:device:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改客户端设备对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="deviceFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="fkUserId">
          <el-input v-model="form.fkUserId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="设备不想收到推送提醒" prop="valid">
          <el-input v-model="form.valid" placeholder="请输入设备不想收到推送提醒" />
        </el-form-item>
        <el-form-item label="通知推送token" prop="pushToken">
          <el-input v-model="form.pushToken" placeholder="请输入通知推送token" />
        </el-form-item>
        <el-form-item label="设备唯一编码(由设备端生成)" prop="uniqueDeviceCode">
          <el-input v-model="form.uniqueDeviceCode" placeholder="请输入设备唯一编码(由设备端生成)" />
        </el-form-item>
        <el-form-item label="推送通道 1极光 2友盟" prop="pushChannel">
          <el-input v-model="form.pushChannel" placeholder="请输入推送通道 1极光 2友盟" />
        </el-form-item>
        <el-form-item label="客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac" prop="platform">
          <el-input v-model="form.platform" placeholder="请输入客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac" />
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

<script setup name="Device" lang="ts">
import { listDevice, getDevice, delDevice, addDevice, updateDevice } from '@/api/imcore/device';
import { DeviceVO, DeviceQuery, DeviceForm } from '@/api/imcore/device/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const deviceList = ref<DeviceVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const deviceFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: DeviceForm = {
  id: undefined,
  fkUserId: undefined,
  valid: undefined,
  pushToken: undefined,
  uniqueDeviceCode: undefined,
  pushChannel: undefined,
  platform: undefined,
  deviceStatus: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<DeviceForm, DeviceQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkUserId: undefined,
    valid: undefined,
    pushToken: undefined,
    uniqueDeviceCode: undefined,
    pushChannel: undefined,
    platform: undefined,
    deviceStatus: undefined,
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
    valid: [
      { required: true, message: "设备不想收到推送提醒不能为空", trigger: "blur" }
    ],
    pushToken: [
      { required: true, message: "通知推送token不能为空", trigger: "blur" }
    ],
    uniqueDeviceCode: [
      { required: true, message: "设备唯一编码(由设备端生成)不能为空", trigger: "blur" }
    ],
    pushChannel: [
      { required: true, message: "推送通道 1极光 2友盟不能为空", trigger: "blur" }
    ],
    platform: [
      { required: true, message: "客户端平台: 1web, 2Android, 3 ios, 4windows, 5mac不能为空", trigger: "blur" }
    ],
    deviceStatus: [
      { required: true, message: "设备状态 0退出登录 1正常不能为空", trigger: "change" }
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

/** 查询客户端设备列表 */
const getList = async () => {
  loading.value = true;
  const res = await listDevice(queryParams.value);
  deviceList.value = res.rows;
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
  deviceFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: DeviceVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加客户端设备";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: DeviceVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getDevice(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改客户端设备";
}

/** 提交按钮 */
const submitForm = () => {
  deviceFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDevice(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addDevice(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: DeviceVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除客户端设备编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delDevice(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/device/export', {
    ...queryParams.value
  }, `device_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
