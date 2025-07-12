package com.ruoyi.system.mapper;

import com.ruoyi.common.core.domain.entity.SysRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysRoleMapper
{
    public List<SysRole> selectRoleList(SysRole role);

    public List<SysRole> selectRoleListByUserId(Long userId);

    public List<String> selectPermsByRoleId(@Param("roleId") Long roleId);

    public SysRole findRoleById(Long id);

    public int insertRole(SysRole role);

    public int updateRole(@Param("id") Long id, @Param("role") SysRole role);

    public int deleteRoleById(Long id);

    public int deleteRoleByIds(Long[] ids);
}
