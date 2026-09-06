-- 成就条重构：去掉单个 userId 关联与 name 字段，competition 改名为 title，
-- 新增 winner_member 中间表实现「一条成就关联多个成员 + 排序」。

-- 1. 删除旧的单成员外键与列
ALTER TABLE `winners` DROP FOREIGN KEY `winners_user_id_fkey`;
ALTER TABLE `winners` DROP COLUMN `user_id`;

-- 2. 删除 name 字段
ALTER TABLE `winners` DROP COLUMN `name`;

-- 3. competition 改名为 title
ALTER TABLE `winners` CHANGE COLUMN `competition` `title` VARCHAR(100) NOT NULL;

-- 4. 新建多成员关联中间表
CREATE TABLE `winner_member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `winner_id` INTEGER NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `winner_member_winner_id_user_id_key`(`winner_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 5. 外键
ALTER TABLE `winner_member` ADD CONSTRAINT `winner_member_winner_id_fkey` FOREIGN KEY (`winner_id`) REFERENCES `winners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `winner_member` ADD CONSTRAINT `winner_member_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
