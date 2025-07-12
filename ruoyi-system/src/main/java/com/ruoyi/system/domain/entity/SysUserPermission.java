package com.ruoyi.system.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;

public class SysUserPermission extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    private Long userId;

    private Long permissionId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Long permissionId) {
        this.permissionId = permissionId;
    }
}
