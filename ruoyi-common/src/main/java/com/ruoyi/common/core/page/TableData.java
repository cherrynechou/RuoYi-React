package com.ruoyi.common.core.page;

import com.ruoyi.common.utils.PageUtils;

import java.io.Serializable;
import java.util.List;

/**
 * 表格分页数据对象
 *
 * @author ruoyi
 */
public class TableData implements Serializable
{
    private static final long serialVersionUID = 1L;

    /** 列表数据 */
    private List<?> rows;

    private Pagination pagination = new Pagination();

    /**
     * 设置请求分页数据
     */
    protected void startPage()
    {
        PageUtils.startPage();
    }

    /**
     * 清理分页的线程变量
     */
    protected void clearPage()
    {
        PageUtils.clearPage();
    }

    public List<?> getRows()
    {
        return rows;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }

    public void setRows(List<?> rows)
    {
        this.rows = rows;
    }


}
