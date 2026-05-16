-- CreateTable
CREATE TABLE `activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `intro` VARCHAR(191) NOT NULL,
    `detail` TEXT NOT NULL,
    `sdate` VARCHAR(191) NOT NULL,
    `edate` VARCHAR(191) NOT NULL,
    `joiners` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
