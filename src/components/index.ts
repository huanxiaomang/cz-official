import { Component } from 'vue';
import SvgIconG from './SvgIconG/index.vue';
import { SFCWithInstall, withInstall } from '~/utils/withInstall';
//全局组件
export const globalComponents: Record<string, SFCWithInstall<Component>> = {
  'SvgIconG': withInstall(SvgIconG),
}

