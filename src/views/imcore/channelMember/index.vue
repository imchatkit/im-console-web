<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="频道ID" prop="fkChannelId">
              <el-input v-model="queryParams.fkChannelId" placeholder="请输入频道ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户ID" prop="fkUserId">
              <el-input v-model="queryParams.fkUserId" placeholder="请输入用户ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户权限" prop="memberRole">
              <el-input v-model="queryParams.memberRole" placeholder="请输入用户权限" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="加入时间" prop="joinTime">
              <el-date-picker clearable
                v-model="queryParams.joinTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择加入时间"
              />
            </el-form-item>
            <el-form-item label="通知级别:0关闭,1提及时,2所有消息" prop="notificationLevel">
              <el-input v-model="queryParams.notificationLevel" placeholder="请输入通知级别:0关闭,1提及时,2所有消息" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否星标:0否,1是" prop="starred">
              <el-input v-model="queryParams.starred" placeholder="请输入是否星标:0否,1是" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:channelMember:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:channelMember:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:channelMember:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:channelMember:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="channelMemberList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" v-if="true" />
        <el-table-column label="频道ID" align="center" prop="fkChannelId" />
        <el-table-column label="用户ID" align="center" prop="fkUserId" />
        <el-table-column label="用户权限" align="center" prop="memberRole" />
        <el-table-column label="加入时间" align="center" prop="joinTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.joinTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通知级别:0关闭,1提及时,2所有消息" align="center" prop="notificationLevel" />
        <el-table-column label="是否星标:0否,1是" align="center" prop="starred" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:channelMember:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:channelMember:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改频道成员对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="channelMemberFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="频道ID" prop="fkChannelId">
          <el-input v-model="form.fkChannelId" placeholder="请输入频道ID" />
        </el-form-item>
        <el-form-item label="用户ID" prop="fkUserId">
          <el-input v-model="form.fkUserId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户权限" prop="memberRole">
          <el-input v-model="form.memberRole" placeholder="请输入用户权限" />
        </el-form-item>
        <el-form-item label="加入时间" prop="joinTime">
          <el-date-picker clearable
            v-model="form.joinTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择加入时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="通知级别:0关闭,1提及时,2所有消息" prop="notificationLevel">
          <el-input v-model="form.notificationLevel" placeholder="请输入通知级别:0关闭,1提及时,2所有消息" />
        </el-form-item>
        <el-form-item label="是否星标:0否,1是" prop="starred">
          <el-input v-model="form.starred" placeholder="请输入是否星标:0否,1是" />
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

<script setup name="ChannelMember" lang="ts">
import { listChannelMember, getChannelMember, delChannelMember, addChannelMember, updateChannelMember } from '@/api/imcore/channelMember';
import { ChannelMemberVO, ChannelMemberQuery, ChannelMemberForm } from '@/api/imcore/channelMember/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const channelMemberList = ref<ChannelMemberVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const channelMemberFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ChannelMemberForm = {
  id: undefined,
  fkChannelId: undefined,
  fkUserId: undefined,
  memberRole: undefined,
  joinTime: undefined,
  notificationLevel: undefined,
  starred: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<ChannelMemberForm, ChannelMemberQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkChannelId: undefined,
    fkUserId: undefined,
    memberRole: undefined,
    joinTime: undefined,
    notificationLevel: undefined,
    starred: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键ID不能为空", trigger: "blur" }
    ],
    fkChannelId: [
      { required: true, message: "频道ID不能为空", trigger: "blur" }
    ],
    fkUserId: [
      { required: true, message: "用户ID不能为空", trigger: "blur" }
    ],
    memberRole: [
      { required: true, message: "用户权限不能为空", trigger: "blur" }
    ],
    joinTime: [
      { required: true, message: "加入时间不能为空", trigger: "blur" }
    ],
    notificationLevel: [
      { required: true, message: "通知级别:0关闭,1提及时,2所有消息不能为空", trigger: "blur" }
    ],
    starred: [
      { required: true, message: "是否星标:0否,1是不能为空", trigger: "blur" }
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

/** 查询频道成员列表 */
const getList = async () => {
  loading.value = true;
  const res = await listChannelMember(queryParams.value);
  channelMemberList.value = res.rows;
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
  channelMemberFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: ChannelMemberVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加频道成员";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: ChannelMemberVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getChannelMember(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改频道成员";
}

/** 提交按钮 */
const submitForm = () => {
  channelMemberFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateChannelMember(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addChannelMember(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: ChannelMemberVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除频道成员编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delChannelMember(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/channelMember/export', {
    ...queryParams.value
  }, `channelMember_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
