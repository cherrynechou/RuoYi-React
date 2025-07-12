package com.ruoyi.web.vo;

import com.ruoyi.common.core.domain.BaseVo;

public class SysRoleVo extends BaseVo
{
    private Long roleId;

    private String name;

    private String slug;

    private char scope;

    private Integer sort;

    private Integer status;

    private String remark;

    private Boolean isAdmin;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public char getScope() {
        return scope;
    }

    public void setScope(char scope) {
        this.scope = scope;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Boolean getIsAdmin() {
        return isAdmin(this.roleId);
    }

    public void setIsAdmin(Boolean isAdmin)
    {
        this.isAdmin = isAdmin;
    }

    public static boolean isAdmin(Long roleId)
    {
        return roleId != null && 1L == roleId;
    }
}
