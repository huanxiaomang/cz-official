<template>
  <PageWrapper title="项目管理">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          以下为创智工作室所有项目。
        </span>
      </div>
    </template>
    <div v-show="Object.keys(projData).length === 0">
      <p>暂无项目</p>
    </div>
    <Card v-show="Object.keys(projData).length > 0" v-for="p of projData" :key="p.id" :title="p.title" class="mb-6">
      <p>{{p.stack}}</p>
      <p>{{p.content}}</p>
      成员: <CZAvatar v-for="u of p.members.split(',')" :key="u" :userId="u"></CZAvatar>
      <div class="mr-auto w-fit flex gap-2 pt-6">
        <Icon icon="uil:edit" size="22" color="#222" class="ml-auto !block cursor-pointer" @click="handleEdit(p.id)">
        </Icon>
        <Popconfirm title="确定删除此项目吗?‭(ノ_<。) ‬" ok-text="Yes" cancel-text="No" @confirm="handleRemove(p.id)">
          <Icon icon="material-symbols:delete" size="24" color="#222" class="ml-auto !block cursor-pointer">
          </Icon>
        </Popconfirm>

      </div>
    </Card>
    <Modal v-model:open="open" title="编辑项目信息" :confirm-loading="confirmLoading" @ok="handleOk">
      <Form :model="formState" layout="vertical" name="form_in_modal" autocomplete="off"
         class="p-6 mb-5">
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
        <CZAvatar v-for="u of formState.members.split(',').filter((u) => u.trim() !== '')" :key="u" :userId="u">
        </CZAvatar>
        <!---TODO: 添加按钮-->
      </Form>
    </Modal>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { h, onMounted, reactive } from "vue";
import { Tag, Card, Popconfirm, Modal, FormItem, Input, Form, Textarea, Avatar } from "ant-design-vue";
import { PageWrapper } from "@/components/Page";
import CZAvatar from "@/components/cz/CZAvatar.vue";
import { getProjApi, createProjApi, updateProjApi, removeProjApi } from '@/api/sys/project'
import { ref } from "vue";
import Icon from "@/components/Icon/Icon.vue";
import { useMessage } from "@/hooks/web/useMessage";
const { notification, createErrorModal } = useMessage();

let projData = ref({});

onMounted(async() => {
  projData.value = (await getProjApi()).data;
})
const modalText = ref<string>('Content of the modal');
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const editingId = ref<number>();

interface FormState {1
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

const handleOk = async () => {
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
    notification.success({
      message: `已完成(●• ̀ω•́ )✧`,
      description: `修改成功: 项目${formState.title}`,
      duration: 3,
    });
  }, 1000);
  await updateProjApi(editingId.value,formState);
  projData.value = (await getProjApi()).data;


  // formState.content = '';
  // formState.title = '';
  // formState.stack = '';
  // formState.members = '';
  // editingId.value = 0;
}

function handleEdit(id:number) {
  showModal();
  const info = projData.value.find((p) => p.id === id);
  formState.content = info.content;
  formState.title = info.title;
  formState.stack = info.stack;
  formState.members = info.members;
  editingId.value = info.id;
}


async function handleRemove(id) {
  await removeProjApi(id);
  projData.value = (await getProjApi()).data;
  console.log(projData.value);


}

function handleAdd() {

}


</script>
<style lang="less" scoped>

</style>
