<template>
    <PageWrapper title="项目管理">
        <template #headerContent>
            <div>
                <div class="mb-7">
                    (•ิ_•ิ)👇 以下为创智工作室所有项目。
                </div>
                <Button type="primary" @click="handleAdd" class="flex items-center">
                    <Icon icon="material-symbols:add" size="20" color="#fff" class="mx-[-.4rem]">
                    </Icon>
                    添加项目
                </Button>

            </div>
        </template>
        <div v-show="Object.keys(projData).length === 0">
            <p>暂无项目</p>
        </div>
        <transition-group name="list" tag="ul">

            <Card v-show="Object.keys(projData).length > 0" v-for="p of showProjData" :key="p.id" :title="p.title"
                class="mb-6">
                <p>{{p.stack}}</p>
                <p>{{p.content}}</p>
                <span class="font-bold">成员</span>:
                <CZAvatar v-for="u of p.members.split(',')" :key="u" :userId="u"></CZAvatar>
                <div class="text-sm text-gray-600 pt-5">{{ p.updatedAt.replace('T', ' ').replace('Z', ' ') }}</div>
                <div class="mr-auto w-fit flex gap-2 pt-3">
                    <Icon icon="uil:edit" size="22"
                        class="ml-auto !block cursor-pointer text-blue-700/80 hover:text-blue-700/100 transition-all ease-in-out"
                        @click="handleEdit(p.id)">
                    </Icon>
                    <Popconfirm title="确定删除此项目吗?‭(ノ_<。) ‬" ok-text="Yes" cancel-text="No" @confirm="handleRemove(p.id)">
                        <Icon icon="material-symbols:delete" size="24"
                            class="ml-auto !block cursor-pointer text-blue-700/80 hover:text-blue-700/100 transition-all ease-in-out">
                        </Icon>
                    </Popconfirm>

                </div>
            </Card>
        </transition-group>

        <Modal v-model:open="open" title="编辑项目信息" :confirm-loading="confirmLoading" @ok="handleOk">
            <Form :model="formState" layout="vertical" name="form_in_modal" autocomplete="off" class="p-6 mb-5"
                ref="formRef">
                <FormItem label="标题" name="title" :rules="[{ required: true, message: '请填写标题!' }]">
                    <Input v-model:value="formState.title" />
                </FormItem>

                <FormItem label="技术栈" name="stack" :rules="[{ required: true, message: '请填写技术栈' }]">
                    <Input v-model:value="formState.stack" />
                </FormItem>

                <FormItem label="描述" name="content" :rules="[{ required: true, message: '请填写描述' }]">
                    <Textarea v-model:value="formState.content" class="textarea" />
                </FormItem>

                <FormItem label="成员 (填写成员id, 以 ',' 分隔)" name="stack" :rules="[{ required: true, message: '请填写成员' }]">
                    <Input v-model:value="formState.members" />
                </FormItem>
                <transition-group name="members" tag="ul">
                    <CZAvatar v-for="u of formState.members.split(',').filter((u) => u.trim() !== '')" :key="u"
                        :userId="u">
                    </CZAvatar>
                    <AddMemberBtn :filter-id="formState.members.split(',').filter((u) => u.trim() !== '')">
                    </AddMemberBtn>
                </transition-group>
            </Form>

        </Modal>
    </PageWrapper>
</template>
<script lang="ts" setup>
import {  computed, onMounted, reactive } from "vue";
import { Card, Popconfirm, Modal, FormItem, Input, Form, Textarea, Button } from "ant-design-vue";
import { PageWrapper } from "@/components/Page";
import CZAvatar from "@/components/cz/CZAvatar.vue";
import AddMemberBtn from "@/components/cz/AddMemberBtn.vue";
import { getProjApi, createProjApi, updateProjApi, removeProjApi } from '@/api/sys/project'
import { ref } from "vue";
import Icon from "@/components/Icon/Icon.vue";
import { useMessage } from "@/hooks/web/useMessage";
import { sortByUpdate } from "@/utils/sortByUpdate";
const { notification, createErrorModal } = useMessage();

let projData = ref([]);
let showProjData = computed(() => sortByUpdate(projData.value));



onMounted(async() => {
    projData.value = (await getProjApi()).data;
    
    
})
const modalText = ref<string>('Content of the modal');
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const editingId = ref<number>();
const formRef = ref();
interface FormState {
  title: string;
  content: string;
  stack: string;
  members: string;
}

const formState = reactive<FormState>({
  title: '',
  content: '',
  stack: '',
  members: '',
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
                    description: `修改成功: 项目${formState.title}`,
                    duration: 3,
                });
            }, 200); // 加钱提速
            await updateProjApi(editingId.value, formState);
            projData.value = (await getProjApi()).data;
        } else {
            confirmLoading.value = true;
            setTimeout(() => {
                open.value = false;
                confirmLoading.value = false;
                notification.success({
                    message: `已完成(●• ̀ω•́ )✧`,
                    description: `添加成功: 项目${formState.title}`,
                    duration: 3,
                });
            }, 200); // 加钱提速
            await createProjApi(formState);
            projData.value = (await getProjApi()).data;
        }

    }

}

function handleEdit(id: number) {
    const info = projData.value.find((p) => p.id === id);
    formState.content = info.content;
    formState.title = info.title;
    formState.stack = info.stack;
    formState.members = info.members;
    editingId.value = info.id;
    isEditingNotAdd = true;

  showModal();
}


async function handleRemove(id) {
  const proj = (await removeProjApi(id)).data;
    projData.value = (await getProjApi()).data;
  
    notification.success({
        message: `已删除 (,,•́ . •̀,,) `,
        description: `${proj.title} 再也没有了`,
        duration: 3,
    });

}

function handleAdd() {
    isEditingNotAdd = false;
    formState.content = '';
    formState.title = '';
    formState.stack = '';
    formState.members = '';
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



.members-enter-from,
.members-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.members-enter-active,
.members-leave-active {
    transition: all .5s ease-in-out;
}

.members-leave-active {
    position: absolute;
}

.members-move {
    transition: transform .5s ease-in-out;
}

</style>
