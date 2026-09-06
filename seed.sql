USE cz_official;

-- 清空旧测试数据（如果存在）
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `user`;
TRUNCATE TABLE `project`;
TRUNCATE TABLE `winners`;
TRUNCATE TABLE `message`;
TRUNCATE TABLE `activities`;
TRUNCATE TABLE `comment`;
SET FOREIGN_KEY_CHECKS = 1;

-- 插入用户数据 (密码统一为 123456)
INSERT INTO `user` (`user_id`, `username`, `password`, `email`, `role`, `major`, `grade`, `score`, `created_at`, `updated_at`, `description`, `badge`) VALUES
(1, 'admin', '$2b$10$EPmE97034.Wc/T8y2lTXZ.m1E5Z.3nQO2Z1rS/B6M.K2HhV2/n5eK', 'admin@czstudio.tech', 'admin', '软件工程', 2021, 500, NOW(), NOW(), '我是创智工作室管理员', '管理员'),
(2, 'testuser', '$2b$10$EPmE97034.Wc/T8y2lTXZ.m1E5Z.3nQO2Z1rS/B6M.K2HhV2/n5eK', 'test@czstudio.tech', 'user', '计算机科学与技术', 2022, 100, NOW(), NOW(), '热爱编程，热爱开源', '全栈开发'),
(3, 'designer', '$2b$10$EPmE97034.Wc/T8y2lTXZ.m1E5Z.3nQO2Z1rS/B6M.K2HhV2/n5eK', 'design@czstudio.tech', 'user', '数字媒体艺术', 2023, 50, NOW(), NOW(), 'UI/UX 设计师', '视觉设计');

-- 插入项目数据
INSERT INTO `project` (`title`, `content`, `stack`, `members`, `created_at`, `updated_at`) VALUES
('创智官方网站重构', '本项目是对创智工作室官方网站的全面重构，使用 Vue 3 + NestJS + Prisma 进行开发，提升了性能与安全性，并全面适配了黑夜模式。前后端彻底分离，优化了大量 N+1 查询问题。', 'Vue3+NestJS+Prisma+UnoCSS', '1,2,3', NOW(), NOW()),
('基于 AI 的代码审查工具', '利用大语言模型（LLM）自动审查 GitHub PR，提供代码优化建议和漏洞扫描，帮助开发者提高代码质量。', 'React+Python+FastAPI+LLM', '1', DATE_SUB(NOW(), INTERVAL 1 MONTH), NOW()),
('校园二手交易小程序', '为本校学生提供一个安全、便捷的二手物品交易平台，支持在线聊天、图片上传和实名认证。', 'UniApp+SpringBoot+MySQL', '2,3', DATE_SUB(NOW(), INTERVAL 2 MONTH), NOW());

-- 插入蓝桥杯获奖者数据
INSERT INTO `winners` (`name`, `competition`, `award`, `avatar`, `created_at`) VALUES
('张三', '第十五届蓝桥杯', '全国一等奖', '/png/default-avatar-BWUMT8x9.png', NOW()),
('李四', '第十四届蓝桥杯', '省级一等奖', '/png/default-avatar-BWUMT8x9.png', NOW()),
('王五', '第十五届蓝桥杯', '全国二等奖', '/png/default-avatar-BWUMT8x9.png', NOW()),
('赵六', '第十四届蓝桥杯', '省级二等奖', '/png/default-avatar-BWUMT8x9.png', NOW()),
('陈七', '第十三届蓝桥杯', '省级一等奖', '/png/default-avatar-BWUMT8x9.png', NOW());

-- 插入通知数据
INSERT INTO `message` (`title`, `content`, `created_at`, `updated_at`) VALUES
('新版本上线通知', '大家好，我们很高兴地宣布，创智工作室官方网站 V2.0 已经正式上线！全新的界面设计和黑夜模式等待您的体验。感谢开发组同学的辛勤付出。', NOW(), NOW()),
('本周技术分享会', '本周五下午 2:00 将在实训室举行《Vue3 组合式 API 最佳实践》的技术分享，由 admin 主讲，请大家准时参加。', DATE_SUB(NOW(), INTERVAL 2 DAY), NOW()),
('2024 秋季招新正式启动', '创智工作室 2024 年秋季招新现已开启，欢迎对技术充满热情的同学们报名加入！', DATE_SUB(NOW(), INTERVAL 5 DAY), NOW());

-- 插入活动日历数据
INSERT INTO `activities` (`intro`, `detail`, `sdate`, `edate`, `joiners`, `status`, `createdAt`, `updatedAt`) VALUES
('迎新破冰活动', '欢迎2023级新成员加入创智工作室，大家一起交流学习，熟悉环境。', DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 5 DAY), '%Y-%m-%d'), DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 5 DAY), '%Y-%m-%d'), '1,2,3', 1, NOW(), NOW()),
('前端技术集训', '针对 Vue 3 和 TypeScript 的深度集训，为期一周。', DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), '%Y-%m-%d'), '1,2', 1, NOW(), NOW()),
('蓝桥杯赛前动员大会', '梳理蓝桥杯考点，分享历年真题和解题思路。', DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), '%Y-%m-%d'), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), '%Y-%m-%d'), '2,3', 0, NOW(), NOW());

-- 插入几条评论
INSERT INTO `comment` (`content`, `user_id`, `parent_id`, `created_at`, `updated_at`) VALUES
('这个新网站太棒了，黑夜模式看着很舒服！', 2, NULL, NOW(), NOW()),
('期待这周五的技术分享会。', 3, NULL, NOW(), NOW()),
('回复 @testuser: 感谢支持，我们还会继续优化的。', 1, 1, NOW(), NOW());
