set -e

echo 正在启动项目

cd dist

echo 正在拉取编译后的代码...


git pull -f https://github.com/huanxiaomang/cz-official.git master:admin-pages

npx http-server .

cd -