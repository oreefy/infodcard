-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `ads` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `plan` ENUM('FREE', 'PREMIUM', 'BUSINESS') NOT NULL DEFAULT 'FREE',
    `profileLength` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_unique_key`(`unique`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `percentage` INTEGER NOT NULL DEFAULT 35,
    `partner` INTEGER NOT NULL DEFAULT 15,
    `client` INTEGER NOT NULL DEFAULT 20,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `global` BOOLEAN NOT NULL DEFAULT false,
    `custom` BOOLEAN NOT NULL DEFAULT false,
    `authorUnique` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Coupon_unique_key`(`unique`),
    UNIQUE INDEX `Coupon_authorUnique_key`(`authorUnique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `status` ENUM('Pending', 'Processing', 'Shipping', 'Delivered', 'Rejected', 'Hold', 'Canceled') NOT NULL DEFAULT 'Pending',
    `invoice` VARCHAR(191) NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `design` VARCHAR(191) NULL,
    `front` VARCHAR(191) NULL,
    `back` VARCHAR(191) NULL,
    `amount` INTEGER NOT NULL,
    `accountNumber` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `screenshot` VARCHAR(191) NOT NULL DEFAULT '/default/screenshot.png',
    `trxID` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,
    `couponName` VARCHAR(191) NULL,
    `couponPercentage` INTEGER NOT NULL DEFAULT 0,
    `couponPartner` INTEGER NOT NULL DEFAULT 0,
    `couponClient` INTEGER NOT NULL DEFAULT 0,
    `couponProviderUnique` VARCHAR(191) NULL,
    `authorUnique` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Order_unique_key`(`unique`),
    UNIQUE INDEX `Order_invoice_key`(`invoice`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `accountNumber` VARCHAR(191) NOT NULL,
    `plan` ENUM('FREE', 'PREMIUM', 'BUSINESS') NOT NULL DEFAULT 'FREE',
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `extend` BOOLEAN NOT NULL DEFAULT false,
    `amount` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `screenshot` VARCHAR(191) NOT NULL DEFAULT '/default/screenshot.png',
    `product` VARCHAR(191) NULL,
    `trxID` VARCHAR(191) NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    `invoice` VARCHAR(191) NOT NULL,
    `couponName` VARCHAR(191) NULL,
    `couponPercentage` INTEGER NOT NULL DEFAULT 0,
    `couponPartner` INTEGER NOT NULL DEFAULT 0,
    `couponClient` INTEGER NOT NULL DEFAULT 0,
    `couponProviderUnique` VARCHAR(191) NULL,
    `authorUnique` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Transaction_unique_key`(`unique`),
    UNIQUE INDEX `Transaction_invoice_key`(`invoice`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Withdraw` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    `method` VARCHAR(191) NOT NULL,
    `account` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `authorUnique` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Withdraw_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Contact_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminMessages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `authorUnique` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AdminMessages_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `authorUnique` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Message_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `visitor` INTEGER NOT NULL DEFAULT 0,
    `cover` VARCHAR(191) NOT NULL DEFAULT '/default/cover.png',
    `avatar` VARCHAR(191) NOT NULL DEFAULT '/default/profile.png',
    `youtube` VARCHAR(191) NULL,
    `delete` BOOLEAN NOT NULL DEFAULT false,
    `website` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `companyphone` VARCHAR(191) NULL,
    `companyemail` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `corporate` VARCHAR(191) NULL,
    `branch` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `groupName` VARCHAR(191) NULL,
    `profession` VARCHAR(191) NULL,
    `qr` LONGTEXT NOT NULL DEFAULT '/default/qr.gif',
    `authorUnique` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Profile_unique_key`(`unique`),
    UNIQUE INDEX `Profile_link_key`(`link`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `value` VARCHAR(191) NULL,
    `profileUnique` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GroupItem_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Social` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `type` BOOLEAN NOT NULL DEFAULT true,
    `logo` VARCHAR(191) NOT NULL DEFAULT 'bi bi-circle',
    `link` VARCHAR(191) NOT NULL DEFAULT '/',
    `title` VARCHAR(191) NOT NULL DEFAULT 'Unknown',
    `authorUnique` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Social_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/default/product.png',
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `authorUnique` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/default/service.png',
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `authorUnique` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Service_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Albums` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `authorUnique` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Albums_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LocalBank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL DEFAULT '/default/bank.png',
    `bank` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `authorUnique` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LocalBank_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MobileBank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL DEFAULT '/default/bank.png',
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'Personal',
    `number` VARCHAR(191) NOT NULL,
    `authorUnique` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MobileBank_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GlobalBank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL DEFAULT '/default/bank.png',
    `bank` VARCHAR(191) NOT NULL,
    `lineOne` VARCHAR(191) NOT NULL,
    `lineTwo` VARCHAR(191) NOT NULL DEFAULT '-',
    `lineThree` VARCHAR(191) NOT NULL DEFAULT '-',
    `authorUnique` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GlobalBank_unique_key`(`unique`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unique` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `price` INTEGER NOT NULL,
    `discount` INTEGER NULL,
    `fee` INTEGER NOT NULL DEFAULT 0,
    `video` VARCHAR(191) NULL,

    UNIQUE INDEX `ShopProduct_unique_key`(`unique`),
    UNIQUE INDEX `ShopProduct_path_key`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `unique` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Coupon` ADD CONSTRAINT `Coupon_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `User`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_couponProviderUnique_fkey` FOREIGN KEY (`couponProviderUnique`) REFERENCES `User`(`unique`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `User`(`unique`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_couponProviderUnique_fkey` FOREIGN KEY (`couponProviderUnique`) REFERENCES `User`(`unique`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `User`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Withdraw` ADD CONSTRAINT `Withdraw_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `User`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminMessages` ADD CONSTRAINT `AdminMessages_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `User`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `User`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `User`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupItem` ADD CONSTRAINT `GroupItem_profileUnique_fkey` FOREIGN KEY (`profileUnique`) REFERENCES `Profile`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Social` ADD CONSTRAINT `Social_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `Profile`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `Profile`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `Profile`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Albums` ADD CONSTRAINT `Albums_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `Profile`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LocalBank` ADD CONSTRAINT `LocalBank_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `Profile`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MobileBank` ADD CONSTRAINT `MobileBank_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `Profile`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GlobalBank` ADD CONSTRAINT `GlobalBank_authorUnique_fkey` FOREIGN KEY (`authorUnique`) REFERENCES `Profile`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopProductImage` ADD CONSTRAINT `ShopProductImage_unique_fkey` FOREIGN KEY (`unique`) REFERENCES `ShopProduct`(`unique`) ON DELETE RESTRICT ON UPDATE CASCADE;
