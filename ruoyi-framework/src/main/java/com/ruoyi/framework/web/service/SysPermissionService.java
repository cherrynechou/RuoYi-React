package com.ruoyi.framework.web.service;

import com.ruoyi.common.constant.UserConstants;
import com.ruoyi.common.core.domain.entity.SysRole;
import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.service.ISysMenuService;
import com.ruoyi.system.service.ISysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class SysPermissionService
{
    @Autowired
    private ISysRoleService roleService;

    @Autowired
    private ISysMenuService menuService;

    /**
     * 获取用户角色
     */
    public Set<String> getUserRoles(SysUser user)
    {
        Set<String> roles = new HashSet<String>();
        if(user.isAdmin()){
            roles.add("administrator");
        }else{
            roles.addAll(roleService.selectRoleListByUserId(user.getUserId()));
        }

        return roles;
    }


    /**
     * 获取用户权限
     */
    public Set<String> getUserPermission(SysUser user)
    {
        Set<String> perms = new HashSet<String>();

        if(user.isAdmin()){
            perms.add("*:*:*");
        }else{
            List<SysRole> roles = user.getRoles();
            if(!CollectionUtils.isEmpty(roles)){
                for(SysRole role : roles){
                    if (StringUtils.equals(role.getStatus().toString(), UserConstants.ROLE_NORMAL)){
                        Set<String> rolePerms = roleService.selectPermsByRoleId(role.getRoleId());
                        perms.addAll(rolePerms);
                    }
                }
            }
        }

        return perms;
    }
}
