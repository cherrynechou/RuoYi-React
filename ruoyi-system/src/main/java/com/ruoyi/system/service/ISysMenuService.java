package com.ruoyi.system.service;

import com.ruoyi.common.core.domain.entity.SysMenu;

import java.util.List;

public interface ISysMenuService
{

    /**
     * 根据用户ID查询菜单树信息
     *
     * @param userId 用户ID
     * @return 菜单列表
     */
    public List<SysMenu> findMenuTreeByUserId(Long userId);


    /**
     *
     * @return 菜单列表搜索条件
     */
    public List<SysMenu> selectMenuList(SysMenu menu);



    /**
     *
     * @param menuId 菜单id
     * @return 菜单列表
     */
    public SysMenu findMenuById(Long menuId);


    public int insertMenu(SysMenu menu);


    public int updateMenu(Long id, SysMenu menu);

    /**
     * 更改菜单状态
     * @param menuId
     * @param sysMenu
     * @return
     */
    public int updateMenuVisible(Long menuId, SysMenu sysMenu);


    public int deleteMenuById(Long id);

    public int deleteMenuByIds(Long[] ids);
}
