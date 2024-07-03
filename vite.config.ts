/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import vueJsx from '@vitejs/plugin-vue-jsx';

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

//引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  resolve: {
    alias: {
      '#/': `${path.resolve(__dirname, './types')}/`,
      '~/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
      symbolId: 'icon-[dir]-[name]'
    }),

    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
        vueJsx:vueJsx({})
      },
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
