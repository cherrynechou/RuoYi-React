package com.ruoyi.system.mapper;

import com.ruoyi.common.core.domain.entity.SysPermission;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysPermissionMapper
{
    public List<SysPermission> selectPermissionList();

    public SysPermission findPermissionById(Long id);

    public int insertPermission(SysPermission permission);

    public int updatePermission(@Param("id") Long id, @Param("permission") SysPermission permission);

    public int deletePermissionById(Long id);

    public int deletePermissionByIds(Long[] ids);
}
