package com.ruoyi.system.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;

public class SysUserMenu extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    private Long userId;

    private Long menuId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }
}
