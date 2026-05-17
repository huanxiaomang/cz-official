-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `github` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `background` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `major` VARCHAR(191) NOT NULL,
    `grade` INTEGER NOT NULL,
    `badge` VARCHAR(191) NULL,
    `score` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `stack` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `members` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `root_parent_id` INTEGER UNSIGNED NULL,
    `created_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `parent_id` INTEGER UNSIGNED NULL,
    `like_count` INTEGER NOT NULL DEFAULT 0,
    `reply_count` INTEGER NOT NULL DEFAULT 0,
    `attachment_count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_like` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `comment_like_comment_id_user_id_key`(`comment_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_attachment` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment_id` INTEGER UNSIGNED NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `file_type` VARCHAR(191) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_like` ADD CONSTRAINT `comment_like_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_like` ADD CONSTRAINT `comment_like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_attachment` ADD CONSTRAINT `comment_attachment_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
