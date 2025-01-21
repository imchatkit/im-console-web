<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="用户ID" prop="fkUserId">
              <el-input v-model="queryParams.fkUserId" placeholder="请输入用户ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="好友ID" prop="fkFriendId">
              <el-input v-model="queryParams.fkFriendId" placeholder="请输入好友ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="单聊会话ID" prop="conversationId">
              <el-input v-model="queryParams.conversationId" placeholder="请输入单聊会话ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="来源: 1-搜索 2-群聊 3-名片" prop="source">
              <el-input v-model="queryParams.source" placeholder="请输入来源: 1-搜索 2-群聊 3-名片" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:friend:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:friend:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:friend:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:friend:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="friendList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="关系ID" align="center" prop="id" v-if="true" />
        <el-table-column label="用户ID" align="center" prop="fkUserId" />
        <el-table-column label="好友ID" align="center" prop="fkFriendId" />
        <el-table-column label="单聊会话ID" align="center" prop="conversationId" />
        <el-table-column label="备注名" align="center" prop="remark" />
        <el-table-column label="来源: 1-搜索 2-群聊 3-名片" align="center" prop="source" />
        <el-table-column label="状态: 1-正常 2-删除 3-拉黑" align="center" prop="status" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:friend:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:friend:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改好友关系对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="friendFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="fkUserId">
          <el-input v-model="form.fkUserId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="好友ID" prop="fkFriendId">
          <el-input v-model="form.fkFriendId" placeholder="请输入好友ID" />
        </el-form-item>
        <el-form-item label="单聊会话ID" prop="conversationId">
          <el-input v-model="form.conversationId" placeholder="请输入单聊会话ID" />
        </el-form-item>
        <el-form-item label="备注名" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注名" />
        </el-form-item>
        <el-form-item label="来源: 1-搜索 2-群聊 3-名片" prop="source">
          <el-input v-model="form.source" placeholder="请输入来源: 1-搜索 2-群聊 3-名片" />
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

<script setup name="Friend" lang="ts">
import { listFriend, getFriend, delFriend, addFriend, updateFriend } from '@/api/imcore/friend';
import { FriendVO, FriendQuery, FriendForm } from '@/api/imcore/friend/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const friendList = ref<FriendVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const friendFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: FriendForm = {
  id: undefined,
  fkUserId: undefined,
  fkFriendId: undefined,
  conversationId: undefined,
  remark: undefined,
  source: undefined,
  status: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<FriendForm, FriendQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkUserId: undefined,
    fkFriendId: undefined,
    conversationId: undefined,
    source: undefined,
    status: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "关系ID不能为空", trigger: "blur" }
    ],
    fkUserId: [
      { required: true, message: "用户ID不能为空", trigger: "blur" }
    ],
    fkFriendId: [
      { required: true, message: "好友ID不能为空", trigger: "blur" }
    ],
    conversationId: [
      { required: true, message: "单聊会话ID不能为空", trigger: "blur" }
    ],
    remark: [
      { required: true, message: "备注名不能为空", trigger: "blur" }
    ],
    source: [
      { required: true, message: "来源: 1-搜索 2-群聊 3-名片不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "状态: 1-正常 2-删除 3-拉黑不能为空", trigger: "change" }
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

/** 查询好友关系列表 */
const getList = async () => {
  loading.value = true;
  const res = await listFriend(queryParams.value);
  friendList.value = res.rows;
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
  friendFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: FriendVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加好友关系";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: FriendVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getFriend(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改好友关系";
}

/** 提交按钮 */
const submitForm = () => {
  friendFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateFriend(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addFriend(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: FriendVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除好友关系编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delFriend(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/friend/export', {
    ...queryParams.value
  }, `friend_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
