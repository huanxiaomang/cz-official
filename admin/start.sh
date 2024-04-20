
#!/bin/bash
set -e

# 检查当前目录是否存在 dist 目录
if [ -d "dist" ]; then
    # 如果存在，则清空其中的内容
    rm -rf dist/*
else
    # 如果不存在，则创建该目录
    mkdir dist
fi

echo 正在启动项目

cd dist

git init

git remote add origin https://github.com/huanxiaomang/cz-official.git

echo 正在拉取编译后的代码...


git pull -f origin admin-pages

npx http-server . -p 7000

cd -