/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 8.4.0 : Database - mes
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ruoyi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ruoyi`;

/*Table structure for table `sys_config` */

DROP TABLE IF EXISTS `sys_config`;

CREATE TABLE `sys_config` (
  `id` int NOT NULL COMMENT '参数主键',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '参数名称',
  `key` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '参数键名',
  `value` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '参数键值',
  `type` bit(1) DEFAULT b'0' COMMENT '系统内置（1是 0否）',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='参数配置表';

/*Data for the table `sys_config` */

/*Table structure for table `sys_dict` */

DROP TABLE IF EXISTS `sys_dict`;

CREATE TABLE `sys_dict` (
  `id` bigint NOT NULL COMMENT '字典分类主键',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '字典分类名称',
  `code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '字典分类代码',
  `type` smallint DEFAULT '0' COMMENT '类型',
  `status` bit(1) DEFAULT b'0' COMMENT '状态（0正常 1停用）',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='字典类型表';

/*Data for the table `sys_dict` */

/*Table structure for table `sys_dict_data` */

DROP TABLE IF EXISTS `sys_dict_data`;

CREATE TABLE `sys_dict_data` (
  `id` bigint NOT NULL COMMENT '字典项编号',
  `dict_id` bigint NOT NULL COMMENT '字典id',
  `code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '代码',
  `label` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '字典项名称',
  `value` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '字典键值',
  `is_default` bit(1) DEFAULT b'0' COMMENT '是否默认（0否 1是）',
  `status` bit(1) DEFAULT b'0' COMMENT '状态（0正常 1停用）',
  `sort` smallint DEFAULT '0' COMMENT '字典排序',
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='字典数据表';

/*Data for the table `sys_dict_data` */

/*Table structure for table `sys_menu` */

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单名称',
  `type` tinyint DEFAULT NULL COMMENT '类型',
  `locale` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '国际化标识',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单路径',
  `parent_id` bigint DEFAULT '0' COMMENT '父菜单ID',
  `target` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '浏览器跳转类型',
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '菜单图标',
  `sort` smallint DEFAULT '0' COMMENT '显示顺序',
  `visible` bit(1) DEFAULT b'0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` bit(1) DEFAULT b'0' COMMENT '菜单状态（0正常 1停用）',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单表';

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`id`,`name`,`type`,`locale`,`path`,`parent_id`,`target`,`icon`,`sort`,`visible`,`status`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'Dashboard',1,'menu.dashboard','/',0,'','DashboardOutlined',1,'','','2024-12-22 03:23:40',NULL,NULL),
(2,'Analysis',3,'menu.dashboard.analysis','/dashboard',1,'','',2,'','','2024-12-22 03:23:40',NULL,NULL),
(3,'Admin',1,'menu.auth','/auth',0,'','WindowsOutlined',3,'','','2024-12-22 03:23:40',NULL,NULL),
(4,'Users',3,'menu.auth.user','/auth/users',3,'','',4,'','','2024-12-22 03:23:40',NULL,NULL),
(5,'Roles',3,'menu.auth.role','/auth/roles',3,'','',5,'','','2024-12-22 03:23:40',NULL,NULL),
(6,'Permission',3,'menu.auth.permission','/auth/permissions',3,'','',6,'','','2024-12-22 03:23:40',NULL,NULL),
(7,'Menu',3,'menu.auth.menu','/auth/menu',3,'','',7,'','','2024-12-22 03:23:40',NULL,NULL);

/*Table structure for table `sys_permission` */

DROP TABLE IF EXISTS `sys_permission`;

CREATE TABLE `sys_permission` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限名称',
  `locale` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '国际化标识',
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标识',
  `type` tinyint DEFAULT '0' COMMENT '类型',
  `parent_id` bigint DEFAULT '0' COMMENT '父权限ID',
  `sort` smallint DEFAULT '0' COMMENT '显示顺序',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

/*Data for the table `sys_permission` */

insert  into `sys_permission`(`id`,`name`,`locale`,`slug`,`type`,`parent_id`,`sort`,`created_at`,`updated_at`) values 
(1,'系统管理','permission.system.management','',1,0,1,'2025-07-12 14:09:42','2025-07-12 14:09:42'),
(2,'用户管理','permission.system.user.manager','',2,1,1,'2025-07-12 14:09:42','2025-07-12 14:09:42'),
(3,'用户列表','permission.system.user.list','system:user:list',3,2,1,NULL,NULL);

/*Table structure for table `sys_permission_menu` */

DROP TABLE IF EXISTS `sys_permission_menu`;

CREATE TABLE `sys_permission_menu` (
  `permission_id` bigint DEFAULT NULL COMMENT '权限ID',
  `menu_id` bigint DEFAULT NULL COMMENT '菜单ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `sys_permission_menu` */

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标识',
  `scope` tinyint DEFAULT NULL COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）',
  `sort` smallint NOT NULL COMMENT '显示顺序',
  `status` bit(1) DEFAULT b'0' COMMENT '角色状态（0正常 1停用）',
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色信息表';

/*Data for the table `sys_role` */

insert  into `sys_role`(`id`,`name`,`slug`,`scope`,`sort`,`status`,`remark`,`created_at`,`updated_at`) values 
(1,'Administrator','administrator',NULL,1,'',NULL,'2024-12-22 03:23:40','2024-12-22 03:23:41');

/*Table structure for table `sys_role_menu` */

DROP TABLE IF EXISTS `sys_role_menu`;

CREATE TABLE `sys_role_menu` (
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  UNIQUE KEY `sys_role_menu_role_id_menu_id_unique` (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色和菜单关联表';

/*Data for the table `sys_role_menu` */

/*Table structure for table `sys_role_permission` */

DROP TABLE IF EXISTS `sys_role_permission`;

CREATE TABLE `sys_role_permission` (
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `permission_id` bigint NOT NULL COMMENT '权限ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  UNIQUE KEY `sys_role_permissions_role_id_permission_id_unique` (`role_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色和权限关联表';

/*Data for the table `sys_role_permission` */

/*Table structure for table `sys_role_user` */

DROP TABLE IF EXISTS `sys_role_user`;

CREATE TABLE `sys_role_user` (
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户和角色关联表';

/*Data for the table `sys_role_user` */

insert  into `sys_role_user`(`role_id`,`user_id`,`created_at`,`updated_at`) values 
(1,1,'2024-12-22 03:23:41','2024-12-22 03:23:41');

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `id` bigint NOT NULL COMMENT '用户ID',
  `username` varchar(360) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户账号',
  `password` varchar(240) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '密码',
  `nickname` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '昵称',
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '用户邮箱',
  `telephone` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '手机号码',
  `sex` tinyint DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '头像地址',
  `status` bit(1) DEFAULT b'0' COMMENT '帐号状态（0正常 1停用）',
  `login_count` int DEFAULT '0' COMMENT '登录次数',
  `last_login_ip` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '最后登录IP',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `sort` smallint DEFAULT '0' COMMENT '显示顺序',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_users_username_unique` (`username`),
  UNIQUE KEY `sys_users_phone_unique` (`telephone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息表';

/*Data for the table `sys_user` */

insert  into `sys_user`(`id`,`username`,`password`,`nickname`,`email`,`telephone`,`sex`,`avatar`,`status`,`login_count`,`last_login_ip`,`last_login_time`,`remark`,`sort`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'admin','$2a$10$lODdnJNhQkNazFckLZ4UIO.1CGPjsbHu9qXv8HKk9IS1YEVnrjeSa','Administrator','','',0,'','\0',1,'192.168.1.20','2025-07-12 10:55:00',NULL,0,'2024-12-22 03:34:02','2025-07-12 10:55:00',NULL);

/*Table structure for table `sys_user_menu` */

DROP TABLE IF EXISTS `sys_user_menu`;

CREATE TABLE `sys_user_menu` (
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  KEY `admin_user_menu_user_id_menu_id_index` (`user_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户与菜单关联表';

/*Data for the table `sys_user_menu` */

/*Table structure for table `sys_user_permission` */

DROP TABLE IF EXISTS `sys_user_permission`;

CREATE TABLE `sys_user_permission` (
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `permission_id` bigint NOT NULL COMMENT '权限ID',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  KEY `admin_user_permissions_user_id_permission_id_index` (`user_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户与权限关联表';


insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('1','系统管理','permission.system.management','','1','0','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('2','用户管理','permission.system.user.manager','','2','1','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('3','用户列表','permission.system.user.list','system:user:list','3','2','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('4','添加用户','permission.system.user.add','system:user:add','3','2','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('5','查询用户','permission.system.user.query','system:user:query','3','2','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('6','更新用户','permission.system.user.update','system:user:update','3','2','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('7','重设密码','permission.system.user.reset.password','system:user:reset:password','3','2','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('8','拒绝登录','permission.system.user.forbidden','system:user:forbidden','3','2','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('9','所有用户','permission.system.user.all','system:user:all','3','2','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('10','导出用户','permission.system.user.export','system:user:export','3','2','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('11','角色管理','permission.system.role.manager','','2','1','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('12','角色列表','permission.system.role.list','system:role:list','3','11','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('13','添加角色','permission.system.role.add','system:role:add','3','11','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('14','查询用户','permission.system.role.query','system:role:query','3','11','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('15','更新用色','permission.system.role.update','system:role:update','3','11','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('16','删除角色','permission.system.role.delete','system:role:delete','3','11','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('17','所有角色','permission.system.role.all','system:role:all','3','11','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('18','获取角色权限','permission.system.role.permission.all','system:role:permission:all','3','11','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('19','更新角色权限','permission.system.role.permission.update','system:role:permission:update','3','11','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('20','权限管理','permission.system.permission.manager','','2','1','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('21','权限列表','permission.system.permission.list','system:permission:list','3','20','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('22','添加权限','permission.system.permission.add','system:permission:add','3','20','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('23','查询权限','permission.system.permission.query','system:permission:query','3','20','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('24','更新权限','permission.system.permission.update','system:permission:update','3','20','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('25','删除权限','permission.system.permission.delete','system:permission:delete','3','20','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('26','所有权限','permission.system.permission.all','system:permission:all','3','20','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('27','菜单管理','permission.system.menu.manager','','2','1','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('28','菜单列表','permission.system.menu.list','system:menu:list','3','27','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('29','添加菜单','permission.system.menu.add','system:menu:add','3','27','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('30','查询菜单','permission.system.menu.query','system:menu:query','3','27','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('31','更新菜单','permission.system.menu.update','system:menu:update','3','27','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('32','删除菜单','permission.system.menu.delete','system:menu:delete','3','27','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('33','所有菜单','permission.system.menu.all','system:menu:all','3','27','1','2025-07-12 14:09:42','2025-07-12 14:09:42');
insert into `sys_permission` (`id`, `name`, `locale`, `slug`, `type`, `parent_id`, `sort`, `created_at`, `updated_at`) values('34','关闭菜单','permission.system.menu.disabled','system:menu:disabled','3','27','1','2025-07-12 14:09:42','2025-07-12 14:09:42');


/*Data for the table `sys_user_permission` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
