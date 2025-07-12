package com.ruoyi.system.service.impl;

import com.ruoyi.system.domain.entity.SysDictData;
import com.ruoyi.system.mapper.SysDictDataMapper;
import com.ruoyi.system.service.ISysDictDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysDictDataServiceImpl implements ISysDictDataService
{
    private static final Logger log = LoggerFactory.getLogger(SysDictDataServiceImpl.class);

    @Autowired
    private SysDictDataMapper sysDictDataMapper;

    @Override
    public List<SysDictData> selectDictDataList(SysDictData dictData) {
        return sysDictDataMapper.selectDictDataList(dictData);
    }

    @Override
    public List<SysDictData> selectDataListByDictCode(String dictCode){
        return sysDictDataMapper.selectDataListByDictCode(dictCode);
    }

    @Override
    public SysDictData findDictDataById(Long dictDataId) {
        return sysDictDataMapper.findDictDataById(dictDataId);
    }

    @Override
    public int insertDictData(SysDictData dictData) {
        return sysDictDataMapper.insertDictData(dictData);
    }

    @Override
    public int updateDictData(Long id, SysDictData dictData) {
        return sysDictDataMapper.updateDictData(id, dictData);
    }

    @Override
    public int clearDictDataDefault(String dictCode){
        return sysDictDataMapper.clearDictDataDefault(dictCode);
    }

    @Override
    public int setDictDataDefault(Long id) {
        return sysDictDataMapper.setDictDataDefault(id);
    }

    @Override
    public int deleteDictDataById(Long id) {
        return sysDictDataMapper.deleteDictDataById(id);
    }

    @Override
    public int deleteDictDataByIds(Long[] ids) {
        return 0;
    }
}
