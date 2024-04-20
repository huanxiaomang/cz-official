
#!/bin/bash
set -e

echo 正在编译项目
pnpm build:docs

echo 正在启动项目

cd docs/.vitepress/dist

npx http-server . -p 7001

cd -