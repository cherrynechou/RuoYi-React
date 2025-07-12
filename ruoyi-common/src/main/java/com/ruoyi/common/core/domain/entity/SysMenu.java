package com.ruoyi.common.core.domain.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ruoyi.common.core.domain.BaseEntity;
import com.ruoyi.common.core.tree.TreeNode;

import java.util.Date;
import java.util.List;

public class SysMenu extends BaseEntity implements TreeNode<SysMenu>
{
    private static final long serialVersionUID = 1L;

    /** 菜单ID */
    private Long menuId;

    /** 菜单名称  **/
    private String name;

    /** 类型 **/
    private Integer type;

    /**外链地址*/
    private String url;

    /** 国际化标识 **/
    private String locale;

    /** 角色对象 */
    private List<SysRole> roles;

    /** 角色组 */
    private Long[] roleIds;

    /**关联到子对象*/
    private List<SysMenu> children;

    /** 路径 **/
    private String path;

    /** 父级 **/
    private Long parentId;

    /** 目标 **/
    private String target;

    /** 图标 **/
    private String icon;

    /** 排序 **/
    private Integer sort;

    /** 菜单状态（0显示 1隐藏） **/
    private Integer visible;

    /** 菜单状态（0正常 1停用） **/
    private Integer status;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date deletedAt;

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    @Override
    public Long getCurrentId() {
        return menuId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SysRole> getRoles() {
        return roles;
    }

    public void setRoles(List<SysRole> roles) {
        this.roles = roles;
    }

    public Long[] getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(Long[] roleIds) {
        this.roleIds = roleIds;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }



    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public List<SysMenu> getChildren() {
        return children;
    }

    public void setChildren(List<SysMenu> children) {
        this.children = children;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getVisible() {
        return visible;
    }

    public void setVisible(Integer visible) {
        this.visible = visible;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }

}
