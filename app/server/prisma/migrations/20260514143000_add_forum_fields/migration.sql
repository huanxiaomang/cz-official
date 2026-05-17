ALTER TABLE `comment`
  ADD COLUMN `category` VARCHAR(40) NULL AFTER `title`,
  ADD COLUMN `tags` VARCHAR(255) NULL AFTER `category`,
  ADD COLUMN `quote_id` INT UNSIGNED NULL AFTER `parent_id`,
  ADD COLUMN `is_pinned` TINYINT(1) NOT NULL DEFAULT 0 AFTER `quote_id`,
  ADD COLUMN `is_featured` TINYINT(1) NOT NULL DEFAULT 0 AFTER `is_pinned`;

ALTER TABLE `comment`
  ADD CONSTRAINT `comment_quote_id_fkey`
    FOREIGN KEY (`quote_id`) REFERENCES `comment`(`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
