/*
  Warnings:

  - You are about to drop the `checkin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `checkin` DROP FOREIGN KEY `CheckIn_gym_id_fkey`;

-- DropForeignKey
ALTER TABLE `checkin` DROP FOREIGN KEY `CheckIn_user_id_fkey`;

-- DropTable
DROP TABLE `checkin`;

-- CreateTable
CREATE TABLE `checkins` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `validated_at` DATETIME(3) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `gym_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checkins` ADD CONSTRAINT `checkins_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkins` ADD CONSTRAINT `checkins_gym_id_fkey` FOREIGN KEY (`gym_id`) REFERENCES `gyms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
