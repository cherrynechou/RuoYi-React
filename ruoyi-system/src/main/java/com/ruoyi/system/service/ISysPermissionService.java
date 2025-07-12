package com.ruoyi.system.service;

import com.ruoyi.common.core.domain.entity.SysPermission;

import java.util.List;

public interface ISysPermissionService
{
    public List<SysPermission> selectPermissionList();

    public SysPermission findPermissionById(Long id);

    public int insertPermission(SysPermission permission);

    public int updatePermission(Long id,SysPermission permission);

    public int deletePermissionById(Long id);

    public int deletePermissionByIds(Long[] ids);
}
