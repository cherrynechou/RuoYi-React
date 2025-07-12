package com.ruoyi.web.converter;

import com.ruoyi.common.core.domain.entity.SysRole;
import com.ruoyi.web.vo.SysRoleVo;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface SysRoleConverter
{
    SysRoleConverter INSTANCE = Mappers.getMapper(SysRoleConverter.class);

    @Mapping(target = "isAdmin", ignore = true)
    SysRoleVo toConvertSysRoleVo(SysRole role);


    default List<SysRoleVo> toConvertSysRoleVoList(List<SysRole> roleList)
    {
        if(roleList == null) {
            return null;
        }

        List<SysRoleVo> list = new ArrayList<>();
        for(SysRole sysRole: roleList){
            list.add(toConvertSysRoleVo(sysRole));
        }

        return list;
    }

    @AfterMapping
    default void afterMapping(SysRole role, @MappingTarget SysRoleVo roleVo)
    {
        roleVo.setIsAdmin(role.isAdmin());
    }
}
