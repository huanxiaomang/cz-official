<template>
    <PageWrapper title="成员管理">
        <template #headerContent>
            <div>
                <div class="mb-3">
                    支持查看成员信息、修改成员权限。
                </div>

            </div>
        </template>
        <Card v-for="m of members" :key="m.userId" class="mb-6">
            <div class="flex items-center">
                <CZAvatar :userId="m.userId"></CZAvatar>
                <span class="ml-6 text-lg" :class="getClass(m.role) ">{{ m.username }}</span>
                <Select v-model:value="m.role" class="ml-auto w-35" @change="handleChange">
                    <SelectOptGroup>
                        <template #label>
                            <span>
                                <Icon icon="tdesign:member" size="12">
                                </Icon>
                                Member
                            </span>
                        </template>
                        <SelectOption value="ADMIN">创智管理员</SelectOption>
                        <SelectOption value="CZ_MEMBER">创智成员</SelectOption>
                    </SelectOptGroup>
                    <SelectOptGroup>
                        <template #label>
                            <span>
                                Common
                            </span>
                        </template>
                        <SelectOption value="COMMON">普通用户</SelectOption>
                    </SelectOptGroup>
                </Select>
            </div>
        </Card>
    </PageWrapper>
</template>

<script setup lang='ts'>
import { Card,Button,Select,SelectOption,SelectOptGroup } from "ant-design-vue";
import { PageWrapper } from "@/components/Page";
import { computed, onMounted, ref } from "vue";
import { GetUserInfoModel } from "@/api/sys/model/userModel";
import { sortByUpdate } from "@/utils/sortByUpdate";
import { getAllUser } from "@/api/sys/user";
import CZAvatar from "@/components/cz/CZAvatar.vue";
import Icon from "@/components/Icon/Icon.vue";

let members = ref<GetUserInfoModel[]>([]);

onMounted(async() => {
    members.value = await getAllUser();
})

function getClass(role: string) {
    if (role === 'ADMIN') {
        return 'text-red-500';
    } else if (role === 'CZ_MEMBER') {
        return 'text-blue-500';
    }  else {
        return 'text-gray-500';
    }
}



const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const value = ref(['lucy']);
</script>
