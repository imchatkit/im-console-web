<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="所属工作空间ID" prop="fkWorkspaceId">
              <el-input v-model="queryParams.fkWorkspaceId" placeholder="请输入所属工作空间ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="关联的会话ID" prop="fkConversationId">
              <el-input v-model="queryParams.fkConversationId" placeholder="请输入关联的会话ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="频道名称" prop="channelName">
              <el-input v-model="queryParams.channelName" placeholder="请输入频道名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="频道主题" prop="topic">
              <el-input v-model="queryParams.topic" placeholder="请输入频道主题" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="频道描述" prop="description">
              <el-input v-model="queryParams.description" placeholder="请输入频道描述" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="父频道ID,用于嵌套" prop="parentId">
              <el-input v-model="queryParams.parentId" placeholder="请输入父频道ID,用于嵌套" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="创建者ID" prop="creatorUserId">
              <el-input v-model="queryParams.creatorUserId" placeholder="请输入创建者ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="排序号" prop="sortOrder">
              <el-input v-model="queryParams.sortOrder" placeholder="请输入排序号" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否归档:0否,1是" prop="archived">
              <el-input v-model="queryParams.archived" placeholder="请输入是否归档:0否,1是" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:channel:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:channel:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:channel:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:channel:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="channelList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="所属工作空间ID" align="center" prop="fkWorkspaceId" />
        <el-table-column label="关联的会话ID" align="center" prop="fkConversationId" />
        <el-table-column label="频道名称" align="center" prop="channelName" />
        <el-table-column label="频道类型:1公开,2私密" align="center" prop="channelType" />
        <el-table-column label="频道主题" align="center" prop="topic" />
        <el-table-column label="频道描述" align="center" prop="description" />
        <el-table-column label="父频道ID,用于嵌套" align="center" prop="parentId" />
        <el-table-column label="创建者ID" align="center" prop="creatorUserId" />
        <el-table-column label="排序号" align="center" prop="sortOrder" />
        <el-table-column label="是否归档:0否,1是" align="center" prop="archived" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:channel:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:channel:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改频道对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="channelFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属工作空间ID" prop="fkWorkspaceId">
          <el-input v-model="form.fkWorkspaceId" placeholder="请输入所属工作空间ID" />
        </el-form-item>
        <el-form-item label="关联的会话ID" prop="fkConversationId">
          <el-input v-model="form.fkConversationId" placeholder="请输入关联的会话ID" />
        </el-form-item>
        <el-form-item label="频道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入频道名称" />
        </el-form-item>
        <el-form-item label="频道主题" prop="topic">
          <el-input v-model="form.topic" placeholder="请输入频道主题" />
        </el-form-item>
        <el-form-item label="频道描述" prop="description">
            <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="父频道ID,用于嵌套" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入父频道ID,用于嵌套" />
        </el-form-item>
        <el-form-item label="创建者ID" prop="creatorUserId">
          <el-input v-model="form.creatorUserId" placeholder="请输入创建者ID" />
        </el-form-item>
        <el-form-item label="排序号" prop="sortOrder">
          <el-input v-model="form.sortOrder" placeholder="请输入排序号" />
        </el-form-item>
        <el-form-item label="是否归档:0否,1是" prop="archived">
          <el-input v-model="form.archived" placeholder="请输入是否归档:0否,1是" />
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

<script setup name="Channel" lang="ts">
import { listChannel, getChannel, delChannel, addChannel, updateChannel } from '@/api/imcore/channel';
import { ChannelVO, ChannelQuery, ChannelForm } from '@/api/imcore/channel/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const channelList = ref<ChannelVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const channelFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ChannelForm = {
  id: undefined,
  fkWorkspaceId: undefined,
  fkConversationId: undefined,
  channelName: undefined,
  channelType: undefined,
  topic: undefined,
  description: undefined,
  parentId: undefined,
  creatorUserId: undefined,
  sortOrder: undefined,
  archived: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<ChannelForm, ChannelQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkWorkspaceId: undefined,
    fkConversationId: undefined,
    channelName: undefined,
    channelType: undefined,
    topic: undefined,
    description: undefined,
    parentId: undefined,
    creatorUserId: undefined,
    sortOrder: undefined,
    archived: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],
    fkWorkspaceId: [
      { required: true, message: "所属工作空间ID不能为空", trigger: "blur" }
    ],
    fkConversationId: [
      { required: true, message: "关联的会话ID不能为空", trigger: "blur" }
    ],
    channelName: [
      { required: true, message: "频道名称不能为空", trigger: "blur" }
    ],
    channelType: [
      { required: true, message: "频道类型:1公开,2私密不能为空", trigger: "change" }
    ],
    topic: [
      { required: true, message: "频道主题不能为空", trigger: "blur" }
    ],
    description: [
      { required: true, message: "频道描述不能为空", trigger: "blur" }
    ],
    parentId: [
      { required: true, message: "父频道ID,用于嵌套不能为空", trigger: "blur" }
    ],
    creatorUserId: [
      { required: true, message: "创建者ID不能为空", trigger: "blur" }
    ],
    sortOrder: [
      { required: true, message: "排序号不能为空", trigger: "blur" }
    ],
    archived: [
      { required: true, message: "是否归档:0否,1是不能为空", trigger: "blur" }
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

/** 查询频道列表 */
const getList = async () => {
  loading.value = true;
  const res = await listChannel(queryParams.value);
  channelList.value = res.rows;
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
  channelFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ChannelVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加频道";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ChannelVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getChannel(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改频道";
}

/** 提交按钮 */
const submitForm = () => {
  channelFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateChannel(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addChannel(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ChannelVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除频道编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delChannel(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/channel/export', {
    ...queryParams.value
  }, `channel_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
