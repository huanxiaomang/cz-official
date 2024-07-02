import { defineConfig } from "vitepress";

function getLocation() {
    return window.location;
}


// https://vitepress.dev/reference/site-config
const Theme = defineConfig({
    title: "CZ-docs",
    description: "创智学习资源库",
    lastUpdated: true,
    head: [['link', { rel: 'icon', href: '/idle.ico' }]],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "首页", link: "/" },
            { text: "我的项目", link: "/course/my/我的项目" },
            {
                text: '参与开发',
                items: [
                    {
                        text: '核心成员',
                        items: [
                            { text: 'Huanxiaomang', link: 'https://github.com/huanxiaomang' },
                            { text: 'hakurei77', link: 'https://blog.csdn.net/m0_53785610' },
                        ]
                    },
                    {
                        text: '关于',
                        items: [{ text: '创智工作室', link: 'https://github.com/huanxiaomang' }]
                    }
                ]
            },

        ],
        logo: "../icon.svg",
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        sidebar: [
            // {
            //     text: "指南",
            //     base: "/guide/",
            //     items: [{ text: "前端速通指南", link: "前端速通指南" }],
            // },
            {
                text: "教程",
                base: "/course/",
                items: [

                    // { text: '前置-Node', link: '前置-Node' },
                    // { text: '前置-前后端分离', link: '前置-前后端分离' },
                    // { text: '教学大纲', link: '教学大纲' },
                    // { text: '1- introduction', link: '1-introduction' },
                    { text: '1- HTML&CSS', link: '2-HTML+CSS' },
                    { text: '2- JS数组与对象', link: '3-JS-Array-Object' },
                    // { text: '4- JS cases', link: '4-JS-cases' },
                    // { text: '5- DOM&BOM', link: '5-DOM+BOM' },
                    // { text: '6- Axios-JSON-Promise', link: '6-Axios-JSON-Promise' },
                    // {
                    //     text: '7- skills&program design',
                    //     link: '7-skills+program-design'
                    // },
                  { text: '3- vue3基础语法', link: '3-vue3语法' },
                ],
          },

          {
            text: "JS重难点",
            base: "/course/",
            items: [
              { text: '1- 上下文、作用域链、闭包', link: 'bi' },
              { text: '2- 数组全部知识点总结', link: 'array' },
              { text: '3- Number全部知识点+面试题', link: 'number' },

            ],
          },
          {
            text: "面试",
            base: "/course/",
            items: [
              { text: '1- JS中4种相等比较算法', link: '相等' },
              { text: '2- HTTP常见状态码', link: 'http' },

            ],
          },

            // {
            //     text: "绩效项目实战",
            //     base: "/jx/",
            //     items: [

            //         { text: '0- 目标', link: '0-目标' },
            //         { text: '1- git标准流程(大厂)', link: '1-git' },
            //         { text: '2- typescript', link: '2-typescript入门' },
            //         { text: '3- vue3语法', link: '3-vue3语法' },
            //         { text: '4- vue-router', link: '4-vue-router' },
            //         { text: '5- elementUI', link: '5-elementUI' },
            //         { text: '6- Promise-axios', link: '6-Promise-axios' },
            //         { text: '7- node-express', link: '7-node-express' },
            //         { text: '8- pinia', link: '8-pinia' },
            //         { text: '9- nodeJWT', link: '9-nodeJWT' },
            //         { text: '10- node中间层', link: '10-node中间层' },

            //     ],
            // },

            {
                text: "其他",
                base: "/other/",
                items: [{ text: "学习笔记", link: "我收集的一些js例子" },
                { text: "常见问题", link: "新手常见问题篇" },

                ],
            },
        ],

        socialLinks: [{ icon: "github", link: "https://github.com/huanxiaomang" }],

        outline: [2, 3],

        footer: {
            message: 'Released under the MIT License.',
            copyright:
                'Copyright © 2023-present <a href="http://1.92.82.236:7001/">创智工作室</a>'
        },
        editLink: {
            pattern: 'https://github.com/huanxiaomang',
            text: `作者：Huanxiaomang`
        },



        lastUpdated: {
            text: '本页更新时间',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        search: {
            provider: 'local',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换'
                                }
                            }
                        }
                    }
                }
            }
        },
    },
});


export default {
    ...Theme,
    markdown: {
        theme: { light: 'github-light', dark: 'material-theme-palenight' }
    },
    enhanceApp({ app }) {
        console.log(app);

        const img = document.createElement('img');
        img.src = './../public/images/image-20230124163000837.png';
        img.style.position = 'fixed';
        img.style.bottom = '20px';
        img.style.right = '20px';
        img.style.width = '100px'; // 设置图片宽度，根据需求调整
        img.style.height = 'auto'; // 设置图片高度，根据需求调整
        document.body.appendChild(img);
    }
    // setup() {

    //     //看板娘
    //     useLive2d({
    //         enable: true,
    //         model: {
    //             url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hibiki/hibiki.model.json'
    //         },
    //         display: {
    //             position: 'right',
    //             width: '135px',
    //             height: '300px',
    //             xOffset: '35px',
    //             yOffset: '5px'
    //         },
    //         mobile: {
    //             show: true
    //         },
    //         react: {
    //             opacity: 0.8
    //         }
    //     })

    // }

}
