package com.ruoyi.system.service;

import com.ruoyi.common.core.domain.entity.SysRole;

import java.util.List;
import java.util.Set;

public interface ISysRoleService
{
    public List<SysRole> selectRoleList(SysRole role);

    /**
     * 获取当前角色权限
     * @param roleId
     * @return
     */
    public Set<String> selectPermsByRoleId(Long roleId);

    public Set<String> selectRoleListByUserId(Long userId);

    public SysRole findRoleById(Long id);

    /**
     * 新增角色信息
     *
     * @param role 角色信息
     * @return 结果
     */
    public int insertRole(SysRole role);

    /**
     * 修改角色信息
     * @param role 角色信息
     * @return 结果
     */
    public int updateRole(Long id, SysRole role);


    public List<Long> selectRolePermissionIdsByRoleId(Long roleId);

    public List<Long> getUserRoleIdsByUserId(Long userId);

    public int updateRolePermission(Long roleId, SysRole role);
}
