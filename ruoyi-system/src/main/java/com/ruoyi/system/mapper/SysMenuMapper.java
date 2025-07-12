package com.ruoyi.system.mapper;

import com.ruoyi.common.core.domain.entity.SysMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysMenuMapper
{
    /**
     * 查询 所有菜单列表
     * @return
     */
    public List<SysMenu> selectMenuList(SysMenu menu);

    /**
     * 查询当用户菜单列表
     * @return
     */
    public List<SysMenu> findMenuListByUserId(Long userId);


    /**
     * 根据菜单ID查询信息
     *
     * @param menuId 菜单ID
     * @return 菜单信息
     */
    public SysMenu findMenuById(Long menuId);

    /**
     *插入菜单
     * @param menu
     * @return
     */
    public int insertMenu(SysMenu menu);

    /**
     * 更新菜单
     * @return
     */
    public int updateMenu(@Param("id") Long id, @Param("menu") SysMenu menu);

    public int updateMenuVisible(@Param("id") Long id, @Param("menu") SysMenu menu);

    public int deleteMenuById(Long id);

    public int deleteMenuByIds(Long[] ids);
}
