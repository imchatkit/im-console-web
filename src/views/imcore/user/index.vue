<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="手机号地区编码+86等等" prop="addressCode">
              <el-input v-model="queryParams.addressCode" placeholder="请输入手机号地区编码+86等等" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="phone">
              <el-input v-model="queryParams.phone" placeholder="请输入" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="身份证号码" prop="idCardNo">
              <el-input v-model="queryParams.idCardNo" placeholder="请输入身份证号码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="email">
              <el-input v-model="queryParams.email" placeholder="请输入" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="queryParams.password" placeholder="请输入密码" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <el-input v-model="queryParams.avatar" placeholder="请输入头像" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="" prop="nickname">
              <el-input v-model="queryParams.nickname" placeholder="请输入" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最后离线时间" prop="lastOfflineTime">
              <el-date-picker clearable
                v-model="queryParams.lastOfflineTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择最后离线时间"
              />
            </el-form-item>
            <el-form-item label="可选	自定义属性，供开发者扩展使用" prop="attributes">
              <el-input v-model="queryParams.attributes" placeholder="请输入可选	自定义属性，供开发者扩展使用" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="所有设备不推送提醒 1提醒" prop="allValid">
              <el-input v-model="queryParams.allValid" placeholder="请输入所有设备不推送提醒 1提醒" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="最后登录时间" prop="lastLoginTime">
              <el-date-picker clearable
                v-model="queryParams.lastLoginTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择最后登录时间"
              />
            </el-form-item>
            <el-form-item label="最后登录IP" prop="lastLoginIp">
              <el-input v-model="queryParams.lastLoginIp" placeholder="请输入最后登录IP" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:user:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:user:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:user:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:user:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键id" align="center" prop="id" v-if="true" />
        <el-table-column label="手机号地区编码+86等等" align="center" prop="addressCode" />
        <el-table-column label="" align="center" prop="phone" />
        <el-table-column label="身份证号码" align="center" prop="idCardNo" />
        <el-table-column label="" align="center" prop="email" />
        <el-table-column label="密码" align="center" prop="password" />
        <el-table-column label="性别 1-男 2-女 3-未知" align="center" prop="sex" />
        <el-table-column label="头像" align="center" prop="avatar" />
        <el-table-column label="" align="center" prop="nickname" />
        <el-table-column label="最后离线时间" align="center" prop="lastOfflineTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.lastOfflineTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="可选	自定义属性，供开发者扩展使用" align="center" prop="attributes" />
        <el-table-column label="所有设备不推送提醒 1提醒" align="center" prop="allValid" />
        <el-table-column label="用户状态" align="center" prop="userStatus" />
        <el-table-column label="最后登录时间" align="center" prop="lastLoginTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.lastLoginTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录IP" align="center" prop="lastLoginIp" />
        <el-table-column label="是否删除 0-未删除 1-已删除" align="center" prop="deleted" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:user:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:user:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改用户对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="userFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号地区编码+86等等" prop="addressCode">
          <el-input v-model="form.addressCode" placeholder="请输入手机号地区编码+86等等" />
        </el-form-item>
        <el-form-item label="" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCardNo">
          <el-input v-model="form.idCardNo" placeholder="请输入身份证号码" />
        </el-form-item>
        <el-form-item label="" prop="email">
          <el-input v-model="form.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="form.avatar" placeholder="请输入头像" />
        </el-form-item>
        <el-form-item label="" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="最后离线时间" prop="lastOfflineTime">
          <el-date-picker clearable
            v-model="form.lastOfflineTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择最后离线时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可选	自定义属性，供开发者扩展使用" prop="attributes">
            <el-input v-model="form.attributes" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="所有设备不推送提醒 1提醒" prop="allValid">
          <el-input v-model="form.allValid" placeholder="请输入所有设备不推送提醒 1提醒" />
        </el-form-item>
        <el-form-item label="最后登录时间" prop="lastLoginTime">
          <el-date-picker clearable
            v-model="form.lastLoginTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择最后登录时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最后登录IP" prop="lastLoginIp">
          <el-input v-model="form.lastLoginIp" placeholder="请输入最后登录IP" />
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

<script setup name="User" lang="ts">
import { listUser, getUser, delUser, addUser, updateUser } from '@/api/imcore/user';
import { UserVO, UserQuery, UserForm } from '@/api/imcore/user/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const userList = ref<UserVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const userFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: UserForm = {
  id: undefined,
  addressCode: undefined,
  phone: undefined,
  idCardNo: undefined,
  email: undefined,
  password: undefined,
  sex: undefined,
  avatar: undefined,
  nickname: undefined,
  lastOfflineTime: undefined,
  attributes: undefined,
  allValid: undefined,
  userStatus: undefined,
  lastLoginTime: undefined,
  lastLoginIp: undefined,
  deleted: undefined,
  extras: undefined
}
const data = reactive<PageData<UserForm, UserQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    addressCode: undefined,
    phone: undefined,
    idCardNo: undefined,
    email: undefined,
    password: undefined,
    sex: undefined,
    avatar: undefined,
    nickname: undefined,
    lastOfflineTime: undefined,
    attributes: undefined,
    allValid: undefined,
    userStatus: undefined,
    lastLoginTime: undefined,
    lastLoginIp: undefined,
    deleted: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "主键id不能为空", trigger: "blur" }
    ],
    addressCode: [
      { required: true, message: "手机号地区编码+86等等不能为空", trigger: "blur" }
    ],
    phone: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    idCardNo: [
      { required: true, message: "身份证号码不能为空", trigger: "blur" }
    ],
    email: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    password: [
      { required: true, message: "密码不能为空", trigger: "blur" }
    ],
    sex: [
      { required: true, message: "性别 1-男 2-女 3-未知不能为空", trigger: "change" }
    ],
    avatar: [
      { required: true, message: "头像不能为空", trigger: "blur" }
    ],
    nickname: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    lastOfflineTime: [
      { required: true, message: "最后离线时间不能为空", trigger: "blur" }
    ],
    attributes: [
      { required: true, message: "可选	自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ],
    allValid: [
      { required: true, message: "所有设备不推送提醒 1提醒不能为空", trigger: "blur" }
    ],
    userStatus: [
      { required: true, message: "用户状态不能为空", trigger: "change" }
    ],
    lastLoginTime: [
      { required: true, message: "最后登录时间不能为空", trigger: "blur" }
    ],
    lastLoginIp: [
      { required: true, message: "最后登录IP不能为空", trigger: "blur" }
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

/** 查询用户列表 */
const getList = async () => {
  loading.value = true;
  const res = await listUser(queryParams.value);
  userList.value = res.rows;
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
  userFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: UserVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加用户";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: UserVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getUser(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改用户";
}

/** 提交按钮 */
const submitForm = () => {
  userFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateUser(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addUser(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: UserVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除用户编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delUser(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/user/export', {
    ...queryParams.value
  }, `user_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
