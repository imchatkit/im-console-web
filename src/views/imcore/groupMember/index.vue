<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="会话ID" prop="fkConversationId">
              <el-input v-model="queryParams.fkConversationId" placeholder="请输入会话ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="群组表id" prop="fkGroupId">
              <el-input v-model="queryParams.fkGroupId" placeholder="请输入群组表id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="会话成员表id" prop="fkConversationMemberId">
              <el-input v-model="queryParams.fkConversationMemberId" placeholder="请输入会话成员表id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="用户id" prop="fkUserId">
              <el-input v-model="queryParams.fkUserId" placeholder="请输入用户id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="邀请该成员进群的用户" prop="memberInvitedJoinUser">
              <el-input v-model="queryParams.memberInvitedJoinUser" placeholder="请输入邀请该成员进群的用户" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="可选	自定义属性，供开发者扩展使用" prop="extras">
              <el-input v-model="queryParams.extras" placeholder="请输入可选	自定义属性，供开发者扩展使用" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="群聊中用户的备注名" prop="userGroupRemarkName">
              <el-input v-model="queryParams.userGroupRemarkName" placeholder="请输入群聊中用户的备注名" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="角色 1-普通群成员 2-管理员 3-群主" prop="role">
              <el-input v-model="queryParams.role" placeholder="请输入角色 1-普通群成员 2-管理员 3-群主" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="是否删除 0-未删除 1-已删除" prop="deleted">
              <el-input v-model="queryParams.deleted" placeholder="请输入是否删除 0-未删除 1-已删除" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:groupMember:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:groupMember:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:groupMember:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:groupMember:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="groupMemberList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="唯一id" align="center" prop="id" v-if="true" />
        <el-table-column label="会话ID" align="center" prop="fkConversationId" />
        <el-table-column label="群组表id" align="center" prop="fkGroupId" />
        <el-table-column label="会话成员表id" align="center" prop="fkConversationMemberId" />
        <el-table-column label="用户id" align="center" prop="fkUserId" />
        <el-table-column label="邀请该成员进群的用户" align="center" prop="memberInvitedJoinUser" />
        <el-table-column label="可选	自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="群聊中用户的备注名" align="center" prop="userGroupRemarkName" />
        <el-table-column label="角色 1-普通群成员 2-管理员 3-群主" align="center" prop="role" />
        <el-table-column label="群组成员状态  0主动退群  1正常 2被移出群聊" align="center" prop="groupMemberStatus" />
        <el-table-column label="群组成员进群方式: 1创建时加入 2主动扫码加入 3被邀请进入" align="center" prop="groupMemberJoinType" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:groupMember:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:groupMember:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改群成员对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="groupMemberFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会话ID" prop="fkConversationId">
          <el-input v-model="form.fkConversationId" placeholder="请输入会话ID" />
        </el-form-item>
        <el-form-item label="群组表id" prop="fkGroupId">
          <el-input v-model="form.fkGroupId" placeholder="请输入群组表id" />
        </el-form-item>
        <el-form-item label="会话成员表id" prop="fkConversationMemberId">
          <el-input v-model="form.fkConversationMemberId" placeholder="请输入会话成员表id" />
        </el-form-item>
        <el-form-item label="用户id" prop="fkUserId">
          <el-input v-model="form.fkUserId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="邀请该成员进群的用户" prop="memberInvitedJoinUser">
          <el-input v-model="form.memberInvitedJoinUser" placeholder="请输入邀请该成员进群的用户" />
        </el-form-item>
        <el-form-item label="可选	自定义属性，供开发者扩展使用" prop="extras">
            <el-input v-model="form.extras" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="群聊中用户的备注名" prop="userGroupRemarkName">
          <el-input v-model="form.userGroupRemarkName" placeholder="请输入群聊中用户的备注名" />
        </el-form-item>
        <el-form-item label="角色 1-普通群成员 2-管理员 3-群主" prop="role">
          <el-input v-model="form.role" placeholder="请输入角色 1-普通群成员 2-管理员 3-群主" />
        </el-form-item>
        <el-form-item label="是否删除 0-未删除 1-已删除" prop="deleted">
          <el-input v-model="form.deleted" placeholder="请输入是否删除 0-未删除 1-已删除" />
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

<script setup name="GroupMember" lang="ts">
import { listGroupMember, getGroupMember, delGroupMember, addGroupMember, updateGroupMember } from '@/api/imcore/groupMember';
import { GroupMemberVO, GroupMemberQuery, GroupMemberForm } from '@/api/imcore/groupMember/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const groupMemberList = ref<GroupMemberVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const groupMemberFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: GroupMemberForm = {
  id: undefined,
  fkConversationId: undefined,
  fkGroupId: undefined,
  fkConversationMemberId: undefined,
  fkUserId: undefined,
  memberInvitedJoinUser: undefined,
  extras: undefined,
  userGroupRemarkName: undefined,
  role: undefined,
  groupMemberStatus: undefined,
  groupMemberJoinType: undefined,
  deleted: undefined
}
const data = reactive<PageData<GroupMemberForm, GroupMemberQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkConversationId: undefined,
    fkGroupId: undefined,
    fkConversationMemberId: undefined,
    fkUserId: undefined,
    memberInvitedJoinUser: undefined,
    extras: undefined,
    userGroupRemarkName: undefined,
    role: undefined,
    groupMemberStatus: undefined,
    groupMemberJoinType: undefined,
    deleted: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "唯一id不能为空", trigger: "blur" }
    ],
    fkConversationId: [
      { required: true, message: "会话ID不能为空", trigger: "blur" }
    ],
    fkGroupId: [
      { required: true, message: "群组表id不能为空", trigger: "blur" }
    ],
    fkConversationMemberId: [
      { required: true, message: "会话成员表id不能为空", trigger: "blur" }
    ],
    fkUserId: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    memberInvitedJoinUser: [
      { required: true, message: "邀请该成员进群的用户不能为空", trigger: "blur" }
    ],
    extras: [
      { required: true, message: "可选	自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ],
    userGroupRemarkName: [
      { required: true, message: "群聊中用户的备注名不能为空", trigger: "blur" }
    ],
    role: [
      { required: true, message: "角色 1-普通群成员 2-管理员 3-群主不能为空", trigger: "blur" }
    ],
    groupMemberStatus: [
      { required: true, message: "群组成员状态  0主动退群  1正常 2被移出群聊不能为空", trigger: "change" }
    ],
    groupMemberJoinType: [
      { required: true, message: "群组成员进群方式: 1创建时加入 2主动扫码加入 3被邀请进入不能为空", trigger: "change" }
    ],
    deleted: [
      { required: true, message: "是否删除 0-未删除 1-已删除不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询群成员列表 */
const getList = async () => {
  loading.value = true;
  const res = await listGroupMember(queryParams.value);
  groupMemberList.value = res.rows;
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
  groupMemberFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: GroupMemberVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加群成员";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: GroupMemberVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getGroupMember(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改群成员";
}

/** 提交按钮 */
const submitForm = () => {
  groupMemberFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateGroupMember(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addGroupMember(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: GroupMemberVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除群成员编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delGroupMember(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/groupMember/export', {
    ...queryParams.value
  }, `groupMember_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
