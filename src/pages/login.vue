<template>
    <div class="login-container">
        <div class="form-container">
            <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
                >
                <a-form-item
                    label="Username"
                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
                >
                    <a-input v-model:value="formState.username" />
                </a-form-item>
            
                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
            
                <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>
            
                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="default" html-type="submit" color="black" :loading="loading">Submit</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive , ref } from 'vue';
import { message } from 'ant-design-vue';

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}

let loading = ref(false)

const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});

const onFinish = (values: any) => {
    console.log('Success:', values);
    const hide = message.loading('Action in progress..', 0);
    setTimeout(hide, 2500);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    const hide = message.loading('Action in progress..', 0);
    setTimeout(hide, 2500);
};
</script>

<style scoped lang="scss">
.login-container{
    width: 100%;    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
    .form-container{
        width:20rem;
        form{
            width: 100%;
        }
    }
}
</style>