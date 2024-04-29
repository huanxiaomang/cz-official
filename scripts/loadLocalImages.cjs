const { readdirSync, readFileSync, copyFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { yellow, blueBright } = require("chalk");


const needLoadDir = [
    'course',
    'guide',
    'meetings',
    'other',
    'jx',
]

const imageUrl = resolve(process.cwd(), 'docs/public/images');



const docs_folders = readdirSync(resolve(__dirname, './../docs')).filter((name) => needLoadDir.includes(name));

let images = [];
docs_folders.map((dir) => {
    const mds = readdirSync(resolve(__dirname, `./../docs/${dir}`)).filter((name) => name.includes('.md'));

    mds.map((md) => {
        const content = readFileSync(resolve(__dirname, `./../docs/${dir}/${md}`)).toString();
        // let result = content.match(/(\!\[微信截图_\d+\]\(.*\))|(<img.*src=.*alt.*zoom.*>)/gm);    // [微信截图_xxxxxxx]
        let result = content.match(/(\!\[image-\d+\]\(.*\))|(<img.*src=.*alt.*zoom.*>)/gm);    // [image-xxxxxxx]
        console.log(blueBright('检查 ') + md);
        if (result !== null) {
            result.map((item) => {
                if (!item.includes('./../public/images/')) {
                    images = [...images, item];
                }
            })


            const replacedContent = result.reduce((content, img) => {
                if (img.includes('./../public/images/')) return content;
                // const file_name = img.match(/微信截图_\d+\.[png|jpg]+/gm)[0];    // [微信截图_xxxxxxx]
                const file_name = img.match(/image-\d+\.[png|jpg]+/gm)[0];    // [image-xxxxxxx]

                const newImg = img.replace(/C:.*[png,jpg]+/gm, `./../public/images/${file_name}`);
                content = content.replaceAll(img, newImg);
                return content;
            }, content);
            writeFileSync(resolve(__dirname, `./../docs/${dir}/${md}`), replacedContent);
        }

    })

})

if (images.length === 0) {
    console.log(yellow('没有要处理的image'));
} else {

    handleLocalImages(images);
}





function handleLocalImages(images) {
    let num = 0;
    images.map((img) => {
        const originUrl = img.match(/\w:\\.*\.[png|jpg]+/gm)[0];

        const file_name = originUrl.match(/image-\d+\.[png|jpg]+/gm)[0];

        copyFileSync(originUrl, resolve(imageUrl, file_name));


        num++;

    })
    console.log(yellow('共处理了' + num + '张图片'));
}


