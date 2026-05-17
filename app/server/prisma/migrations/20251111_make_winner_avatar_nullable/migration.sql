-- Make winners.avatar nullable to align with Prisma schema and service logic
ALTER TABLE `winners`
  MODIFY `avatar` VARCHAR(100) NULL;