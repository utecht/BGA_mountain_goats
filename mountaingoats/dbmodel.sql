
-- ------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- MountainGoats implementation : © Joseph Utecht <joseph@utecht.co>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

-- dbmodel.sql

-- This is the file where you are describing the database schema of your game
-- Basically, you just have to export from PhpMyAdmin your table structure and copy/paste
-- this export here.
-- Note that the database itself and the standard tables ("global", "stats", "gamelog" and "player") are
-- already created and must not be created here

-- Note: The database schema is created from this file when the game starts. If you modify this file,
--       you have to restart a game to see your changes in database.

-- Example 1: create a standard "card" table to be used with the "Deck" tools (see example game "hearts"):

-- CREATE TABLE IF NOT EXISTS `card` (
--   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `card_type` varchar(16) NOT NULL,
--   `card_type_arg` int(11) NOT NULL,
--   `card_location` varchar(16) NOT NULL,
--   `card_location_arg` int(11) NOT NULL,
--   PRIMARY KEY (`card_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


-- Example 2: add a custom field to the standard "player" table
-- ALTER TABLE `player` ADD `player_my_custom_field` INT UNSIGNED NOT NULL DEFAULT '0';

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