package com.ruoyi.web.controller.core;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.system.domain.entity.SysDict;
import com.ruoyi.system.service.ISysDictService;
import com.ruoyi.web.converter.SysDictConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class SysDictController extends BaseController
{
    @Autowired
    private ISysDictService dictService;

    @PreAuthorize("@securityValidator.hasPermission('system:dict:list')")
    @GetMapping("/auth/dicts")
    public ResponseData index(SysDict dict)
    {
        startPage();
        List<SysDict> list = dictService.selectDictList(dict);
        return JsonResponse.success(list);
    }

    @PreAuthorize("@securityValidator.hasPermission('system:dict:add')")
    @PostMapping("/auth/dicts")
    public ResponseData store(@RequestBody SysDict dict)
    {
        return JsonResponse.success(dictService.insertDict(dict));
    }


    @PreAuthorize("@securityValidator.hasPermission('system:dict:query')")
    @GetMapping("/auth/dicts/{id}")
    public ResponseData show(@PathVariable(value = "id", required = false) Long id)
    {
        SysDict dict = dictService.findDictById(id);
        return JsonResponse.success(SysDictConverter.INSTANCE.toConvertSysDictVo(dict));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:dict:update')")
    @PutMapping("/auth/dicts/{id}")
    public ResponseData update(@PathVariable(value = "id", required = false) Long id,@RequestBody SysDict dict)
    {
        return toResponse(dictService.updateDict(id,dict));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:dict:delete')")
    @DeleteMapping("/auth/dicts/{id}")
    public ResponseData destroy(@PathVariable(value = "id", required = false) Long id)
    {
        return toResponse(dictService.deleteDictById(id));
    }

}
