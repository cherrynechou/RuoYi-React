package com.ruoyi.web.controller.core;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.entity.SysPermission;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.common.utils.TreeBuilder;
import com.ruoyi.system.service.ISysPermissionService;
import com.ruoyi.web.converter.SysPermissionConverter;
import com.ruoyi.web.vo.SysPermissionVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class SysPermissionController extends BaseController
{
    @Autowired
    private ISysPermissionService permissionService;

    @PreAuthorize("@securityValidator.hasPermission('system:permission:list')")
    @GetMapping("/permissions")
    public ResponseData index()
    {
        List<SysPermission> list = permissionService.selectPermissionList();
        List<SysPermissionVo> formatList = SysPermissionConverter.INSTANCE.toConvertSysPermissionList(list);
        return JsonResponse.success(TreeBuilder.<SysPermissionVo>buildTreeList(formatList));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:permission:all')")
    @GetMapping("/permission/all")
    public ResponseData getAllPermission()
    {
        List<SysPermission> list = permissionService.selectPermissionList();
        return JsonResponse.success(SysPermissionConverter.INSTANCE.toConvertSysPermissionList(list));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:permission:add')")
    @PostMapping("/permissions")
    public ResponseData store(@RequestBody SysPermission permission)
    {
        return toResponse(permissionService.insertPermission(permission));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:permission:query')")
    @GetMapping("/permissions/{id}")
    public ResponseData show(@PathVariable(value = "id", required = false) Long id)
    {
        return JsonResponse.success(permissionService.findPermissionById(id));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:permission:update')")
    @PutMapping("/permissions/{id}")
    public ResponseData update(@PathVariable(value = "id", required = false) Long id,@RequestBody SysPermission permission)
    {
        return toResponse(permissionService.updatePermission(id,permission));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:permission:delete')")
    @DeleteMapping("/permissions/{id}")
    public ResponseData destroy(@PathVariable Long id)
    {
        return toResponse(permissionService.deletePermissionById(id));
    }

}

