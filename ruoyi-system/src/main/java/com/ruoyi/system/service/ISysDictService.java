package com.ruoyi.system.service;

import com.ruoyi.system.domain.entity.SysDict;

import java.util.List;

public interface ISysDictService
{
    /**
     * 根据条件分页查询字典类型
     *
     * @param dict 字典类型信息
     * @return 字典类型集合信息
     */
    public List<SysDict> selectDictList(SysDict dict);


    public List<SysDict> selectDictWithDataList(String code) ;

    /**
     * 通过用户Id查询字典
     *
     * @param id 用户id
     * @return 用户对象信息
     */
    public SysDict findDictById(Long id);


    /**
     * 新增保存字典类型信息
     *
     * @param dict 字典类型信息
     * @return 结果
     */
    public int insertDict(SysDict dict);


    /**
     * 修改保存字典类型信息
     *
     * @param dict 字典类型信息
     * @return 结果
     */
    public int updateDict(Long id, SysDict dict);

    public int deleteDictById(Long id);

    public int deleteDictByIds(Long[] ids);
}
