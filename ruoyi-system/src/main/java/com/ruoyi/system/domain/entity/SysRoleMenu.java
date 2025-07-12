package com.ruoyi.system.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;

public class SysRoleMenu extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    private Long roleId;

    private Long menuId;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }
}
