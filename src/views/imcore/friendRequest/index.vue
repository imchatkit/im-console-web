<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="申请人ID" prop="fromUserId">
              <el-input v-model="queryParams.fromUserId" placeholder="请输入申请人ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="给接收人的备注" prop="fromUserRemarkName">
              <el-input v-model="queryParams.fromUserRemarkName" placeholder="请输入给接收人的备注" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="接收人ID" prop="toUserId">
              <el-input v-model="queryParams.toUserId" placeholder="请输入接收人ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="验证信息" prop="message">
              <el-input v-model="queryParams.message" placeholder="请输入验证信息" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="处理时间" prop="handleTime">
              <el-date-picker clearable
                v-model="queryParams.handleTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择处理时间"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:friendRequest:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:friendRequest:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:friendRequest:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:friendRequest:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="friendRequestList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="申请ID" align="center" prop="id" v-if="true" />
        <el-table-column label="申请人ID" align="center" prop="fromUserId" />
        <el-table-column label="给接收人的备注" align="center" prop="fromUserRemarkName" />
        <el-table-column label="接收人ID" align="center" prop="toUserId" />
        <el-table-column label="验证信息" align="center" prop="message" />
        <el-table-column label="状态: 0-待处理 1-同意 2-拒绝 3-已过期 4-已取消 5-已删除 6-已忽略" align="center" prop="status" />
        <el-table-column label="处理时间" align="center" prop="handleTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.handleTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:friendRequest:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:friendRequest:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改好友申请对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="friendRequestFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="申请人ID" prop="fromUserId">
          <el-input v-model="form.fromUserId" placeholder="请输入申请人ID" />
        </el-form-item>
        <el-form-item label="给接收人的备注" prop="fromUserRemarkName">
          <el-input v-model="form.fromUserRemarkName" placeholder="请输入给接收人的备注" />
        </el-form-item>
        <el-form-item label="接收人ID" prop="toUserId">
          <el-input v-model="form.toUserId" placeholder="请输入接收人ID" />
        </el-form-item>
        <el-form-item label="验证信息" prop="message">
          <el-input v-model="form.message" placeholder="请输入验证信息" />
        </el-form-item>
        <el-form-item label="处理时间" prop="handleTime">
          <el-date-picker clearable
            v-model="form.handleTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择处理时间">
          </el-date-picker>
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

<script setup name="FriendRequest" lang="ts">
import { listFriendRequest, getFriendRequest, delFriendRequest, addFriendRequest, updateFriendRequest } from '@/api/imcore/friendRequest';
import { FriendRequestVO, FriendRequestQuery, FriendRequestForm } from '@/api/imcore/friendRequest/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const friendRequestList = ref<FriendRequestVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const friendRequestFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: FriendRequestForm = {
  id: undefined,
  fromUserId: undefined,
  fromUserRemarkName: undefined,
  toUserId: undefined,
  message: undefined,
  status: undefined,
  handleTime: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<FriendRequestForm, FriendRequestQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fromUserId: undefined,
    fromUserRemarkName: undefined,
    toUserId: undefined,
    message: undefined,
    status: undefined,
    handleTime: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "申请ID不能为空", trigger: "blur" }
    ],
    fromUserId: [
      { required: true, message: "申请人ID不能为空", trigger: "blur" }
    ],
    fromUserRemarkName: [
      { required: true, message: "给接收人的备注不能为空", trigger: "blur" }
    ],
    toUserId: [
      { required: true, message: "接收人ID不能为空", trigger: "blur" }
    ],
    message: [
      { required: true, message: "验证信息不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态: 0-待处理 1-同意 2-拒绝 3-已过期 4-已取消 5-已删除 6-已忽略不能为空", trigger: "change" }
    ],
    handleTime: [
      { required: true, message: "处理时间不能为空", trigger: "blur" }
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

/** 查询好友申请列表 */
const getList = async () => {
  loading.value = true;
  const res = await listFriendRequest(queryParams.value);
  friendRequestList.value = res.rows;
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
  friendRequestFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: FriendRequestVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加好友申请";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: FriendRequestVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getFriendRequest(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改好友申请";
}

/** 提交按钮 */
const submitForm = () => {
  friendRequestFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateFriendRequest(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addFriendRequest(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: FriendRequestVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除好友申请编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delFriendRequest(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/friendRequest/export', {
    ...queryParams.value
  }, `friendRequest_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
