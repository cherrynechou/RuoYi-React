package com.ruoyi.system.mapper;


import com.ruoyi.system.domain.entity.SysRoleMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysRoleMenuMapper
{
    public List<SysRoleMenu> selectRoleListByMenuId(Long menuId);


    /**
     * 批量删除用户和角色关联
     *
     * @param ids 需要删除的数据ID
     * @return 结果
     */
    public int deleteRoleMenu(Long[] ids);


    /**
     * 批量新增用户角色信息
     *
     * @return 结果
     */
    public int batchInsertMenuRole(@Param("menuId") Long menuId, @Param("roleIds") Long[] roleIds);
}
