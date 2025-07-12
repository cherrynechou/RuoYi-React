package com.ruoyi.web.converter;

import com.ruoyi.common.core.domain.entity.SysMenu;
import com.ruoyi.common.utils.MessageUtils;
import com.ruoyi.system.domain.vo.RouterVo;
import com.ruoyi.web.vo.SysMenuVo;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface SysMenuConverter
{
    SysMenuConverter INSTANCE = Mappers.getMapper(SysMenuConverter.class);

    RouterVo toConvertRouterVo(SysMenu sysMenu);

    default List<RouterVo> toConvertRouterVoList(List<SysMenu> menuList)
    {
        if(menuList == null){
            return null;
        }

        List<RouterVo> list = new ArrayList<>();
        for(SysMenu sysMenu: menuList){
            list.add(toConvertRouterVo(sysMenu));
        }

        return list;
    }

    SysMenuVo toConvertSysMenuVo(SysMenu sysMenu);
    List<SysMenuVo> toConvertSysMenuVoList(List<SysMenu> menuList);

    @AfterMapping
    default void afterMapping(SysMenu sysMenu, @MappingTarget RouterVo routerVo) {
        routerVo.setRouteId(sysMenu.getMenuId());
        routerVo.setName(MessageUtils.message(sysMenu.getLocale()));
    }
}
