package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.entity.SysDictData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysDictDataMapper
{
    public List<SysDictData> selectDictDataList(SysDictData dictData);

    public List<SysDictData> selectDataListByDictCode(String dictCode);

    public SysDictData findDictDataById(Long id);

    public int insertDictData(SysDictData dictData);

    public int updateDictData(@Param("id") Long id, @Param("dictData") SysDictData dictData);

    public int clearDictDataDefault(@Param("code") String code);

    public int setDictDataDefault(@Param("id") Long id);

    public int deleteDictDataById(Long id);

    public int deleteDictDataByIds(Long[] ids);
}
