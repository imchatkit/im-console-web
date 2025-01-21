<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="关联的会话ID" prop="fkConversationId">
              <el-input v-model="queryParams.fkConversationId" placeholder="请输入关联的会话ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="群名称" prop="name">
              <el-input v-model="queryParams.name" placeholder="请输入群名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="群主ID" prop="ownerId">
              <el-input v-model="queryParams.ownerId" placeholder="请输入群主ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最大成员数" prop="maxMemberCount">
              <el-input v-model="queryParams.maxMemberCount" placeholder="请输入最大成员数" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="群公告" prop="notice">
              <el-input v-model="queryParams.notice" placeholder="请输入群公告" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="关联组织ID" prop="orgId">
              <el-input v-model="queryParams.orgId" placeholder="请输入关联组织ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="关联部门ID" prop="deptId">
              <el-input v-model="queryParams.deptId" placeholder="请输入关联部门ID" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:group:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:group:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:group:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:group:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="groupList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="群组ID" align="center" prop="id" v-if="true" />
        <el-table-column label="关联的会话ID" align="center" prop="fkConversationId" />
        <el-table-column label="群名称" align="center" prop="name" />
        <el-table-column label="群主ID" align="center" prop="ownerId" />
        <el-table-column label="群类型: 1-普通群 2-部门群 3-企业群" align="center" prop="groupType" />
        <el-table-column label="最大成员数" align="center" prop="maxMemberCount" />
        <el-table-column label="加群方式: 0-自由加入 1-需验证 2-禁止加入" align="center" prop="joinType" />
        <el-table-column label="群公告" align="center" prop="notice" />
        <el-table-column label="关联组织ID" align="center" prop="orgId" />
        <el-table-column label="关联部门ID" align="center" prop="deptId" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:group:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:group:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改群组对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="groupFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="关联的会话ID" prop="fkConversationId">
          <el-input v-model="form.fkConversationId" placeholder="请输入关联的会话ID" />
        </el-form-item>
        <el-form-item label="群名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入群名称" />
        </el-form-item>
        <el-form-item label="群主ID" prop="ownerId">
          <el-input v-model="form.ownerId" placeholder="请输入群主ID" />
        </el-form-item>
        <el-form-item label="最大成员数" prop="maxMemberCount">
          <el-input v-model="form.maxMemberCount" placeholder="请输入最大成员数" />
        </el-form-item>
        <el-form-item label="群公告" prop="notice">
            <el-input v-model="form.notice" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="关联组织ID" prop="orgId">
          <el-input v-model="form.orgId" placeholder="请输入关联组织ID" />
        </el-form-item>
        <el-form-item label="关联部门ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入关联部门ID" />
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

<script setup name="Group" lang="ts">
import { listGroup, getGroup, delGroup, addGroup, updateGroup } from '@/api/imcore/group';
import { GroupVO, GroupQuery, GroupForm } from '@/api/imcore/group/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const groupList = ref<GroupVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const groupFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: GroupForm = {
  id: undefined,
  fkConversationId: undefined,
  name: undefined,
  ownerId: undefined,
  groupType: undefined,
  maxMemberCount: undefined,
  joinType: undefined,
  notice: undefined,
  orgId: undefined,
  deptId: undefined,
  extras: undefined
}
const data = reactive<PageData<GroupForm, GroupQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkConversationId: undefined,
    name: undefined,
    ownerId: undefined,
    groupType: undefined,
    maxMemberCount: undefined,
    joinType: undefined,
    notice: undefined,
    orgId: undefined,
    deptId: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "群组ID不能为空", trigger: "blur" }
    ],
    fkConversationId: [
      { required: true, message: "关联的会话ID不能为空", trigger: "blur" }
    ],
    name: [
      { required: true, message: "群名称不能为空", trigger: "blur" }
    ],
    ownerId: [
      { required: true, message: "群主ID不能为空", trigger: "blur" }
    ],
    groupType: [
      { required: true, message: "群类型: 1-普通群 2-部门群 3-企业群不能为空", trigger: "change" }
    ],
    maxMemberCount: [
      { required: true, message: "最大成员数不能为空", trigger: "blur" }
    ],
    joinType: [
      { required: true, message: "加群方式: 0-自由加入 1-需验证 2-禁止加入不能为空", trigger: "change" }
    ],
    notice: [
      { required: true, message: "群公告不能为空", trigger: "blur" }
    ],
    orgId: [
      { required: true, message: "关联组织ID不能为空", trigger: "blur" }
    ],
    deptId: [
      { required: true, message: "关联部门ID不能为空", trigger: "blur" }
    ],
    extras: [
      { required: true, message: "可选 自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询群组列表 */
const getList = async () => {
  loading.value = true;
  const res = await listGroup(queryParams.value);
  groupList.value = res.rows;
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
  groupFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: GroupVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加群组";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: GroupVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getGroup(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改群组";
}

/** 提交按钮 */
const submitForm = () => {
  groupFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateGroup(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addGroup(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: GroupVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除群组编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delGroup(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/group/export', {
    ...queryParams.value
  }, `group_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
