
#!/bin/bash
set -e

# 检查当前目录是否存在dist文件夹
if [ -d "dist" ]; then
    # 如果存在，则删除dist文件夹及其内容
    rm -r dist
fi

# 创建dist文件夹
mkdir dist

echo 正在启动项目

cd dist

git init

git remote add origin https://github.com/huanxiaomang/cz-official.git

echo 正在拉取编译后的代码...


git pull -f origin admin-pages

npx http-server . -p 7000

cd -