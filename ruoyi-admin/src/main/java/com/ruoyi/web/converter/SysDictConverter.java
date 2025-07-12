package com.ruoyi.web.converter;

import com.ruoyi.system.domain.entity.SysDict;
import com.ruoyi.web.vo.SysDictVo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SysDictConverter
{
    SysDictConverter INSTANCE = Mappers.getMapper(SysDictConverter.class);

    SysDictVo toConvertSysDictVo(SysDict sysDict);


}
