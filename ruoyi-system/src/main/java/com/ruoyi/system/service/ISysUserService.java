package com.ruoyi.system.service;

import com.ruoyi.common.core.domain.entity.SysUser;

import java.util.List;

public interface ISysUserService
{
    /**
     * 获取用户列表
     *
     * @return 结果
     */
    public List<SysUser> selectUserList(SysUser sysUser);

    /**
     * 通过用户名查询用户
     *
     * @param userName 用户名
     * @return 用户对象信息
     */
    public SysUser findUserByUserName(String userName);


    /**
     * 通过用户名查询用户
     *
     * @param id 用户id
     * @return 用户对象信息
     */
    public SysUser findUserById(Long id);


    public void checkUserAllowed(SysUser user);


    public int insertUser(SysUser user);


    /**
     * 修改用户基本信息
     *
     * @param user 用户信息
     * @return 结果
     */
    public int updateUserProfile(Long id, SysUser user);


    public int updateUser(Long id, SysUser user);

    /**
     * 校验用户名称是否唯一
     *
     * @param user 用户信息
     * @return 结果
     */
    public boolean checkUserNameUnique(SysUser user);


    public int deleteUserById(Long id);

    public int deleteUserByIds(Long[] ids);

}
