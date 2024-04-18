<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">CZ-Admin </a>
          是一个基于Vue3.0、Vite、 Ant-Design-Vue 、TypeScript、unocss
          的后台解决方案，目标是为管理员提供一个美观、便捷、高效的后台管理系统。
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { h } from "vue";
import { Tag } from "ant-design-vue";
import { PageWrapper } from "@/components/Page";
import {
  Description,
  DescItem,
  useDescription,
} from "@/components/Description";
import { GITHUB_URL, SITE_URL, DOC_URL } from "@/settings/siteSetting";

const { pkg, lastBuildTime } = __APP_INFO__;

const { version } = pkg;

const schema: DescItem[] = [];

const commonTagRender = (color: string) => (curVal) =>
  h(Tag, { color }, () => curVal);
const commonLinkRender = (text: string) => (href) =>
  h("a", { href, target: "_blank" }, text);

const infoSchema: DescItem[] = [
  {
    label: "版本",
    field: "version",
    render: commonTagRender("blue"),
  },
  {
    label: "最后编译时间",
    field: "lastBuildTime",
    render: commonTagRender("blue"),
  },
  {
    label: "作者",
    field: "author",
      render: commonLinkRender("huanxiaomang") ,
  },

  {
    label: "Github",
    field: "github",
    render: commonLinkRender("Github"),
    },
    {
        label: "版权",
        field: "copyright",
        render: commonLinkRender("Copyright © 2023-present 创智工作室"),
    },
];

const infoData = {
  version,
  lastBuildTime,
  doc: DOC_URL,
  preview: SITE_URL,
  github: GITHUB_URL,
};

const members = {
    '项目架构设计 后端接口开发 基础页面开发': 'huanxiaomang',
    '暂未参与': 'hakurei77',
}

Object.keys(members).forEach((key) => {
  schema.push({ field: key, label: key });
});



const [register] = useDescription({
  title: "负责人员",
  data: members,
  schema: schema,
  column:1 ,
});



const [infoRegister] = useDescription({
  title: "项目信息",
  data: infoData,
  schema: infoSchema,
  column: 2,
});
</script>
