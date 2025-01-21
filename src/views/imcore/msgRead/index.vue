<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="消息id" prop="fkMsgId">
              <el-input v-model="queryParams.fkMsgId" placeholder="请输入消息id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="会话id" prop="fkConversationId">
              <el-input v-model="queryParams.fkConversationId" placeholder="请输入会话id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="接收方id" prop="fkReceiverUserId">
              <el-input v-model="queryParams.fkReceiverUserId" placeholder="请输入接收方id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="发送者id" prop="fkFromUserId">
              <el-input v-model="queryParams.fkFromUserId" placeholder="请输入发送者id" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="读取时间" prop="readTime">
              <el-date-picker clearable
                v-model="queryParams.readTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择读取时间"
              />
            </el-form-item>
            <el-form-item label="接收时间" prop="receiverTime">
              <el-date-picker clearable
                v-model="queryParams.receiverTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择接收时间"
              />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['imcore:msgRead:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['imcore:msgRead:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['imcore:msgRead:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['imcore:msgRead:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="msgReadList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="已读表id" align="center" prop="id" v-if="true" />
        <el-table-column label="消息id" align="center" prop="fkMsgId" />
        <el-table-column label="会话id" align="center" prop="fkConversationId" />
        <el-table-column label="接收方id" align="center" prop="fkReceiverUserId" />
        <el-table-column label="发送者id" align="center" prop="fkFromUserId" />
        <el-table-column label="读取时间" align="center" prop="readTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.readTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接收时间" align="center" prop="receiverTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.receiverTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="0未读; 1已读" align="center" prop="readMsgStatus" />
        <el-table-column label="0未接收; 1已接收" align="center" prop="receiverMsgStatus" />
        <el-table-column label="可选 自定义属性，供开发者扩展使用" align="center" prop="extras" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['imcore:msgRead:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['imcore:msgRead:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改消息已读记录对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="msgReadFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="消息id" prop="fkMsgId">
          <el-input v-model="form.fkMsgId" placeholder="请输入消息id" />
        </el-form-item>
        <el-form-item label="会话id" prop="fkConversationId">
          <el-input v-model="form.fkConversationId" placeholder="请输入会话id" />
        </el-form-item>
        <el-form-item label="接收方id" prop="fkReceiverUserId">
          <el-input v-model="form.fkReceiverUserId" placeholder="请输入接收方id" />
        </el-form-item>
        <el-form-item label="发送者id" prop="fkFromUserId">
          <el-input v-model="form.fkFromUserId" placeholder="请输入发送者id" />
        </el-form-item>
        <el-form-item label="读取时间" prop="readTime">
          <el-date-picker clearable
            v-model="form.readTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择读取时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="接收时间" prop="receiverTime">
          <el-date-picker clearable
            v-model="form.receiverTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择接收时间">
          </el-date-picker>
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

<script setup name="MsgRead" lang="ts">
import { listMsgRead, getMsgRead, delMsgRead, addMsgRead, updateMsgRead } from '@/api/imcore/msgRead';
import { MsgReadVO, MsgReadQuery, MsgReadForm } from '@/api/imcore/msgRead/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const msgReadList = ref<MsgReadVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const msgReadFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: MsgReadForm = {
  id: undefined,
  fkMsgId: undefined,
  fkConversationId: undefined,
  fkReceiverUserId: undefined,
  fkFromUserId: undefined,
  readTime: undefined,
  receiverTime: undefined,
  readMsgStatus: undefined,
  receiverMsgStatus: undefined,
  extras: undefined
}
const data = reactive<PageData<MsgReadForm, MsgReadQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fkMsgId: undefined,
    fkConversationId: undefined,
    fkReceiverUserId: undefined,
    fkFromUserId: undefined,
    readTime: undefined,
    receiverTime: undefined,
    readMsgStatus: undefined,
    receiverMsgStatus: undefined,
    extras: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "已读表id不能为空", trigger: "blur" }
    ],
    fkMsgId: [
      { required: true, message: "消息id不能为空", trigger: "blur" }
    ],
    fkConversationId: [
      { required: true, message: "会话id不能为空", trigger: "blur" }
    ],
    fkReceiverUserId: [
      { required: true, message: "接收方id不能为空", trigger: "blur" }
    ],
    fkFromUserId: [
      { required: true, message: "发送者id不能为空", trigger: "blur" }
    ],
    readTime: [
      { required: true, message: "读取时间不能为空", trigger: "blur" }
    ],
    receiverTime: [
      { required: true, message: "接收时间不能为空", trigger: "blur" }
    ],
    readMsgStatus: [
      { required: true, message: "0未读; 1已读不能为空", trigger: "change" }
    ],
    receiverMsgStatus: [
      { required: true, message: "0未接收; 1已接收不能为空", trigger: "change" }
    ],
    extras: [
      { required: true, message: "可选 自定义属性，供开发者扩展使用不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询消息已读记录列表 */
const getList = async () => {
  loading.value = true;
  const res = await listMsgRead(queryParams.value);
  msgReadList.value = res.rows;
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
  msgReadFormRef.value?.resetFields();
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
const handleSelectionChange = (selection: MsgReadVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加消息已读记录";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: MsgReadVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getMsgRead(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改消息已读记录";
}

/** 提交按钮 */
const submitForm = () => {
  msgReadFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateMsgRead(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addMsgRead(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("操作成功");
      dialog.visible = false;
      await getList();
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: MsgReadVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除消息已读记录编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delMsgRead(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('imcore/msgRead/export', {
    ...queryParams.value
  }, `msgRead_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
