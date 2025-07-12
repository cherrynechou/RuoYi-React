package com.ruoyi.system.domain.entity;

import com.ruoyi.common.core.domain.BaseEntity;
import com.ruoyi.common.core.domain.entity.SysRole;

import java.util.List;

public class SysDict extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    private Long dictId;

    private String name;

    private String code;

    private Integer type;

    private Integer status;

    private String remark;

    private List<SysDictData> dataList;

    public Long getDictId() {
        return dictId;
    }

    public void setDictId(Long dictId) {
        this.dictId = dictId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<SysDictData> getDataList() {
        return dataList;
    }

    public void setDataList(List<SysDictData> dataList) {
        this.dataList = dataList;
    }
}
