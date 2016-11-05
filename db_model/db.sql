-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'user'
-- 用户表
-- ---

DROP TABLE IF EXISTS `user`;
		
CREATE TABLE `user` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `email` VARCHAR(32) NOT NULL DEFAULT 'NULL' COMMENT 'username',
  `password` VARCHAR(256) NOT NULL DEFAULT 'NULL' COMMENT 'hash_passwrod',
  `role` INTEGER(4) NOT NULL DEFAULT 0 COMMENT '0 表示未定义',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
) COMMENT '用户表';

-- ---
-- Table 'virus'
-- 病毒数据
-- ---

DROP TABLE IF EXISTS `virus`;
		
CREATE TABLE `virus` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(32) NOT NULL DEFAULT 'NULL' COMMENT '病毒名称',
  `serial_number` VARCHAR(32) NULL DEFAULT NULL COMMENT '病毒序号',
  `gene_type` VARCHAR NOT NULL DEFAULT 'NULL' COMMENT '基因类型',
  `location` VARCHAR(32) NULL DEFAULT NULL COMMENT '地理位置',
  `time` INTEGER NULL DEFAULT NULL COMMENT '时间',
  `source` INTEGER NULL DEFAULT NULL COMMENT '来源',
  `sequence_length` INTEGER NULL DEFAULT NULL COMMENT '序列长度',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) COMMENT '病毒数据';

-- ---
-- Table 'news'
-- 新闻内容
-- ---

DROP TABLE IF EXISTS `news`;
		
CREATE TABLE `news` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `news_type` INTEGER NOT NULL DEFAULT 0 COMMENT '新闻类型',
  `report_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报道时间',
  `title` VARCHAR(256) NOT NULL DEFAULT 'NULL' COMMENT '标题',
  `infections` INT NULL DEFAULT 0 COMMENT '感染人数',
  `fk_virus_type` INTEGER NULL COMMENT '病毒类型',
  `web_url` MEDIUMTEXT NULL DEFAULT NULL COMMENT '网站地址',
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) COMMENT '新闻内容';

-- ---
-- Table 'paper'
-- 文献；Literature
-- ---

DROP TABLE IF EXISTS `paper`;
		
CREATE TABLE `paper` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `host` INTEGER NULL DEFAULT NULL COMMENT '宿主',
  `status` INTEGER NULL DEFAULT NULL,
  `acc.no` INTEGER NULL DEFAULT NULL,
  `mol` VARCHAR NULL DEFAULT NULL,
  `org.defined` VARCHAR NULL DEFAULT NULL,
  `org.ncbi` VARCHAR NULL DEFAULT NULL,
  `seq.name` VARCHAR NULL DEFAULT NULL,
  `url` MEDIUMTEXT NULL DEFAULT NULL COMMENT '地址',
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) COMMENT '文献；Literature';

-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `virus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `news` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `paper` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `user` (`id`,`email`,`password`,`role`,`create_time`) VALUES
-- ('','','','','');
-- INSERT INTO `virus` (`id`,`name`,`serial_number`,`gene_type`,`location`,`time`,`source`,`sequence_length`,`create_time`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `news` (`id`,`news_type`,`report_time`,`title`,`infections`,`fk_virus_type`,`web_url`,`create_time`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `paper` (`id`,`host`,`status`,`acc.no`,`mol`,`org.defined`,`org.ncbi`,`seq.name`,`create_time`) VALUES
-- ('','','','','','','','','');
