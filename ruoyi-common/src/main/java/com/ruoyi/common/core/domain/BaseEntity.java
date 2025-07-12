package com.ruoyi.common.core.domain;

import cn.idev.excel.annotation.ExcelIgnore;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class BaseEntity implements Serializable
{
    private static final long serialVersionUID = 1L;

    /** 创建时间 */
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ExcelIgnore
    private Date createdAt;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ExcelIgnore
    private Date updatedAt;

    /** 请求参数 */
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @ExcelIgnore
    private Map<String, Object> params;

    public Date getCreatedAt()
    {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt)
    {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt()
    {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt)
    {
        this.updatedAt = updatedAt;
    }

    public Map<String, Object> getParams()
    {
        if (params == null)
        {
            params = new HashMap<>();
        }
        return params;
    }

    public void setParams(Map<String, Object> params)
    {
        this.params = params;
    }
}
