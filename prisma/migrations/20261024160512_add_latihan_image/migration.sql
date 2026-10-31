-- AlterTable
ALTER TABLE `categories` ADD COLUMN `image` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `image` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `latihan_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `images` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
