package com.ruoyi.system.service.impl;

import com.ruoyi.system.domain.entity.SysDict;
import com.ruoyi.system.mapper.SysDictMapper;
import com.ruoyi.system.service.ISysDictService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SysDictServiceImpl implements ISysDictService
{

    private static final Logger log = LoggerFactory.getLogger(SysDictServiceImpl.class);

    @Autowired
    private SysDictMapper sysDictMapper;


    @Override
    public List<SysDict> selectDictList(SysDict dict) {
        return sysDictMapper.selectDictList(dict);
    }

    @Override
    public List<SysDict> selectDictWithDataList(String code) { return sysDictMapper.selectDictWithDataList(code); }

    @Override
    public SysDict findDictById(Long id) {
        return sysDictMapper.findDictById(id);
    }

    @Override
    public int insertDict(SysDict dict) {
        return sysDictMapper.insertDict(dict);
    }

    @Override
    @Transactional
    public int updateDict(Long id,SysDict dict) {
        return sysDictMapper.updateDict(id, dict);
    }

    @Override
    public int deleteDictById(Long id) {
        return sysDictMapper.deleteDictById(id);
    }

    @Override
    public int deleteDictByIds(Long[] ids) {
        return 0;
    }
}
