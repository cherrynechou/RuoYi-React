package com.ruoyi.web.vo;

import com.ruoyi.common.core.domain.BaseVo;
import com.ruoyi.common.core.tree.TreeNode;

import java.util.List;

public class SysPermissionVo extends BaseVo implements TreeNode<SysPermissionVo>
{
    /** 权限ID */
    private Long permissionId;

    /** 权限名称 **/
    private String name;

    private String title;

    private String locale;

    private Integer type;

    /** 标识 **/
    private String slug;

    /** 父级ID */
    private Long parentId;

    /** 排序 **/
    private Integer sort;

    private List<SysPermissionVo> children;

    public Long getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Long permissionId) {
        this.permissionId = permissionId;
    }

    public Long getCurrentId()
    {
        return permissionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public List<SysPermissionVo> getChildren() {
        return children;
    }

    public void setChildren(List<SysPermissionVo> children) {
        this.children = children;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }
}
