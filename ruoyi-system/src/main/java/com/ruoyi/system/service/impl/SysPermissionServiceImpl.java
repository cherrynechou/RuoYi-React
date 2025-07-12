package com.ruoyi.system.service.impl;

import com.ruoyi.common.core.domain.entity.SysPermission;
import com.ruoyi.system.mapper.SysPermissionMapper;
import com.ruoyi.system.service.ISysPermissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysPermissionServiceImpl implements ISysPermissionService
{
    private static final Logger log = LoggerFactory.getLogger(SysPermissionServiceImpl.class);

    @Autowired
    private SysPermissionMapper sysPermissionMapper;

    @Override
    public List<SysPermission> selectPermissionList()
    {
        return sysPermissionMapper.selectPermissionList();
    }

    @Override
    public SysPermission findPermissionById(Long permissionId)
    {
        return sysPermissionMapper.findPermissionById(permissionId);
    }

    @Override
    public int insertPermission(SysPermission permission) {
        return sysPermissionMapper.insertPermission(permission);
    }

    @Override
    public int updatePermission(Long id, SysPermission permission) {
        return sysPermissionMapper.updatePermission(id, permission);
    }

    @Override
    public int deletePermissionById(Long id) {
        return 0;
    }

    @Override
    public int deletePermissionByIds(Long[] ids) {
        return 0;
    }

}
