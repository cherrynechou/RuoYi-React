package com.ruoyi.web.controller.core;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.entity.SysRole;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.common.utils.MessageUtils;
import com.ruoyi.system.service.ISysRoleService;
import com.ruoyi.web.converter.SysRoleConverter;
import com.ruoyi.web.vo.SysRoleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class SysRoleController extends BaseController
{
    @Autowired
    private ISysRoleService roleService;

    @PreAuthorize("@securityValidator.hasPermission('system:role:list')")
    @GetMapping("/roles")
    public ResponseData index(SysRole role)
    {
        startPage();
        List<SysRole> list = roleService.selectRoleList(role);
        List<SysRoleVo> formatList = SysRoleConverter.INSTANCE.toConvertSysRoleVoList(list);
        return JsonResponse.success(getConverterTableData(list,formatList), MessageUtils.message("query.success"));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:role:all')")
    @GetMapping("/role/all")
    public ResponseData getAllRoles()
    {
        return JsonResponse.success(roleService.selectRoleList(null), MessageUtils.message("query.success"));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:role:add')")
    @PostMapping("/auth/roles")
    public ResponseData store(@RequestBody SysRole role)
    {
        return toResponse(roleService.insertRole(role));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:role:query')")
    @GetMapping("/roles/{id}")
    public ResponseData show(@PathVariable(value = "id", required = false) Long id)
    {
        return JsonResponse.success(roleService.findRoleById(id));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:role:update')")
    @PutMapping("/roles/{id}")
    public ResponseData update(@PathVariable(value = "id", required = false) Long id, @RequestBody SysRole sysRole)
    {
        return toResponse(roleService.updateRole(id, sysRole));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:role:permission')")
    @GetMapping("/role/{id}/permissions")
    public ResponseData getPermission(@PathVariable(value = "id", required = false) Long id)
    {
        return JsonResponse.success(roleService.selectRolePermissionIdsByRoleId(id));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:role:update:permission')")
    @PutMapping("/role/{id}/permissions")
    public ResponseData updatePermission(@PathVariable(value = "id", required = false) Long id, @RequestBody(required = false) SysRole role)
    {
        return JsonResponse.success(roleService.updateRolePermission(id, role));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:role:delete')")
    @DeleteMapping("/roles/{id}")
    public ResponseData destroy(@PathVariable Long id)
    {
        return JsonResponse.success();
    }


}
