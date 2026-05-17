-- Add title to root discussion topics so the comment module can behave like a discussion board
ALTER TABLE `comment`
  ADD COLUMN `title` VARCHAR(120) NULL AFTER `id`;
