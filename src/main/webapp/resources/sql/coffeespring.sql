-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema coffeespring
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema coffeespring
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `coffeespring` DEFAULT CHARACTER SET utf8 ;
USE `coffeespring` ;

-- -----------------------------------------------------
-- Table `coffeespring`.`member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffeespring`.`member` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `birth` DATE NOT NULL,
  `address_main` VARCHAR(45) NOT NULL,
  `address_sub` VARCHAR(45) NOT NULL,
  `address_zip` BIGINT NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updates` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffeespring`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffeespring`.`product` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `pid` VARCHAR(100) NOT NULL,
  `pname` VARCHAR(100) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `subtitle` VARCHAR(100) NULL,
  `content` LONGTEXT NOT NULL,
  `capacity` BIGINT NOT NULL,
  `price` BIGINT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `image` TEXT NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updates` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffeespring`.`product_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffeespring`.`product_tag` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `pnum` INT NOT NULL,
  `content` VARCHAR(45) NULL DEFAULT '',
  PRIMARY KEY (`num`),
  INDEX `fk_tag_product_idx` (`pnum` ASC) VISIBLE,
  CONSTRAINT `fk_tag_product`
    FOREIGN KEY (`pnum`)
    REFERENCES `coffeespring`.`product` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffeespring`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffeespring`.`comment` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `mnum` INT NOT NULL,
  `pnum` INT NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  `img_path` VARCHAR(500) NULL DEFAULT '',
  `star` FLOAT NOT NULL DEFAULT 0,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cid` INT NULL,
  `layer` INT NULL,
  `group` INT NULL,
  INDEX `fk_comment_member1_idx` (`mnum` ASC) VISIBLE,
  INDEX `fk_comment_product1_idx` (`pnum` ASC) VISIBLE,
  PRIMARY KEY (`num`),
  CONSTRAINT `fk_comment_member1`
    FOREIGN KEY (`mnum`)
    REFERENCES `coffeespring`.`member` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_product1`
    FOREIGN KEY (`pnum`)
    REFERENCES `coffeespring`.`product` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffeespring`.`comment_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffeespring`.`comment_tag` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `cnum` INT NOT NULL,
  `pnum` INT NOT NULL,
  `content` VARCHAR(45) NULL DEFAULT '',
  PRIMARY KEY (`num`),
  INDEX `fk_tag_copy1_comment1_idx` (`cnum` ASC) VISIBLE,
  INDEX `fk_comment_tag_product1_idx` (`pnum` ASC) VISIBLE,
  CONSTRAINT `fk_tag_copy1_comment1`
    FOREIGN KEY (`cnum`)
    REFERENCES `coffeespring`.`comment` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_tag_product1`
    FOREIGN KEY (`pnum`)
    REFERENCES `coffeespring`.`product` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffeespring`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffeespring`.`like` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `mnum` INT NOT NULL,
  `pnum` INT NOT NULL,
  INDEX `fk_table1_member1_idx` (`mnum` ASC) VISIBLE,
  INDEX `fk_table1_product1_idx` (`pnum` ASC) VISIBLE,
  PRIMARY KEY (`num`),
  CONSTRAINT `fk_table1_member1`
    FOREIGN KEY (`mnum`)
    REFERENCES `coffeespring`.`member` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_product1`
    FOREIGN KEY (`pnum`)
    REFERENCES `coffeespring`.`product` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffeespring`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffeespring`.`cart` (
  `num` INT NOT NULL AUTO_INCREMENT,
  `mnum` INT NOT NULL,
  `pnum` INT NOT NULL,
  `id` VARCHAR(300) NOT NULL,
  `capacity` INT NOT NULL,
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `fk_table1_member2_idx` (`mnum` ASC) VISIBLE,
  INDEX `fk_table1_product2_idx` (`pnum` ASC) VISIBLE,
  PRIMARY KEY (`num`),
  CONSTRAINT `fk_table1_member2`
    FOREIGN KEY (`mnum`)
    REFERENCES `coffeespring`.`member` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_product2`
    FOREIGN KEY (`pnum`)
    REFERENCES `coffeespring`.`product` (`num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO product (pid, pname, title, subtitle, content, capacity, price, category, image) VALUES 
('cc-0-001',
'브렉퍼스트 블렌드 미디엄',
'커피콩 브렉퍼스트 블렌드 미디엄 로스트 1.13kg',
'원두 로스팅',
'<img src="http://image1.coupangcdn.com/image/vendor_inventory/69ce/21faf162a6b2bd0d7eeb682c19a24f5c83946e8be4e923b9123403058069.jpg" width="100%"><img src="http://image1.coupangcdn.com/image/vendor_inventory/5c44/f61d50301bac2c58670273f002d8b2bd2b949a73fa03a459c23f0318202a.jpg" width="100%">',
30,
21570,
'bean',
'/resources/assets/images/covers.jpg'),
('cc-0-002',
'커피콩',
'커피콩 베트남 로부스타 G1 원두커피',
'원두 로스팅',
'<img src="http://image1.coupangcdn.com/image/vendor_inventory/69ce/21faf162a6b2bd0d7eeb682c19a24f5c83946e8be4e923b9123403058069.jpg" width="100%"><img src="http://image1.coupangcdn.com/image/vendor_inventory/5c44/f61d50301bac2c58670273f002d8b2bd2b949a73fa03a459c23f0318202a.jpg" width="100%">',
30,
21570,
'bean',
'/resources/assets/images/covers.jpg'),
('cc-0-003',
'커피콩',
'커피콩 에티오피아 예가체프 G4 원두커피',
'원두 로스팅',
'<img src="http://image1.coupangcdn.com/image/vendor_inventory/69ce/21faf162a6b2bd0d7eeb682c19a24f5c83946e8be4e923b9123403058069.jpg" width="100%"><img src="http://image1.coupangcdn.com/image/vendor_inventory/5c44/f61d50301bac2c58670273f002d8b2bd2b949a73fa03a459c23f0318202a.jpg" width="100%">',
30,
19400,
'bean',
'/resources/assets/images/covers.jpg'),
('cc-0-004',
'커피콩',
'커피콩 케냐 AA 미디엄 로스트',
'원두 로스팅',
'<img src="http://image1.coupangcdn.com/image/vendor_inventory/69ce/21faf162a6b2bd0d7eeb682c19a24f5c83946e8be4e923b9123403058069.jpg" width="100%"><img src="http://image1.coupangcdn.com/image/vendor_inventory/5c44/f61d50301bac2c58670273f002d8b2bd2b949a73fa03a459c23f0318202a.jpg" width="100%">',
30,
19400,
'bean',
'/resources/assets/images/beans_1.jpg'),
('cc-0-005',
'커피콩',
'커피콩 드립백',
'원두 로스팅',
'<img src="http://image1.coupangcdn.com/image/vendor_inventory/69ce/21faf162a6b2bd0d7eeb682c19a24f5c83946e8be4e923b9123403058069.jpg" width="100%"><img src="http://image1.coupangcdn.com/image/vendor_inventory/5c44/f61d50301bac2c58670273f002d8b2bd2b949a73fa03a459c23f0318202a.jpg" width="100%">',
30,
21500,
'coffee',
'/resources/assets/images/dripcoffee_1.jpg'),
('cc-0-006',
'커피콩',
'커피콩 Pomegranate Blueberry 티백',
'원두 로스팅',
'<img src="http://image1.coupangcdn.com/image/vendor_inventory/69ce/21faf162a6b2bd0d7eeb682c19a24f5c83946e8be4e923b9123403058069.jpg" width="100%"><img src="http://image1.coupangcdn.com/image/vendor_inventory/5c44/f61d50301bac2c58670273f002d8b2bd2b949a73fa03a459c23f0318202a.jpg" width="100%">',
30,
31000,
'tea',
'/resources/assets/images/beans_6.jpg'),
('cc-0-007',
'커피콩',
'커피콩 CBTL 커피머신',
'커피머신',
'<img src="http://image1.coupangcdn.com/image/vendor_inventory/69ce/21faf162a6b2bd0d7eeb682c19a24f5c83946e8be4e923b9123403058069.jpg" width="100%"><img src="http://image1.coupangcdn.com/image/vendor_inventory/5c44/f61d50301bac2c58670273f002d8b2bd2b949a73fa03a459c23f0318202a.jpg" width="100%">',
30,
531000,
'tea',
'/resources/assets/images/P0008C.jpg'),
('cc-0-008',
'커피콩',
'커피콩 커피컵 모양 쿠션',
'커피 상품',
'<img src="http://image1.coupangcdn.com/image/vendor_inventory/69ce/21faf162a6b2bd0d7eeb682c19a24f5c83946e8be4e923b9123403058069.jpg" width="100%"><img src="http://image1.coupangcdn.com/image/vendor_inventory/5c44/f61d50301bac2c58670273f002d8b2bd2b949a73fa03a459c23f0318202a.jpg" width="100%">',
5,
35000,
'wear',
'/resources/assets/images/P0010C.jpg');

desc product;
show tables;

select * from member;