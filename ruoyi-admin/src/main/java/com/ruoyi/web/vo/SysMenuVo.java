package com.ruoyi.web.vo;

import com.ruoyi.common.core.domain.entity.SysRole;
import com.ruoyi.common.core.domain.BaseVo;
import com.ruoyi.common.core.tree.TreeNode;
import java.util.List;

public class SysMenuVo extends BaseVo implements TreeNode<SysMenuVo>
{
    private Long menuId;

    private String name;

    private Integer type;

    private String url;

    private String locale;

    private String path;

    private Long parentId;

    /**
     * 关联到子对象
     */
    private List<SysMenuVo> children;

    /** 角色对象 */
    private List<SysRole> roles;

    /** 角色组 */
    private Long[] roleIds;

    private String target;

    private String icon;

    private Integer visible;

    private Integer status;

    private Integer sort;

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public Long getCurrentId()
    {
        return menuId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long[] getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(Long[] roleIds) {
        this.roleIds = roleIds;
    }

    public List<SysRole> getRoles() {
        return roles;
    }

    public void setRoles(List<SysRole> roles) {
        this.roles = roles;
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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Long getParentId() {
        return parentId;
    }

    public List<SysMenuVo> getChildren() {
        return children;
    }

    public void setChildren(List<SysMenuVo> children) {
        this.children = children;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
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

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }
}
