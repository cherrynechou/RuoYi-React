package com.ruoyi.web.vo;

import com.ruoyi.common.core.domain.BaseVo;

import java.util.Set;

/**
 *  /currentUser 的数据格式
 */
public class AuthUserVo extends BaseVo
{
    private Long userId;

    private String userName;

    private String nickName;

    /** 角色对象 */
    private Set<String> roles;

    private Set<String> allPermissions;

    private String avatarUrl;

    private boolean isAdmin;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickname(String nickName) {
        this.nickName = nickName;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public static boolean isAdmin(Long userId)
    {
        return userId != null && 1L == userId;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Set<String> getAllPermissions() {
        return allPermissions;
    }

    public void setAllPermissions(Set<String> allPermissions) {
        this.allPermissions = allPermissions;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

}
