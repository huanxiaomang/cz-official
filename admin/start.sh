set -e

echo 正在启动项目

cd dist

git init

git remote add origin https://github.com/huanxiaomang/cz-official.git

echo 正在拉取编译后的代码...


git pull -f origin admin-pages

npx http-server . -p 7000

cd -