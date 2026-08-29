import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清空现有数据
  await prisma.winner.deleteMany()

  // 插入测试数据
  const winners = [
    {
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国一',
      category: 'COMPETITION',
      avatar: 'avatar1.jpg'
    },
    {
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国二',
      category: 'COMPETITION',
      avatar: 'avatar2.jpg'
    },
    {
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国三',
      category: 'COMPETITION',
      avatar: 'avatar3.jpg'
    },
    {
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '省一',
      category: 'COMPETITION',
      avatar: 'avatar4.jpg'
    },
    {
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '省二',
      category: 'COMPETITION',
      avatar: 'avatar5.jpg'
    },
    {
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国一',
      category: 'COMPETITION',
      avatar: 'avatar6.jpg'
    },
    {
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国二',
      category: 'COMPETITION',
      avatar: 'avatar7.jpg'
    },
    {
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国三',
      category: 'COMPETITION',
      avatar: 'avatar8.jpg'
    }
  ]

  for (const winner of winners) {
    await prisma.winner.create({
      data: winner
    })
  }

  console.log('获奖者测试数据插入完成')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 