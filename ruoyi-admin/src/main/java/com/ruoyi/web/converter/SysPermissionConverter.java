package com.ruoyi.web.converter;

import com.ruoyi.common.core.domain.entity.SysPermission;
import com.ruoyi.common.utils.MessageUtils;
import com.ruoyi.web.vo.SysPermissionVo;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface SysPermissionConverter
{
    SysPermissionConverter INSTANCE = Mappers.getMapper(SysPermissionConverter.class);

    SysPermissionVo toConvertSysPermissionVo(SysPermission sysPermission);

    default List<SysPermissionVo> toConvertSysPermissionList(List<SysPermission> permissionList)
    {
        if(permissionList == null)
        {
            return null;
        }

        List<SysPermissionVo> list = new ArrayList<>();
        for (SysPermission sysPermission: permissionList){
            list.add(toConvertSysPermissionVo(sysPermission));
        }

        return list;
    }

    @AfterMapping
    default void afterMapping(SysPermission sysPermission,@MappingTarget SysPermissionVo sysPermissionVo)
    {
        sysPermissionVo.setTitle(MessageUtils.message(sysPermission.getLocale()));
    }
}
