package com.ruoyi.common.core.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;
import java.util.Map;

public class BaseVo
{
    private Date createdAt;

    private Date updatedAt;

    /** 请求参数 */
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Map<String, Object> params;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
