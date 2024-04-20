set -e

echo 开始构建

pnpm build

cd dist

echo 正在上传服务器...

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/huanxiaomang/cz-official.git master:admin-pages

cd -