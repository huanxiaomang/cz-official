<template>
  <div class="login-container">
    <div class="form-container">
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="请输入您的用户名" v-bind="validateInfos.username">
          <a-input v-model:value="modelRef.username" />
        </a-form-item>
        <a-form-item label="请输入您的邮箱" v-bind="validateInfos.email">
          <a-input v-model:value="modelRef.email" />
        </a-form-item>
        <a-form-item label="请输入您的密码" v-bind="validateInfos.password">
          <a-input v-model:value="modelRef.password" />
        </a-form-item>
        <a-form-item label="二次确认您的密码" v-bind="validateInfos.password_confirm">
          <a-input v-model:value="modelRef.password_confirm" />
        </a-form-item>
        <a-form-item label="请选择您的年级" v-bind="validateInfos.grade">
          <a-select v-model:value="modelRef.grade" placeholder="请选择您的年级">
            <a-select-option value="1">大一</a-select-option>
            <a-select-option value="2">大二</a-select-option>
            <a-select-option value="3">大三</a-select-option>
            <a-select-option value="4">大四</a-select-option>
            <a-select-option value="5">毕业</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="请选择您的学习方向" v-bind="validateInfos.major">
          <a-select v-model:value="modelRef.major" placeholder="学习方向">
            <a-select-option value="前端开发">前端开发</a-select-option>
            <a-select-option value="后端开发">后端开发</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click.prevent="onSubmit" color="black">创建账户</a-button>
          <a-button style="margin-left: 10px" @click="resetFields">重置表单</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import { useUserStore } from '~/store/user';
import { RegisterParams } from '~/api/user';
import { useMessage } from '~/hooks/web/useMessage';

const useForm = Form.useForm;

const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const modelRef = reactive<RegisterParams>({
  username: '',
  email: '',
  password: '',
  password_confirm:'',
  grade: 1,
  major: '',
});
const rulesRef = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入您的邮箱',
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入您的密码',
    },
  ],
  password_confirm: [
    {
      required: true,
      message: '请再次输入您的密码',
    }
  ],
  grade: [
    {
      required: true,
      message: '请输入年级',
    },
  ],
  major: [
    {
      required: true,
      message: '请选择您的学习方向',
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
});
const onSubmit = () => {
  validate()
    .then(async () => {
      const data = toRaw(modelRef);
      const userStore = useUserStore();
      const userInfo = await userStore.register(data);
      if (userInfo) {
        const { notification } = useMessage();
        notification.success({
          message: '注册成功o(^▽^)o',
          description: '欢迎加入',
          duration: 3,
        });
      }

    })
    .catch(err => {
      // const { notification } = useMessage();
      // notification.error({
      //   message: '验证失败',
      //   content: err.errorFields.map((errorItem: any) => errorItem.errors[0]).join(','),
      //   duration: 3,
      // });
    });
};
</script>

<style scoped lang="scss">
.login-container{
    width: 100%;    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
    .form-container{
        width:55rem;
        form{
            width: 100%;
        }
    }
}
</style>
