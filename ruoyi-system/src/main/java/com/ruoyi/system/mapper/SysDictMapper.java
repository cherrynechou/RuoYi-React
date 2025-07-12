package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.entity.SysDict;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SysDictMapper {
    /**
     * 根据条件分页查询字典类型
     *
     * @param dict 字典类型信息
     * @return 字典类型集合信息
     */
    public List<SysDict> selectDictList(SysDict dict);

    public List<SysDict> selectDictWithDataList(String code);

    public SysDict findDictById(Long dictId);

    public int insertDict(SysDict dict);

    public int updateDict(@Param("id") Long id,@Param("dict") SysDict dict);

    public int deleteDictById(@Param("id") Long id);

    public int deleteDictByIds(Long[] ids);
}