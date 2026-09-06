ALTER TABLE `user`
    ADD COLUMN `admission_year` INTEGER NULL,
    ADD COLUMN `member_type` VARCHAR(191) NOT NULL DEFAULT 'STUDENT';

UPDATE `user`
SET `admission_year` = CASE `grade`
    WHEN 1 THEN 2024
    WHEN 2 THEN 2023
    WHEN 3 THEN 2022
    WHEN 4 THEN 2021
    ELSE `admission_year`
END;

UPDATE `user`
SET `member_type` = 'ADVISOR'
WHERE `grade` = 5
  AND `badge` LIKE '%指导教师%';

UPDATE `user`
SET `member_type` = 'GRADUATED'
WHERE `grade` = 5
  AND `member_type` <> 'ADVISOR';
