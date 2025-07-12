package com.ruoyi.web.converter;

import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.common.utils.FormatDataUtils;
import com.ruoyi.web.vo.SysUserVo;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface SysUserConverter
{
    SysUserConverter INSTANCE = Mappers.getMapper(SysUserConverter.class);

    @Mapping(target = "isAdmin", ignore = true)
    @Mapping(target = "avatarUrl", ignore = true)
    SysUserVo toConvertSysUserVo(SysUser user);

    default List<SysUserVo> toConvertSysUserVoList(List<SysUser> userList)
    {
        if(userList == null){
            return null;
        }
        List<SysUserVo> list = new ArrayList<>();
        for (SysUser sysUser : userList){
            list.add(toConvertSysUserVo(sysUser));
        }

        return list;
    }

    @AfterMapping
    default void afterMapping(SysUser user, @MappingTarget SysUserVo userVo)
    {
        userVo.setIsAdmin(user.isAdmin());
        userVo.setAvatarUrl(FormatDataUtils.formatAvatar(user.getAvatar()));
    }

}
