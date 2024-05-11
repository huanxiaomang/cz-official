<template>
    <div class="login-container">
        <div class="form-container">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="请输入您的用户名" v-bind="validateInfos.name">
                    <a-input v-model:value="modelRef.name" />
                </a-form-item>
                <a-form-item label="请输入您的邮箱" v-bind="validateInfos.name">
                    <a-input v-model:value="modelRef.name" />
                </a-form-item>
                <a-form-item label="请输入您的密码" v-bind="validateInfos.name">
                    <a-input v-model:value="modelRef.name" />
                </a-form-item>
                <a-form-item label="二次确认您的密码" v-bind="validateInfos.name">
                    <a-input v-model:value="modelRef.name" />
                </a-form-item>
                <a-form-item label="请选择您的年级" v-bind="validateInfos.region">
                    <a-select v-model:value="modelRef.region" placeholder="请选择您的年纪">
                        <a-select-option value="1">大一</a-select-option>
                        <a-select-option value="2">大二</a-select-option>
                        <a-select-option value="3">大三</a-select-option>
                        <a-select-option value="4">大四</a-select-option>
                        <a-select-option value="5">毕业啦</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="请选择您的学习方向" v-bind="validateInfos.type">
                    <a-checkbox-group v-model:value="modelRef.type">
                        <a-checkbox value="fe" name="type">前端</a-checkbox>
                        <a-checkbox value="be" name="type">后端</a-checkbox>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click.prevent="onSubmit" color="black">Create</a-button>
                    <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;

const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const modelRef = reactive({
  name: '',
  region: undefined,
  type: [],
});
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: 'Please input name',
    },
  ],
  region: [
    {
      required: true,
      message: 'Please select region',
    },
  ],
  type: [
    {
      required: true,
      message: 'Please select type',
      type: 'array',
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
});
const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef));
    })
    .catch(err => {
      console.log('error', err);
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