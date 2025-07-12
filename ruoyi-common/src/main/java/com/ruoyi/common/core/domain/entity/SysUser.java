package com.ruoyi.common.core.domain.entity;

import cn.idev.excel.annotation.ExcelIgnore;
import cn.idev.excel.annotation.ExcelProperty;
import cn.idev.excel.annotation.write.style.ColumnWidth;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.ruoyi.common.core.domain.BaseEntity;

import java.util.Date;
import java.util.List;

public class SysUser extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 用户ID */
    @ExcelProperty(value="Id")
    @ColumnWidth(5)
    private Long userId;

    /** 登录用户名 */
    @ExcelProperty(value="用户帐号")
    @ColumnWidth(15)
    private String userName;

    /** 密码 */
    @ExcelIgnore
    private String password;

    /** 用户名称 */
    @ExcelProperty(value="用户名")
    @ColumnWidth(16)
    private String nickName;

    /** 邮箱 */
    @ExcelIgnore
    private String email;

    /** 电话 */
    @ExcelIgnore
    private String telephone;

    /** 性别 */
    @ExcelIgnore
    private Integer sex;

    /** 头像 */
    @ExcelIgnore
    private String avatar;

    /** 状态 */
    @ExcelIgnore
    private Integer status;

    /** 登录状态 **/
    @ExcelIgnore
    private int loginCount;

    /** 上一次登录IP **/
    @ExcelIgnore
    private String lastLoginIp;

    /** 上一次登录时间 **/
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ExcelIgnore
    private Date lastLoginTime;

    /** 排序 **/
    @ExcelIgnore
    private Integer sort;

    /** 角色对象 */
    @ExcelIgnore
    private List<SysRole> roles;

    /** 角色组 */
    @ExcelIgnore
    private Long[] roleIds;

    @ExcelIgnore
    private String remark;

    /** 创建时间 */
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ExcelIgnore
    private Date createdAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ExcelIgnore
    private Date updatedAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ExcelIgnore
    private Date deletedAt;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isAdmin()
    {
        return isAdmin(this.userId);
    }

    public static boolean isAdmin(Long userId)
    {
        return userId != null && 1L == userId;
    }

    public Long[] getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(Long[] roleIds) {
        this.roleIds = roleIds;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public int getLoginCount() {
        return loginCount;
    }

    public void setLoginCount(int loginCount) {
        this.loginCount = loginCount;
    }

    public String getLastLoginIp() {
        return lastLoginIp;
    }

    public void setLastLoginIp(String lastLoginIp) {
        this.lastLoginIp = lastLoginIp;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<SysRole> getRoles() {
        return roles;
    }

    public void setRoles(List<SysRole> roles) {
        this.roles = roles;
    }

    public Date getDeletedAt()
    {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt)
    {
        this.deletedAt = deletedAt;
    }
}
