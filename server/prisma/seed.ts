import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { Random } from 'mockjs'


const prisma = new PrismaClient()
async function run() {
  await prisma.user.create({
    data: {
      username: 'admin11',
      role: 'CZ_MEMBER',
      password: await hash('admin888'),
      email: 'asdasd@123.com',
      avatar: 'https://i1.hdslb.com/bfs/face/6bc5d59334e3430ebc019d4fecd463e4df028e8c.jpg@240w_240h_1c_1s_!web-avatar-nav.avif',
      github: 'https://github.com/huanxiaomang',
      background: 'https://i1.hdslb.com/bfs/face/6bc5d59334e3430ebc019d4fecd463e4df028e8c.jpg@240w_240h_1c_1s_!web-avatar-nav.avif',
      description: Random.cparagraph(30, 50)
    },
  })
  await prisma.user.create({
    data: {
      username: 'COMMON',
      role: 'COMMON',
      password: await hash('123456'),
      email: 'as32323d@123.com',
      avatar: 'https://i1.hdslb.com/bfs/face/6bc5d59334e3430ebc019d4fecd463e4df028e8c.jpg@240w_240h_1c_1s_!web-avatar-nav.avif',
      github: 'https://github.com/huanxiaomang',
      background: 'https://i1.hdslb.com/bfs/face/6bc5d59334e3430ebc019d4fecd463e4df028e8c.jpg@240w_240h_1c_1s_!web-avatar-nav.avif',
      description: Random.cparagraph(30, 50)
    },
  })

  for (let i = 1; i <= 5; i++) {
    await prisma.project.create({
      data: {
        title: Random.ctitle(3, 6),
        stack: 'v3+ts+vite',
        content: Random.cparagraph(30, 50),
        members: `1,2`
      },
    })
  }

  for (let i = 0; i < 50; i++) {
    await prisma.message.create({
      data: {
        title: Random.ctitle(10, 30),
        content: Random.cparagraph(30, 50),
      },
    })
  }
}

run()
