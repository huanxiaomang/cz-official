<template>
  <div class="login-container dark:bg-[#121212] dark:text-gray-200" w-full h-full>
    <div class="form-container" pt-10 w-full h-full flex items-center justify-center>
      <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
        m-auto :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '请输入邮箱!' }]" class="dark:text-gray-200">
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]" class="dark:text-gray-200">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <div class="flex justify-between items-center">
            <a-checkbox v-model:checked="formState.remember" class="dark:text-gray-300">请记住我</a-checkbox>
            <router-link to="/forgotPassword" class="text-blue-500 hover:underline">忘记密码？</router-link>
          </div>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="default" html-type="submit" class="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600" :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, reactive , ref } from 'vue';
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

const onFinish = (values: any) => {
  const hide = message.loading('正在登录..', 0);
  setTimeout(async () => {
    const userStore = useUserStore();
    const userInfo = await userStore.login({
      email: values.email,
      password: values.password,
    });
    loading.value = false;
    hide();
    if(userInfo) {
      const { notification } = useMessage();
      notification.success({
        message: '登录成功o(^▽^)o',
        description: '欢迎进入',
        duration: 3,
      });

      await router.replace('/');
      router.go(0);

    }
  }, 300);
};

const onFinishFailed = (errorInfo: any) => {
  const hide = message.loading('正在登录..', 0);
  setTimeout(hide, 500);
};
</script>
<mcfile name="forgotPassword.vue" path=".\forgotPassword.vue"></mcfile>

