<template>
  <div class="container">
    <div class="form-container" pt-10 w-full flex>
      <a-form m-auto w-120 :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="用户名" v-bind="validateInfos.username">
          <a-input v-model:value="modelRef.username" />
        </a-form-item>
        <a-form-item label="年级" v-bind="validateInfos.grade">
          <a-select v-model:value="modelRef.grade" placeholder="请选择您的年级">
            <a-select-option value="1">大一</a-select-option>
            <a-select-option value="2">大二</a-select-option>
            <a-select-option value="3">大三</a-select-option>
            <a-select-option value="4">大四</a-select-option>
            <a-select-option value="5">毕业</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="学习方向" v-bind="validateInfos.major">
          <a-select v-model:value="modelRef.major" placeholder="学习方向">
            <a-select-option value="前端开发">前端开发</a-select-option>
            <a-select-option value="后端开发">后端开发</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="头像" v-bind="validateInfos.avatar">
          <Upload list-type="picture-card" :show-upload-list="false" action="http://1.92.82.236:3000/api/upload/image/"
            :before-upload="beforeUpload" @change="handleAvatarChange">
            <img v-if="modelRef.avatar" :src="modelRef.avatar" alt="avatar" rounded-full />

            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">上传头像</div>
            </div>
          </Upload>
        </a-form-item>
        <a-form-item label="背景图" v-bind="validateInfos.background">
          <Upload list-type="picture-card" :show-upload-list="false" action="http://1.92.82.236:3000/api/upload/image/"
            :before-upload="beforeUpload" @change="handleBgChange">
            <img v-if="modelRef.background" :src="modelRef.background" alt="background" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">上传背景图</div>
            </div>
          </Upload>
        </a-form-item>
        <a-form-item label="个人描述" v-bind="validateInfos.description">
          <a-textarea v-model:value="modelRef.description" :auto-size="{ minRows: 2, maxRows: 5 }" />
        </a-form-item>
        <a-form-item label="github地址" v-bind="validateInfos.github">
          <a-input v-model:value="modelRef.github" />
        </a-form-item>
        <a-form-item m-auto>
          <a-button type="primary" @click.prevent="onSubmit" color="black">确认修改</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref, toRaw } from 'vue';
import { Form, UploadChangeParam, message,Upload} from 'ant-design-vue';
import { useUserStore } from '~/store/user';
import { RegisterParams, UpdateParams, updateUserInfoApi } from '~/api/user';
import { useMessage } from '~/hooks/web/useMessage';
import { update } from 'lodash-es';
import { useRouter } from 'vue-router';
import { getUserInfo } from '~/api/user';
import { getUserInfoById } from '~/api/user';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
const router = useRouter();
const useForm = Form.useForm;

const userInfo = useUserStore().userInfo!;

const modelRef = reactive<Omit<UpdateParams,'password'>>({
  username: userInfo.username,
  grade: userInfo.grade,
  major: userInfo.major,
  avatar: userInfo.avatar || '',
  background: userInfo.background || '',
  badge: userInfo.badge || '',
  description: userInfo.description || '',
  github: userInfo.github || '',
});

function beforeUpload(file: File) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const handleAvatarChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl: string) => {
      const url = info.file.response.result.url;
      modelRef.avatar = url;
      loading.value = false;
    });
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

const handleBgChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl: string) => {
      const url = info.file.response.result.url;
      modelRef.background = url;
      loading.value = false;
    });
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

const loading = ref(false);

const getBase64 = (img: any, callback: (img: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const rulesRef = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
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

      const userInfo = await userStore.updateUserInfo(data);
      if (userInfo) {
        const { notification } = useMessage();
        notification.success({
          message: '修改成功',
          description: 'σ`∀´)σ',
          duration: 3,
        });
        await router.push('/');
        router.go(0);

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

<style lang="scss" scoped>
.ant-upload{
  width: 500px;
}
</style>
