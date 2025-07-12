package com.ruoyi.system.mapper;

import com.ruoyi.common.core.domain.entity.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysUserMapper
{
    /**
     * 查询所有用户
     * @return SysUser
     */
    public List<SysUser> selectUserList(SysUser sysuser);

    /**
     * 通过用户名查询用户
     * @return SysUser
     */
    public SysUser findUserByUserName(@Param("userName") String userName);


    /**
     * 通过用户id查询用户
     * @return SysUser
     */
    public SysUser findUserById(Long id);


    /**
     * 插入用户
     * @param user
     * @return
     */
    public int insertUser(SysUser user);

    /**
     * 修改用户信息
     *
     * @param user 用户信息
     * @return 结果
     */
    public int updateUser(@Param("id") Long id, @Param("user") SysUser user);


    /**
     * 校验用户名称是否唯一
     *
     * @param userName 用户名称
     * @return 结果
     */
    public SysUser checkUserNameUnique(@Param("userName") String userName);

    /**
     * 删除用户
     * @param id
     * @return
     */
    public int deleteUserById(Long id);

    /**
     * 删除多个用户
     * @param ids
     * @return
     */
    public int deleteUserByIds(Long[] ids);
}
