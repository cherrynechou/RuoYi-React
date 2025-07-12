package com.ruoyi.framework.web.service;

import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.common.core.domain.model.AuthUser;
import com.ruoyi.common.exception.ServiceException;
import com.ruoyi.common.exception.user.UserPasswordNotMatchException;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.common.utils.ip.IpUtils;
import com.ruoyi.framework.security.context.AuthenticationContextHolder;
import com.ruoyi.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SysLoginService
{
    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ISysUserService userService;

    public String login(String userName,String password)
    {
        // 用户验证
        Authentication authentication = null;
        try{
            // 用户验证
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userName, password);
            AuthenticationContextHolder.setContext(authenticationToken);
            // 该方法会去调用UserDetailsServiceImpl.loadUserByUsername
            authentication = authenticationManager.authenticate(authenticationToken);

            if(authentication.isAuthenticated()){
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }catch (Exception e) {
            if(e instanceof BadCredentialsException){
                throw new UserPasswordNotMatchException();
            }else{
                throw new ServiceException(e.getMessage());
            }
        } finally {
            AuthenticationContextHolder.clearContext();
        }

        AuthUser loginUser = (AuthUser) authentication.getPrincipal();
        recordLoginInfo(loginUser.getUserId(),loginUser.getUser().getLoginCount());

        return  tokenService.generateAccessToken(loginUser);
    }

    /**
     * 保存信息
     *
     * @param userId
     */
    public void recordLoginInfo(Long userId, Integer loginCount)
    {
        SysUser sysUser = new SysUser();
        sysUser.setLastLoginIp(IpUtils.getIpAddr());
        sysUser.setLastLoginTime(DateUtils.getNowDate());
        sysUser.setLoginCount(loginCount + 1);
        userService.updateUserProfile(userId, sysUser);
    }

}
