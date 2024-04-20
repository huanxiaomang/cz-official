<template>
    <PageWrapper title="通知管理">
        <template #headerContent>
            <div>
                <div class="mb-7">
                    (•ิ_•ิ)👇 可以在这里发布、编辑、删除通知。
                </div>
                <Button type="primary" @click="handleAdd" class="flex items-center">
                    <Icon icon="material-symbols:add" size="20" color="#fff" class="mx-[-.4rem]">
                    </Icon>
                    添加通知
                </Button>

            </div>
        </template>
        <div v-show="Object.keys(msgData).length === 0">
            <p>暂无通知</p>
        </div>
        <transition-group name="list" tag="ul">
            <Card v-show="Object.keys(msgData).length > 0" v-for="p of showMsgData" :key="p.id" :title="p.title"
                class="mb-6">
                <p>{{ p.content }}</p>
                <div class="text-sm text-gray-600 pt-5">{{ p.updatedAt.replace('T', ' ').replace('Z', ' ') }}</div>
                <div class="mr-auto w-fit flex gap-2 pt-3">
                    <Icon icon="uil:edit" size="22"
                        class="ml-auto !block cursor-pointer text-blue-700/80 hover:text-blue-700/100 transition-all ease-in-out"
                        @click="handleEdit(p.id)">
                    </Icon>
                    <Popconfirm title="确定删除此通知吗?‭(ノ_<。) ‬" ok-text="Yes" cancel-text="No" @confirm="handleRemove(p.id)">
                        <Icon icon="material-symbols:delete" size="24"
                            class="ml-auto !block cursor-pointer text-blue-700/80 hover:text-blue-700/100 transition-all ease-in-out">
                        </Icon>
                    </Popconfirm>

                </div>
            </Card>
        </transition-group>
        <Modal v-model:open="open" title="编辑通知信息" :confirm-loading="confirmLoading" @ok="handleOk">
            <Form :model="formState" layout="vertical" name="form_in_modal" autocomplete="off" class="p-6 mb-5"
                ref="formRef">
                <FormItem label="标题" name="title" :rules="[{ required: true, message: '请填写标题!' }]">
                    <Input v-model:value="formState.title" />
                </FormItem>

                <FormItem label="内容" name="content" :rules="[{ required: true, message: '请填写内容' }]">
                    <Textarea v-model:value="formState.content" class="textarea" />
                </FormItem>


            </Form>
        </Modal>
    </PageWrapper>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import { Card, Popconfirm, Modal, FormItem, Input, Form, Textarea, Button } from "ant-design-vue";
import { PageWrapper } from "@/components/Page";
import { createMsgApi,getMsgApi,removeMsgApi,updateMsgApi } from '@/api/sys/message'
import { ref } from "vue";
import Icon from "@/components/Icon/Icon.vue";
import { useMessage } from "@/hooks/web/useMessage";
import { sortByUpdate } from "@/utils/sortByUpdate";
const { notification, createErrorModal } = useMessage();

let msgData = ref([]);
let showMsgData = computed(() => sortByUpdate(msgData.value));



onMounted(async () => {
    msgData.value = (await getMsgApi()).data;
    

})
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const editingId = ref<number>();
const formRef = ref();
interface FormState {
    title: string;
    content: string;
}

const formState = reactive<FormState>({
    title: '',
    content: '',
});

const showModal = () => {
    open.value = true;
};

let isEditingNotAdd = true;
const handleOk = async () => {
    formRef.value
        .validate()
        .then(() => {
            handleSubmit();
        })
        .catch(error => {
            console.log('error', error);
            const error_first = error.errorFields[0];
            notification.error({
                message: `验证错误！`,
                description: `${error_first.name[0]}: ${error_first.errors[0]}`,
                duration: 3,
            });
            return;
        });
    async function handleSubmit() {
        if (isEditingNotAdd) {
            confirmLoading.value = true;
            setTimeout(() => {
                open.value = false;
                confirmLoading.value = false;
                notification.success({
                    message: `已完成(●• ̀ω•́ )✧`,
                    description: `修改成功: 通知${formState.title}`,
                    duration: 3,
                });
            }, 200); // 加钱提速
            editingId.value && await updateMsgApi(editingId.value, formState);
            msgData.value = (await getMsgApi()).data;
        } else {
            confirmLoading.value = true;
            setTimeout(() => {
                open.value = false;
                confirmLoading.value = false;
                notification.success({
                    message: `已完成(●• ̀ω•́ )✧`,
                    description: `添加成功: 通知${formState.title}`,
                    duration: 3,
                });
            }, 200); // 加钱提速
            await createMsgApi(formState);
            msgData.value = (await getMsgApi()).data;
        }

    }

}

function handleEdit(id: number) {
    const info = msgData.value.find((p) => p.id === id);
    formState.content = info.content;
    formState.title = info.title;
    editingId.value = info.id;
    isEditingNotAdd = true;

    showModal();
}


async function handleRemove(id) {
    const msg = (await removeMsgApi(id)).data;
    msgData.value = (await getMsgApi()).data;

    notification.success({
        message: `已删除 (,,•́ . •̀,,) `,
        description: `${msg.title} 再也没有了`,
        duration: 3,
    });

}

function handleAdd() {
    isEditingNotAdd = false;
    formState.content = '';
    formState.title = '';
    showModal();
}


</script>
<style lang="less" scoped>
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-enter-active,
.list-leave-active {
    transition: all .5s ease-in-out;
}

.list-leave-active {
    position: absolute;
}

.list-move {
    transition: transform .5s ease-in-out;
}
</style>
