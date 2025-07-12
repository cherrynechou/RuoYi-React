package com.ruoyi.common.core.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;
import com.ruoyi.common.core.tree.TreeNode;

import java.util.List;

public class SysPermission extends BaseEntity implements TreeNode<SysPermission>
{
    private static final long serialVersionUID = 1L;

    /** 权限ID */
    private Long permissionId;

    /** 权限名称 **/
    private String name;

    private String locale;

    private Integer type;

    /** 标识 **/
    private String slug;

    /** 父级ID */
    private Long parentId;

    /** 排序 **/
    private Integer sort;

    /**
     * 子
     */
    private List<SysPermission> children;

    public Long getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Long permissionId) {
        this.permissionId = permissionId;
    }

    @Override
    public Long getCurrentId() {
        return permissionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public List<SysPermission> getChildren() {
        return children;
    }

    public void setChildren(List<SysPermission> children) {
        this.children = children;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }
}
