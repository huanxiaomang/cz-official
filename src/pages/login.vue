<template>
  <div class="login-container dark:bg-[#121212] dark:text-gray-200" w-full h-full>
    <h1 class="page-title">创智工作室账号登录</h1>
    <div class="form-container" pt-10 w-full h-full flex items-center justify-center px-6>
      <div class="login-panel w-full max-w-120 rounded-4 px-6 py-8 bg-white/88 dark:bg-[#181818]/88 shadow-lg backdrop-blur-sm">
        <div class="mb-6 text-center">
          <div class="text-6 font-semibold">登录创智工作室</div>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">继续访问成员信息、讨论区和个人资料。</div>
        </div>
      <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
        m-auto :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '请输入邮箱!' }]" class="dark:text-gray-200">
          <a-input v-model:value="formState.email" size="large" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]" class="dark:text-gray-200">
          <a-input-password v-model:value="formState.password" size="large" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <div class="flex justify-between items-center">
            <a-checkbox v-model:checked="formState.remember" class="dark:text-gray-300">请记住我</a-checkbox>
            <router-link to="/forgotPassword" class="text-blue-500 hover:underline">忘记密码？</router-link>
          </div>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" class="w-full dark:border-gray-600" size="large" :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive , ref } from 'vue';
import { message } from 'ant-design-vue';
import { LoginParams } from '~/api/user';
import { useUserStore } from '~/store/user';
import { useMessage } from '~/hooks/web/useMessage';
import { useRouter } from 'vue-router';

interface FormState extends LoginParams{
    remember: boolean;
}

let loading = ref(false)

const formState = reactive<FormState>({
    email: '',
    password: '',
    remember: true,
});

const router = useRouter();

const onFinish = async (values: FormState) => {
  loading.value = true;
  const hide = message.loading('正在登录..', 0);
  try {
    const userStore = useUserStore();
    const userInfo = await userStore.login({
      email: values.email,
      password: values.password,
    });

    if (userInfo) {
      const { notification } = useMessage();
      notification.success({
        message: '登录成功o(^▽^)o',
        description: '欢迎进入',
        duration: 3,
      });

      await router.replace('/');
      router.go(0);
    }
  } catch (error) {
    console.error('登录失败:', error);
  } finally {
    loading.value = false;
    hide();
  }
};

const onFinishFailed = () => {
  message.warning('请先补全登录信息');
};
</script>
<style scoped>
.page-title {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
