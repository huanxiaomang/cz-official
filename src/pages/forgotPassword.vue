<template>
  <div class="login-container dark:bg-[#121212] dark:text-gray-200" w-full h-full>
    <div class="form-container" pt-10 w-full flex>
      <a-form
        :model="formState"
        m-auto
        w-120
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="邮箱"
          name="email"
          :rules="[{ required: true, message: '请输入注册邮箱!' }, { type: 'email', message: '邮箱格式不正确' }]"
          validate-trigger="onChange"
          class="dark:text-gray-200"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item label="验证码" name="code" :rules="[{ required: true, message: '请输入验证码!' }]" class="dark:text-gray-200">
          <div class="flex gap-2">
            <a-input v-model:value="formState.code" />
            <a-button
              :loading="sending"
              @click="sendVerificationCode"
              :disabled="countdown > 0"
              class="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            >
              {{ countdown > 0 ? `${countdown}秒后重试` : '发送验证码' }}
            </a-button>
          </div>
        </a-form-item>

        <a-form-item label="新密码" name="newPassword" :rules="[{ required: true, message: '请输入新密码!' }]" class="dark:text-gray-200">
          <a-input-password v-model:value="formState.newPassword" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="default" html-type="submit" class="dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600" :loading="loading">重置密码</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useUserStore } from '~/store/user';
import { useMessage } from '~/hooks/web/useMessage';
import { useRouter } from 'vue-router';

interface FormState {
  email: string;
  code: string;
  newPassword: string;
}

const formState = reactive<FormState>({
  email: '',
  code: '',
  newPassword: '',
});

const loading = ref(false);
const sending = ref(false);
const countdown = ref(0); // 新增倒计时变量
const router = useRouter();
const userStore = useUserStore();
const { notification } = useMessage();

// 发送验证码（新增倒计时逻辑）
const sendVerificationCode = async () => {
  if (countdown.value > 0) return; // 倒计时期间禁止重复发送
  if (!formState.email) {
    message.error('请先输入邮箱');
    return;
  }
  sending.value = true;
  try {
    await userStore.sendVerificationCode({
      email: formState.email,
      type: 'password_reset'
    });
    message.success('验证码已发送至邮箱，有效期5分钟');
    // 启动60秒倒计时
    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) clearInterval(timer);
    }, 1000);
  } finally {
    sending.value = false;
  }
};

// 提交重置密码（补充错误处理）
const onFinish = async (values: FormState) => {
  console.log('🔧 开始密码重置流程...', values);
  loading.value = true;
  try {
    console.log('📤 发送密码重置请求:', {
      email: values.email,
      code: values.code,
      newPassword: '***'
    });

    await userStore.resetPassword({
      email: values.email,
      code: values.code,
      newPassword: values.newPassword
    });

    console.log('✅ 密码重置成功');
    notification.success({
      message: '密码重置成功',
      description: '请使用新密码登录',
      duration: 3
    });
    router.replace('/login');
  } catch (err) {
    console.error('❌ 密码重置失败:', err);
    // 新增：捕获后端返回的错误（如验证码错误）
    notification.error({
      message: '密码重置失败',
      description: err.message || '验证码错误或已过期',
      duration: 3
    });
  } finally {
    loading.value = false;
    console.log('🔚 密码重置流程结束');
  }
};

// 表单验证失败处理
const onFinishFailed = (errorInfo: any) => {
  console.error('表单验证失败:', errorInfo);
  message.error('表单验证失败，请检查输入');
};
</script>
