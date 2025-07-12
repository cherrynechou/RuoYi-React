package com.ruoyi.common.constant;

import io.jsonwebtoken.Claims;

import java.util.Locale;

public class Constants
{
    /**
     * UTF-8 字符集
     */
    public static final String UTF8 = "UTF-8";

    /**
     * GBK 字符集
     */
    public static final String GBK = "GBK";

    /**
     * 系统语言
     */
    public static final Locale DEFAULT_LOCALE = Locale.ENGLISH;

    /**
     * http请求
     */
    public static final String HTTP = "http://";

    /**
     * https请求
     */
    public static final String HTTPS = "https://";

    /**
     * 令牌
     */
    public static final String TOKEN = "token";

    /**
     * 令牌前缀
     */
    public static final String TOKEN_PREFIX = "Bearer ";

    /**
     * 默认yes值
     */
    public static final Integer DEFAULT_YES_VALUE = 1;

    /**
     * 默认no值
     */
    public static final Integer DEFAULT_NO_VALUE = 0;

    /**
     * 令牌前缀
     */
    public static final String LOGIN_USER_KEY = "login_user_key";


    /**
     * 用户名称
     */
    public static final String JWT_USERNAME = Claims.SUBJECT;


    /**
     * 所有权限标识
     */
    public static final String ALL_PERMISSION = "*:*:*";


    /**
     * 管理员角色权限标识
     */
    public static final String SUPER_ADMIN = "admin";


    /**
     * 资源映射路径 前缀
     */
    public static final String RESOURCE_PREFIX = "/profile";


    public static final String DEFAULT_AVATAR_URL = "/images/user2-160x160.png";


    /**
     * 自动识别json对象白名单配置（仅允许解析的包名，范围越小越安全）
     */
    public static final String[] JSON_WHITELIST_STR = { "org.springframework", "com.ruoyi" };

    /**
     * 定时任务白名单配置（仅允许访问的包名，如其他需要可以自行添加）
     */
    public static final String[] JOB_WHITELIST_STR = { "com.ruoyi.quartz.task" };

    /**
     * 定时任务违规的字符
     */
    public static final String[] JOB_ERROR_STR = {
            "java.net.URL",
            "javax.naming.InitialContext",
            "org.yaml.snakeyaml",
            "org.springframework",
            "org.apache",
            "com.ruoyi.common.utils.file",
            "com.ruoyi.common.config",
            "com.ruoyi.generator"
    };
}
