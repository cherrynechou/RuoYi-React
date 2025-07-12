package com.ruoyi.framework.web.service;

import com.ruoyi.common.enums.UserStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.common.core.domain.model.AuthUser;
import com.ruoyi.common.exception.ServiceException;
import com.ruoyi.common.utils.MessageUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService
{
    private static final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private ISysUserService userService;

    @Autowired
    private SysPermissionService permissionService;

    @Autowired
    private SysPasswordService sysPasswordService;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException
    {
        SysUser user = userService.findUserByUserName(userName);

        if (StringUtils.isNull(user))
        {
            log.info("登录用户：{} 不存在.", userName);
            throw new ServiceException(MessageUtils.message("user.password.not.match"));
        }else if(UserStatus.DISABLE.getCode().equals(user.getStatus().toString())){
            log.info("登录用户：{} 已被停用.", userName);
            throw new ServiceException(MessageUtils.message("user.blocked"));
        }

        //sysPasswordService.validate(user);

        return createAuthUser(user);
    }

    public UserDetails createAuthUser(SysUser user)
    {
        return new AuthUser(user.getUserId(), user, permissionService.getUserPermission(user));
    }
}
