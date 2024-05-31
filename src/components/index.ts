import { Component } from 'vue';
import SvgIconG from './SvgIconG/index.vue';
import { SFCWithInstall, withInstall } from '~/utils/components';
// 全局组件
const components: Component[] = [
   SvgIconG,
]

export const globalComponents: SFCWithInstall<Component>[] =
  components.map((c) => withInstall(c));
