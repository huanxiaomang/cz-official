<template>
    <PageWrapper title="成员管理">
        <template #headerContent>
            <div>
                <div class="mb-3">
                    支持查看成员信息、修改成员权限。
                </div>
                筛选成员: <Select v-model:value="selectedRole" class="ml-3 w-35">
                    <SelectOption value="ALL">所有成员</SelectOption>
                    <SelectOption value="ADMIN">创智管理员</SelectOption>
                    <SelectOption value="CZ_MEMBER">创智成员</SelectOption>
                    <SelectOption value="COMMON">普通用户</SelectOption>
                </Select>
            </div>
        </template>
        <Card v-for="m of filterMembers" :key="m.userId" class="mb-6">
            <div class="flex items-center justify-between md:flex-row flex-col gap-5">
                <span class="flex items-center">
                    <CZAvatar :userId="m.userId"></CZAvatar>
                    <span class="ml-6 text-lg cursor-pointer" :class="colorList[m.userId]"
                        @click="showUserModal(m)">{{ m.username }}</span>
                </span>

                <span class="md:inline hidden">{{ m.createdAt.replace('T', ' ').replace('Z', '')}}</span>
                <Select v-model:value="roles[m.userId]" class="w-35" @change="handleChange(Number(m.userId))">
                    <SelectOptGroup>
                        <template #label>
                            <span>
                                <Icon icon="tdesign:member" size="12">
                                </Icon>
                                Member
                            </span>
                        </template>
                        <SelectOption value="ADMIN" >创智管理员</SelectOption>
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
import { computed, onMounted, ref, watchEffect } from "vue";
import { GetUserInfoModel } from "@/api/sys/model/userModel";
import { sortByUpdate } from "@/utils/sortByUpdate";
import { getAllUser, setUserRole } from "@/api/sys/user";
import CZAvatar from "@/components/cz/CZAvatar.vue";
import Icon from "@/components/Icon/Icon.vue";
import { getUsernameClassByRole } from "@/utils/getUsernameClass";
import showUserModal from '@/components/cz/UserModal';

let members = ref<GetUserInfoModel[]>([]);
const roles = ref({});
const colorList = ref({});
const selectedRole = ref<'ADMIN' | 'CZ_MEMBER' | 'COMMON' | 'ALL'>('ALL');
let filterMembers = computed<GetUserInfoModel[]>(() => {
    if (selectedRole.value === 'ALL') {
        return members.value;
    } else {
        return members.value.filter(m => m.role === selectedRole.value);
    }
});


function updateClassList() {
    colorList.value = members.value.reduce((obj, { userId, role }) => {
        obj[userId] = getUsernameClassByRole(role);
        return obj;
    }, {});
}

onMounted(async() => {
    members.value = await getAllUser();
    roles.value = members.value.reduce((obj, { userId, role }) => {
        obj[userId] = role;
        return obj;
    }, {});
    updateClassList();

})




const handleChange = async (userId: number) => {
    
    const user = await setUserRole(userId, roles.value[userId]);
    colorList.value[userId] = getUsernameClassByRole(user.role);
};

</script>
