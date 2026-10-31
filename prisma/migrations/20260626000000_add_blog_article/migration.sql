-- CreateTable
CREATE TABLE `blog_articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(200) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `excerpt` VARCHAR(500) NOT NULL,
    `content` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `tags` VARCHAR(500) NOT NULL,
    `readingTime` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `blog_articles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
