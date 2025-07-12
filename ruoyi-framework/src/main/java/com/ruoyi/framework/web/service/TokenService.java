package com.ruoyi.framework.web.service;


import com.ruoyi.common.constant.CacheConstants;
import com.ruoyi.common.constant.Constants;
import com.ruoyi.common.core.domain.model.AuthUser;
import com.ruoyi.common.core.redis.RedisCache;
import com.ruoyi.common.utils.ServletUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.common.utils.ip.AddressUtils;
import com.ruoyi.common.utils.ip.IpUtils;
import com.ruoyi.common.utils.uuid.IdUtils;
import eu.bitwalker.useragentutils.UserAgent;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class TokenService {
    private static final Logger log = LoggerFactory.getLogger(TokenService.class);

    // 令牌自定义标识
    @Value("${token.header}")
    private String header;

    // 令牌秘钥
    @Value("${token.secret}")
    private String secret;

    // 令牌有效期（默认1天）
    @Value("${token.expireTime}")
    private int expireTime;

    //令牌有效期（默认7天）
    @Value("${token.refreshTime}")
    private int refreshTime;

    protected static final long MILLIS_SECOND = 1000;

    protected static final long MILLIS_MINUTE = 60 * MILLIS_SECOND;

    private static final Long MILLIS_MINUTE_TEN = 20 * 60 * 1000L;

    @Autowired
    private RedisCache redisCache;

    public AuthUser getAuthUser(HttpServletRequest request)
    {
        String token = getToken(request);
        if (StringUtils.isNotEmpty(token))
        {
            try{
                Claims claims = parseToken(token);
                // 解析对应的权限以及用户信息
                String uuid = (String) claims.get(Constants.LOGIN_USER_KEY);
                String userKey = getAccessTokenKey(uuid);
                return redisCache.getCacheObject(userKey);
            }catch (Exception e){
                log.error("获取用户信息异常'{}'", e.getMessage());
            }
        }

        return null;
    }

    /**
     * 创建accesstotken
     * @param loginUser
     * @return
     */
    public String generateAccessToken(AuthUser loginUser)
    {
        String token = IdUtils.fastUUID();
        loginUser.setAccessToken(token);
        loginUser.setLoginTime(System.currentTimeMillis());
        loginUser.setExpireTime(loginUser.getLoginTime() + expireTime * MILLIS_MINUTE);
        setUserAgent(loginUser);

        Map<String, Object> claims = new HashMap<>();
        claims.put(Constants.LOGIN_USER_KEY, token);

        // 根据uuid将loginUser缓存
        String userKey = getAccessTokenKey(loginUser.getAccessToken());
        redisCache.setCacheObject(userKey, loginUser, expireTime, TimeUnit.MINUTES);

        return createToken(claims);
    }

    public void verifyToken(AuthUser loginUser)
    {
        long expireTime = loginUser.getExpireTime();
        long currentTime = System.currentTimeMillis();
        if (expireTime - currentTime <= MILLIS_MINUTE_TEN) {
            refreshToken(loginUser);
        }
    }

    public void refreshToken(AuthUser loginUser)
    {
        loginUser.setLoginTime(System.currentTimeMillis());
        loginUser.setExpireTime(loginUser.getLoginTime() + expireTime * MILLIS_MINUTE);

        // 根据uuid将loginUser缓存
        String userKey = getAccessTokenKey(loginUser.getAccessToken());
        redisCache.setCacheObject(userKey, loginUser, expireTime, TimeUnit.MINUTES);
    }

    public String createToken(Map<String, Object> claims)
    {
        //生成 HMAC 密钥，根据提供的字节数组长度选择适当的 HMAC 算法，并返回相应的 SecretKey 对象。
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        JwtBuilder builder = Jwts.builder()
                             // 设置签名使用的签名算法和签名使用的秘钥
                            .signWith(key)
                             // 如果有私有声明，一定要先设置这个自己创建的私有的声明，这个是给builder的claim赋值，一旦写在标准的声明赋值之后，就是覆盖了那些标准的声明的
                            .claims(claims);

        return builder.compact();
    }

    private Claims parseToken(String token)
    {
        //生成 HMAC 密钥，根据提供的字节数组长度选择适当的 HMAC 算法，并返回相应的 SecretKey 对象。
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }

    /**
     * 设置用户代理信息
     *
     * @param loginUser 登录信息
     */
    public void setUserAgent(AuthUser loginUser)
    {
        UserAgent userAgent = UserAgent.parseUserAgentString(ServletUtils.getRequest().getHeader("User-Agent"));
        String ip = IpUtils.getIpAddr();
        loginUser.setIpaddr(ip);
        loginUser.setLoginLocation(AddressUtils.getRealAddressByIP(ip));
        loginUser.setBrowser(userAgent.getBrowser().getName());
        loginUser.setOs(userAgent.getOperatingSystem().getName());
    }


    /**
     * 删除用户身份信息
     */
    public void delLoginUser(String token)
    {
        if (StringUtils.isNotEmpty(token))
        {
            String userAccessKey = getAccessTokenKey(token);
            redisCache.deleteObject(userAccessKey);
        }
    }


    /**
     * 获取请求token
     *
     */
    private String getToken(HttpServletRequest request)
    {
        String token = request.getHeader(header);
        if (StringUtils.isNotEmpty(token) && token.startsWith(Constants.TOKEN_PREFIX))
        {
            token = token.replace(Constants.TOKEN_PREFIX, "");
        }
        return token;
    }




    private String getAccessTokenKey(String uuid)
    {
        return CacheConstants.ACCESS_TOKEN_KEY + uuid;
    }


}
