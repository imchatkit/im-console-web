<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="全员禁言: 0-否 1-是" prop="allMute">
              <el-input v-model="queryParams.allMute" placeholder="请输入全员禁言: 0-否 1-是" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="成员邀请开关 0-关闭 1-开启" prop="memberInvite">
              <el-input v-model="queryParams.memberInvite" placeholder="请输入成员邀请开关 0-关闭 1-开启" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="成员修改群信息开关 0-关闭 1-开启" prop="memberModify">
              <el-input v-model="queryParams.memberModify" placeholder="请输入成员修改群信息开关 0-关闭 1-开启" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="成员列表可见开关 0-关闭 1-开启" prop="memberVisible">
              <el-input v-model="queryParams.memberVisible" placeholder="请输入成员列表可见开关 0-关闭 1-开启" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="禁止群内加好友 0-关闭 1-开启" prop="forbidAddFriend">
              <el-input v-model="queryParams.forbidAddFriend" placeholder="请输入禁止群内加好友 0-关闭 1-开启" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="禁止发红包 0-关闭 1-开启" prop="forbidSendRedpacket">
              <el-input v-model="queryParams.forbidSendRedpacket" placeholder="请输入禁止发红包 0-关闭 1-开启" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="禁止发链接 0-关闭 1-开启" prop="forbidSendLink">
              <el-input v-model="queryParams.forbidSendLink" placeholder="请输入禁止发链接 0-关闭 1-开启" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="群组是否已解散 0-否 1-是" prop="groupDisbanded">
              <el-input v-model="queryParams.groupDisbanded" placeholder="请输入群组是否已解散 0-否 1-是" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:groupSetting:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:groupSetting:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:groupSetting:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:groupSetting:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="groupSettingList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="群组ID" align="center" prop="fkGroupId" v-if="true" />
        <el-table-column label="全员禁言: 0-否 1-是" align="center" prop="allMute" />
        <el-table-column label="成员邀请开关 0-关闭 1-开启" align="center" prop="memberInvite" />
        <el-table-column label="成员修改群信息开关 0-关闭 1-开启" align="center" prop="memberModify" />
        <el-table-column label="成员列表可见开关 0-关闭 1-开启" align="center" prop="memberVisible" />
        <el-table-column label="禁止群内加好友 0-关闭 1-开启" align="center" prop="forbidAddFriend" />
        <el-table-column label="禁止发红包 0-关闭 1-开启" align="center" prop="forbidSendRedpacket" />
        <el-table-column label="禁止发图片 0-关闭 1-开启" align="center" prop="forbidSendImageUrl" width="100">
          <template #default="scope">
            <image-preview :src="scope.row.forbidSendImageUrl" :width="50" :height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="禁止发链接 0-关闭 1-开启" align="center" prop="forbidSendLink" />
        <el-table-column label="群组是否已解散 0-否 1-是" align="center" prop="groupDisbanded" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:groupSetting:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:groupSetting:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改群组设置对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="groupSettingFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="全员禁言: 0-否 1-是" prop="allMute">
          <el-input v-model="form.allMute" placeholder="请输入全员禁言: 0-否 1-是" />
        </el-form-item>
        <el-form-item label="成员邀请开关 0-关闭 1-开启" prop="memberInvite">
          <el-input v-model="form.memberInvite" placeholder="请输入成员邀请开关 0-关闭 1-开启" />
        </el-form-item>
        <el-form-item label="成员修改群信息开关 0-关闭 1-开启" prop="memberModify">
          <el-input v-model="form.memberModify" placeholder="请输入成员修改群信息开关 0-关闭 1-开启" />
        </el-form-item>
        <el-form-item label="成员列表可见开关 0-关闭 1-开启" prop="memberVisible">
          <el-input v-model="form.memberVisible" placeholder="请输入成员列表可见开关 0-关闭 1-开启" />
        </el-form-item>
        <el-form-item label="禁止群内加好友 0-关闭 1-开启" prop="forbidAddFriend">
          <el-input v-model="form.forbidAddFriend" placeholder="请输入禁止群内加好友 0-关闭 1-开启" />
        </el-form-item>
        <el-form-item label="禁止发红包 0-关闭 1-开启" prop="forbidSendRedpacket">
          <el-input v-model="form.forbidSendRedpacket" placeholder="请输入禁止发红包 0-关闭 1-开启" />
        </el-form-item>
        <el-form-item label="禁止发图片 0-关闭 1-开启" prop="forbidSendImage">
          <image-upload v-model="form.forbidSendImage"/>
        </el-form-item>
        <el-form-item label="禁止发链接 0-关闭 1-开启" prop="forbidSendLink">
          <el-input v-model="form.forbidSendLink" placeholder="请输入禁止发链接 0-关闭 1-开启" />
        </el-form-item>
        <el-form-item label="群组是否已解散 0-否 1-是" prop="groupDisbanded">
          <el-input v-model="form.groupDisbanded" placeholder="请输入群组是否已解散 0-否 1-是" />
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

<script setup name="GroupSetting" lang="ts">
import { listGroupSetting, getGroupSetting, delGroupSetting, addGroupSetting, updateGroupSetting } from '@/api/imcore/groupSetting';
import { GroupSettingVO, GroupSettingQuery, GroupSettingForm } from '@/api/imcore/groupSetting/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const groupSettingList = ref<GroupSettingVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const groupSettingFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: GroupSettingForm = {
  fkGroupId: undefined,
  allMute: undefined,
  memberInvite: undefined,
  memberModify: undefined,
  memberVisible: undefined,
  forbidAddFriend: undefined,
  forbidSendRedpacket: undefined,
  forbidSendImage: undefined,
  forbidSendLink: undefined,
  groupDisbanded: undefined,
  extras: undefined
}
const data = reactive<PageData<GroupSettingForm, GroupSettingQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    allMute: undefined,
    memberInvite: undefined,
    memberModify: undefined,
    memberVisible: undefined,
    forbidAddFriend: undefined,
    forbidSendRedpacket: undefined,
    forbidSendImage: undefined,
    forbidSendLink: undefined,
    groupDisbanded: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    fkGroupId: [
      { required: true, message: "群组ID不能为空", trigger: "blur" }
    ],
    allMute: [
      { required: true, message: "全员禁言: 0-否 1-是不能为空", trigger: "blur" }
    ],
    memberInvite: [
      { required: true, message: "成员邀请开关 0-关闭 1-开启不能为空", trigger: "blur" }
    ],
    memberModify: [
      { required: true, message: "成员修改群信息开关 0-关闭 1-开启不能为空", trigger: "blur" }
    ],
    memberVisible: [
      { required: true, message: "成员列表可见开关 0-关闭 1-开启不能为空", trigger: "blur" }
    ],
    forbidAddFriend: [
      { required: true, message: "禁止群内加好友 0-关闭 1-开启不能为空", trigger: "blur" }
    ],
    forbidSendRedpacket: [
      { required: true, message: "禁止发红包 0-关闭 1-开启不能为空", trigger: "blur" }
    ],
    forbidSendImage: [
      { required: true, message: "禁止发图片 0-关闭 1-开启不能为空", trigger: "blur" }
    ],
    forbidSendLink: [
      { required: true, message: "禁止发链接 0-关闭 1-开启不能为空", trigger: "blur" }
    ],
    groupDisbanded: [
      { required: true, message: "群组是否已解散 0-否 1-是不能为空", trigger: "blur" }
    ],
    extras: [
      { required: true, message: "可选 自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询群组设置列表 */
const getList = async () => {
  loading.value = true;
  const res = await listGroupSetting(queryParams.value);
  groupSettingList.value = res.rows;
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
  groupSettingFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: GroupSettingVO[]) => {
  ids.value = selection.map(item => item.fkGroupId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加群组设置";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: GroupSettingVO) => {
  reset();
  const _fkGroupId = row?.fkGroupId || ids.value[0]
  const res = await getGroupSetting(_fkGroupId);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改群组设置";
}

/** 提交按钮 */
const submitForm = () => {
  groupSettingFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.fkGroupId) {
        await updateGroupSetting(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addGroupSetting(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: GroupSettingVO) => {
  const _fkGroupIds = row?.fkGroupId || ids.value;
  await proxy?.$modal.confirm('是否确认删除群组设置编号为"' + _fkGroupIds + '"的数据项？').finally(() => loading.value = false);
  await delGroupSetting(_fkGroupIds);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/groupSetting/export', {
    ...queryParams.value
  }, `groupSetting_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
