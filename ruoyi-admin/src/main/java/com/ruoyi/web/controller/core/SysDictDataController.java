package com.ruoyi.web.controller.core;

import com.ruoyi.common.constant.Constants;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.domain.entity.SysDict;
import com.ruoyi.system.domain.entity.SysDictData;
import com.ruoyi.system.service.ISysDictDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SysDictDataController extends BaseController
{
    @Autowired
    private ISysDictDataService dictDataService;

    @PreAuthorize("@securityValidator.hasPermission('system:dict-data:list')")
    @GetMapping("/auth/dict/datas")
    public ResponseData index(SysDictData dictData)
    {
        startPage();
        List<SysDictData> list = dictDataService.selectDictDataList(dictData);
        return JsonResponse.success(getDataTable(list));
    }

    @GetMapping("/auth/dict/{code}/dataList")
    public ResponseData getDictData(@PathVariable(value = "code", required = false) String code)
    {
        List<SysDictData> dataList = dictDataService.selectDataListByDictCode(code);
        if(StringUtils.isNull(dataList)){
            dataList = new ArrayList<SysDictData>();
        }
        return JsonResponse.success(dataList);
    }

    @PostMapping("/auth/dict/datas")
    public ResponseData store(@RequestBody SysDictData dictData)
    {
        //若添加code是第一条，则为默认值
        List<SysDictData> list = dictDataService.selectDataListByDictCode(dictData.getCode());
        if(list.isEmpty()){
            dictData.setIsDefault(Constants.DEFAULT_YES_VALUE);
        }

        return toResponse(dictDataService.insertDictData(dictData));
    }

    @GetMapping("/auth/dict/datas/{id}")
    public ResponseData show(@PathVariable(value = "id", required = false) Long id)
    {
        return JsonResponse.success(dictDataService.findDictDataById(id));
    }

    @PutMapping("/auth/dict/datas/{id}")
    public ResponseData update(@PathVariable(value = "id", required = false) Long id, @RequestBody SysDictData dictData)
    {
        return JsonResponse.success(dictDataService.updateDictData(id, dictData));
    }

    @PutMapping("/auth/dict/setDefault/{id}")
    public ResponseData setDictDataDefault(@PathVariable(value = "id", required = false) Long id, @RequestBody SysDictData dictData)
    {
        dictDataService.clearDictDataDefault(dictData.getCode());
        dictDataService.setDictDataDefault(id);

        return JsonResponse.success();
    }

    @DeleteMapping("/auth/dict/datas/{id}")
    public ResponseData destroy(@PathVariable(value = "id", required = false) Long id)
    {
        return JsonResponse.success(dictDataService.deleteDictDataById(id));
    }

}
