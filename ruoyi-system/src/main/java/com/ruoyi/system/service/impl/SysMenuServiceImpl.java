package com.ruoyi.system.service.impl;

import com.ruoyi.common.core.domain.entity.SysMenu;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.system.mapper.SysMenuMapper;
import com.ruoyi.system.service.ISysMenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SysMenuServiceImpl implements ISysMenuService
{
    private static final Logger log = LoggerFactory.getLogger(SysMenuServiceImpl.class);

    @Autowired
    private SysMenuMapper menuMapper;

    @Override
    public List<SysMenu> selectMenuList(SysMenu menu) {
        return menuMapper.selectMenuList(menu);
    }

    /**
     * 根据用户ID查询菜单
     *
     * @param userId 用户名称
     * @return 菜单列表
     */
    @Override
    public List<SysMenu> findMenuTreeByUserId(Long userId)
    {
        if (SecurityUtils.isAdmin(userId))
        {
            return menuMapper.selectMenuList(null);
        }else{
            return menuMapper.findMenuListByUserId(userId);
        }
    }


    @Override
    public SysMenu findMenuById(Long menuId) {
        return menuMapper.findMenuById(menuId);
    }

    @Override
    @Transactional
    public int insertMenu(SysMenu menu) {
        return menuMapper.insertMenu(menu);
    }

    @Override
    public int updateMenu(Long id, SysMenu menu) {
        return menuMapper.updateMenu(id,menu);
    }


    @Override
    @Transactional
    public int updateMenuVisible(Long menuId, SysMenu menu){
        return menuMapper.updateMenuVisible(menuId,menu);
    }

    @Override
    public int deleteMenuById(Long id) {
        return menuMapper.deleteMenuById(id);
    }

    @Override
    public int deleteMenuByIds(Long[] ids) {
        return menuMapper.deleteMenuByIds(ids);
    }
}
