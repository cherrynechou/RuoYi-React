package com.ruoyi.system.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;

public class SysRoleUser extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    private Long roleId;

    private Long userId;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
