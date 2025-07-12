package com.ruoyi.framework.security.validator;

import com.ruoyi.common.core.domain.model.AuthUser;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.common.constant.Constants;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;
import java.util.Set;

/**
 * 权限验证器
 */
@Component("securityValidator")
public class SecurityValidator
{
    /**
     * 判断是否包含权限
     *
     * @param permission 权限字符串
     * @return 用户是否具备某权限
     */
    public boolean hasPermission(String permission)
    {
        if (StringUtils.isEmpty(permission))
        {
            return false;
        }

        AuthUser loginUser = SecurityUtils.getLoginUser();
        if (StringUtils.isNull(loginUser) || CollectionUtils.isEmpty(loginUser.getPermissions()))
        {
            return false;
        }

        return checkPermission(loginUser.getPermissions(), permission);
    }

    private boolean checkPermission(Set<String> permissions, String permission)
    {
        return permissions.stream().anyMatch(item->matches(item,permission)) ||
                permissions.contains(Constants.ALL_PERMISSION) ||
                permissions.contains(StringUtils.trim(permission));
    }

    private boolean matches(String granted, String required) {
        if (required.endsWith("*")) {
            return granted.startsWith(required.substring(0, required.length() - 1));
        }
        return granted.equals(required);
    }

    public boolean lacksPermission(String permission)
    {
        return !hasPermission(permission);
    }

    public boolean hasAnyPermission(String permission)
    {
        return true;
    }
}
