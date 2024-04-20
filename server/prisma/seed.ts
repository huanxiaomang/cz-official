import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { Random } from 'mockjs'


const prisma = new PrismaClient()
async function run() {
  await prisma.user.create({
    data: {
      username: 'huanxiaomang',
      role: 'ADMIN',
      password: await hash('123456'),
      email: 'asdasd@123.com',
          avatar: 'https://s21.ax1x.com/2024/04/18/pFz7N6O.png',
      github: 'https://github.com/huanxiaomang',
          background: 'https://s21.ax1x.com/2024/04/18/pFzIWnJ.png',
          description: Random.cparagraph(30, 50),
          major: '软件工程',
          grade: 2,
          badge: '蓝桥杯国三,创智开发者',
      
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
          description: Random.cparagraph(30, 50),
          major: '软件工程',
          grade: 2,
          badge: '蓝桥杯省二,创智开发者',
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
