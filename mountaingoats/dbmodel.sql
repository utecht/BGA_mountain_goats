
-- ------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- MountainGoats implementation : © Joseph Utecht <joseph@utecht.co>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

-- dbmodel.sql

CREATE TABLE `goat` (
	`owner` INT NOT NULL AUTO_INCREMENT ,
	`goat_5` INT DEFAULT NULL ,
	`goat_6` INT DEFAULT NULL ,
	`goat_7` INT DEFAULT NULL ,
	`goat_8` INT DEFAULT NULL ,
	`goat_9` INT DEFAULT NULL ,
	`goat_10` INT DEFAULT NULL ,
	PRIMARY KEY (`owner`)) ENGINE = InnoDB;

CREATE TABLE `dice` (
	`id` INT NOT NULL AUTO_INCREMENT ,
	`value` INT NOT NULL DEFAULT '1' ,
	PRIMARY KEY (`id`)) ENGINE = InnoDB; 

CREATE TABLE `token` (
	`id` INT NOT NULL AUTO_INCREMENT ,
	`kind` ENUM('point_token_5', 'point_token_6', 'point_token_7',
				'point_token_8', 'point_token_9', 'point_token_10',
				'bonus_token_12', 'bonus_token_15', 'bonus_token_9',
				'bonus_token_6') NOT NULL,
	`owner` INT DEFAULT NULL,
	PRIMARY KEY (`id`)) ENGINE = InnoDB;