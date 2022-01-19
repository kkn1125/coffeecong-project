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
  `num` INT NOT NULL,
  `pid` VARCHAR(100) NOT NULL,
  `pname` VARCHAR(100) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `subtitle` VARCHAR(100) NULL,
  `content` LONGTEXT NULL,
  `capacity` BIGINT NOT NULL,
  `price` BIGINT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `regdate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updates` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffeespring`.`product_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffeespring`.`product_tag` (
  `num` INT NOT NULL,
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
  `num` INT NOT NULL,
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
  `num` INT NOT NULL,
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
  `num` INT NOT NULL,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


show tables;

select * from member;