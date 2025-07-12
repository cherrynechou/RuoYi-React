package com.ruoyi.system.service;

import com.ruoyi.system.domain.entity.SysDictData;

import java.util.List;

public interface ISysDictDataService
{
    public List<SysDictData> selectDictDataList(SysDictData dictData);

    public List<SysDictData> selectDataListByDictCode(String dictCode);

    public SysDictData findDictDataById(Long dictDataId);

    public int insertDictData(SysDictData dictData);

    public int updateDictData(Long id, SysDictData dictData);

    public int clearDictDataDefault(String dictCode);

    public int setDictDataDefault(Long id);

    public int deleteDictDataById(Long id);

    public int deleteDictDataByIds(Long[] ids);
}
