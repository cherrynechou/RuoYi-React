package com.ruoyi.common.core.controller;

import com.ruoyi.common.constant.HttpStatus;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.common.core.page.TableData;
import com.ruoyi.common.core.page.Pagination;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.common.utils.PageUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import java.beans.PropertyEditorSupport;
import java.util.Date;
import java.util.List;

public class BaseController
{
    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
      * 将前台传递过来的日期格式的字符串，自动转化为Date类型
     */
    @InitBinder
    public void initBinder(WebDataBinder binder)
    {
        // Date 类型转换
        binder.registerCustomEditor(Date.class, new PropertyEditorSupport()
        {
            @Override
            public void setAsText(String text)
            {
                setValue(DateUtils.parseDate(text));
            }
        });
    }

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

    /**
     * 响应请求分页数据
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    protected TableData getDataTable(List<?> rows)
    {
        TableData rspData = new TableData();
        Pagination pagination = new Pagination();

        //总条数
        pagination.setTotal(new PageInfo(rows).getTotal());
        //每页个数
        pagination.setCount(new PageInfo(rows).getPageSize());

        pagination.setPerPage(new PageInfo(rows).getPrePage());
        //当前页码
        pagination.setCurrentPage(new PageInfo(rows).getPageNum());
        //总页数
        pagination.setTotalPage(new PageInfo(rows).getPages());

        rspData.setPagination(pagination);
        rspData.setRows(rows);
        return rspData;
    }


    protected TableData getConverterTableData(List<?> rows,List<?> formatRows)
    {
        TableData rspData = getDataTable(rows);
        rspData.setRows(formatRows);
        return rspData;
    }

    /**
     * 响应返回结果
     *
     * @param rows 影响行数
     * @return 操作结果
     */
    protected ResponseData toResponse(int rows)
    {
        return rows > 0 ? JsonResponse.success() : JsonResponse.failed();
    }

    public ResponseData failed(){
        return JsonResponse.failed();
    }

    public ResponseData failed(String message){
        return JsonResponse.failed(message);
    }

    public ResponseData success(String message)
    {
        return JsonResponse.success(message);
    }


}
