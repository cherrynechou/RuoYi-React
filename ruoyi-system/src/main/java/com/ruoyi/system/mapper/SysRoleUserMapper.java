package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.entity.SysRoleUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface SysRoleUserMapper
{
    public List<SysRoleUser> selectUserRoleListByUserId(Long id);

    /**
     * 批量删除用户和角色关联
     *
     * @param roleIds 需要删除的数据ID
     * @return 结果
     */
    public int deleteUserRole(@Param("userId") Long userId, @Param("roleIds") Long[] roleIds);

    /**
     * 批量新增用户角色信息
     *
     * @return 结果
     */
    public int batchInsertUserRole(@Param("userId") Long userId,@Param("roleIds") Long[] roleIds);

}
