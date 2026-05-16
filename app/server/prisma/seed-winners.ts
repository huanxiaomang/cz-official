import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清空现有数据
  await prisma.winner.deleteMany()

  // 插入测试数据
  const winners = [
    {
      name: '张三',
      competition: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国一',
      avatar: 'avatar1.jpg'
    },
    {
      name: '李四',
      competition: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国二',
      avatar: 'avatar2.jpg'
    },
    {
      name: '王五',
      competition: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国三',
      avatar: 'avatar3.jpg'
    },
    {
      name: '赵六',
      competition: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '省一',
      avatar: 'avatar4.jpg'
    },
    {
      name: '钱七',
      competition: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '省二',
      avatar: 'avatar5.jpg'
    },
    {
      name: '孙八',
      competition: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国一',
      avatar: 'avatar6.jpg'
    },
    {
      name: '周九',
      competition: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国二',
      avatar: 'avatar7.jpg'
    },
    {
      name: '吴十',
      competition: '蓝桥杯全国软件和信息技术专业人才大赛',
      award: '国三',
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