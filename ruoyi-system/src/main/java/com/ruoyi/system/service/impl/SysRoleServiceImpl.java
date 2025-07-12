package com.ruoyi.system.service.impl;

import com.ruoyi.common.core.domain.entity.SysRole;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.domain.entity.SysRolePermission;
import com.ruoyi.system.domain.entity.SysRoleUser;
import com.ruoyi.system.mapper.SysRoleMapper;
import com.ruoyi.system.mapper.SysRoleMenuMapper;
import com.ruoyi.system.mapper.SysRolePermissionMapper;
import com.ruoyi.system.mapper.SysRoleUserMapper;
import com.ruoyi.system.service.ISysRoleService;
import org.apache.commons.collections4.SetUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SysRoleServiceImpl implements ISysRoleService
{
    private static final Logger log = LoggerFactory.getLogger(SysRoleServiceImpl.class);

    @Autowired
    private SysRoleMapper sysRoleMapper;

    @Autowired
    private SysRolePermissionMapper sysRolePermissionMapper;

    @Autowired
    private SysRoleMenuMapper sysRoleMenuMapper;

    @Autowired
    private SysRoleUserMapper sysRoleUserMapper;

    @Override
    public List<SysRole> selectRoleList(SysRole role) {
        return sysRoleMapper.selectRoleList(role);
    }

    @Override
    public Set<String> selectPermsByRoleId(Long roleId) {
        List<String> perms = sysRoleMapper.selectPermsByRoleId(roleId);
        Set<String> permsSet = new HashSet<>();
        for (String perm : perms)
        {
            if (StringUtils.isNotEmpty(perm))
            {
                permsSet.addAll(Arrays.asList(perm.trim().split(",")));
            }
        }
        return permsSet;
    }

    @Override
    public Set<String> selectRoleListByUserId(Long userId) {
        List<SysRole> roles = sysRoleMapper.selectRoleListByUserId(userId);
        Set<String> permsSet = new HashSet<>();

        for (SysRole role : roles)
        {
            if (StringUtils.isNotNull(role))
            {
                permsSet.addAll(Arrays.asList(role.getSlug().trim().split(",")));
            }
        }

        return permsSet;
    }

    @Override
    public SysRole findRoleById(Long id) {
        return sysRoleMapper.findRoleById(id);
    }

    @Override
    @Transactional
    public int insertRole(SysRole role) {
        return sysRoleMapper.insertRole(role);
    }

    @Override
    @Transactional
    public int updateRole(Long id, SysRole role) {
        return sysRoleMapper.updateRole(id ,role);
    }

    /**
     * 获取角色权限列表
     * @param roleId
     * @return
     */
    @Override
    public List<Long> selectRolePermissionIdsByRoleId(Long roleId) {
        List<SysRolePermission> list =  sysRolePermissionMapper.selectRolePermissionListByRoleId(roleId);

        return list.stream().map(SysRolePermission::getPermissionId).collect(Collectors.toList());
    }

    @Override
    public List<Long> getUserRoleIdsByUserId(Long userId)
    {
        List<SysRoleUser> list = sysRoleUserMapper.selectUserRoleListByUserId(userId);

        return list.stream().map(SysRoleUser::getRoleId).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public int updateRolePermission(Long roleId, SysRole role) {

        List<Long> beforeList = selectRolePermissionIdsByRoleId(roleId);

        List<Long> rolePermissionIds = new ArrayList<>(Arrays.asList(role.getPermissionIds()));

        //之前的集合
        Set<Long> beforeSet = new HashSet<Long>(beforeList);
        Set<Long> afterSet = new HashSet<Long>(rolePermissionIds);

        Set<Long> deleteSet= SetUtils.difference(beforeSet,afterSet);
        Set<Long> addSet= SetUtils.difference(afterSet,beforeSet);


        //更新用户角色关系
        //删除
        if(!deleteSet.isEmpty()){
            int result = sysRolePermissionMapper.deleteRolePermission(roleId, deleteSet.toArray(new Long[0]));
        }

        //添加
        if(!addSet.isEmpty()){
            int result = sysRolePermissionMapper.batchInsertRolePermission(roleId,addSet.toArray(new Long[0]));
        }

        return 0;
    }
}
