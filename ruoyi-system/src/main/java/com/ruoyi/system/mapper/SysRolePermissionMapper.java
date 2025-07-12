package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.entity.SysRolePermission;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysRolePermissionMapper
{
    public List<SysRolePermission> selectRolePermissionListByRoleId(Long roleId);

    public int deleteRolePermission(@Param("roleId") Long roleId, @Param("permissionIds") Long[] permissionIds);

    public int batchInsertRolePermission(@Param("roleId") Long roleId,  @Param("permissionIds") Long[] permissionIds);
}
