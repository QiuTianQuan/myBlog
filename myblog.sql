/*
 Navicat Premium Data Transfer

 Source Server         : loaclhost
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : myblog

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 01/02/2021 21:10:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_time` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `kind` varchar(255) DEFAULT NULL,
  `comment_num` int DEFAULT NULL,
  `visitor_num` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (1, 'test', '<pre><code>test111</code></pre><p><br></p>', 1611146326, 'blog', 'server', NULL, NULL);
INSERT INTO `article` VALUES (2, '初到橙心优选有感', '<p>到橙心支援的第二天，确实是非常滚烫的， 不说了，代码还没写完</p>', 1611149604, 'blog', '', NULL, NULL);
INSERT INTO `article` VALUES (3, 'test', '<p>test</p>', 1611150547, 'life', '', NULL, NULL);
INSERT INTO `article` VALUES (4, 'tttt', '<p>tttt</p>', 1611150695, 'life', '', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `a_id` int DEFAULT NULL,
  `c_id` int DEFAULT '0',
  `msg` varchar(255) DEFAULT NULL,
  `create_time` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES (1, 0, '不错', 1611146394, 'tianqiuyi@didichuxing.com', 'qiuqiu', 1);
INSERT INTO `comment` VALUES (1, 0, '不错', 1611146453, 'tianqiuyi@didichuxing.com', 'qiuqiu', 2);
INSERT INTO `comment` VALUES (1, 1, '一般般啦', 1611147502, '244576371@qq.com', 'tt', 3);
INSERT INTO `comment` VALUES (1, 0, 'yyy', 1611147530, 'undefined', 'qq', 4);
INSERT INTO `comment` VALUES (1, 1, 'hhhh', 1611147548, 'undefined', 'yy', 5);
INSERT INTO `comment` VALUES (2, 0, 'test', 1611149677, 'undefined', 'tttt', 6);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
