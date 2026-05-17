-- Align comment table columns with Prisma schema
-- Adds created_at, updated_at, deleted_at to support current code

-- Add created_at
ALTER TABLE `comment`
  ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- Add updated_at
ALTER TABLE `comment`
  ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- Add deleted_at
ALTER TABLE `comment`
  ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- Note: legacy columns (`created_time`, `is_deleted`) are preserved for compatibility.