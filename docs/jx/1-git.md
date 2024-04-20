git流程 本地和远程

**开始参与项目**：本地远程分别创建分支 => 本地拉取主分支代码，然后切换为自己分支

```bash
gitee创建
git branch huanxiaomang
git checkout huanxiaomang

git checkout master
git pull
```

**拉取**：切换主分支 => 拉取 => 与自己分支合并，处理冲突 => 切换回自己分支正常写

**提交**：先上一步拉取，冲突解决 => 提交至自己分支 => 提pr等处理



```bash
git init 初始化
vsc 提交
push 推送
pull 拉取
```



链接远程

```bash
git remote add origin https://gitee.com/huanxiaomang/ww.git
git push -u origin "main"
```







提交

```bash
commit(vsc)
git checkout main
git pull
git checkout 我自己的分支
git merge origin/main
git push origin 自己的
// 提pr
```



push之前要pull最新的过来，处理冲突

如果本地的版本落后于远程的版本，则报错：




```bash
 git config --global user.name "用户名"
```







——————————————————————————————————————————————————

git流程（详细版）

## 	1.创建远程分支

​				1.进入你被邀请的项目，点击左边的 （main）


​				2.点击新建分支

​				3.给分支起个名字

## 	2.下载代码到本地

​				1.点击克隆/下载 ， 将代码下载到本地（复制到终端）


## 	3.创建本地分支

​				1.进入刚下载的文件 ， 右键选择在集成终端中打开

​				2.新建分支

​						终端输入

```bash
git branch //分支名	（分支名尽量和gitee里面起的一样）
```

​				3.切换分支

```bash
git checkout //分支名	（切换到新创建的分支）
```

​				4.提交代码（提交到本地）

​						当修改完一些代码后


​				5.检查是否有冲突

​						1.切换到主分支

```bash
git checkout //主分支		（gitee的主分支）
```

​						2.将最新版本下载到本地

```bash
git pull
```

​									如果没问题了会出现	Already up to date.   如果有问题就接着往下做

​						3.切换到自己的分支

```bash
git checkout 自己的分支
```

​						4.自己的分支与主分支进行比对

```bash
git merge origin/主分支
```

​									如果有问题，就修改一下，修改完后输入

```bash
git add .
```

​									提交

​				6.上传代码

​						提交到自己的分支

```bash
git push origin 自己的分支
```

## 	4.提pr ， （将你的代码提交到主分支）

​				1.进入gitee仓库 ， 点击Pull Request


​				2.点击新建 Pull Request

​				3.将源分支切换为自己的分支

​				4.提交即可

## 小作业


​		作业  ->  两人一组 ，流程走通就算完成 ，也可以自己创建两个号单人完成



























