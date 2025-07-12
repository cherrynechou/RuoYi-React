package com.ruoyi.web.controller.core;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.entity.SysMenu;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.common.utils.TreeBuilder;
import com.ruoyi.system.service.ISysMenuService;
import com.ruoyi.web.converter.SysMenuConverter;
import com.ruoyi.web.vo.SysMenuVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class SysMenuController extends BaseController
{
    @Autowired
    private ISysMenuService menuService;

    @PreAuthorize("@securityValidator.hasPermission('system:menu:list')")
    @GetMapping("/menu")
    public ResponseData index(SysMenu menu)
    {
        List<SysMenu> menus = menuService.selectMenuList(menu);
        List<SysMenuVo> formatMenus = SysMenuConverter.INSTANCE.toConvertSysMenuVoList(menus);
        return JsonResponse.success(TreeBuilder.<SysMenuVo>buildTreeList(formatMenus));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:menu:all')")
    @GetMapping("/menu/all")
    public ResponseData getAllMenus()
    {
        List<SysMenu> menus = menuService.selectMenuList(null);
        return JsonResponse.success(SysMenuConverter.INSTANCE.toConvertSysMenuVoList(menus));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:menu:add')")
    @PostMapping("/menu")
    public ResponseData store(@RequestBody SysMenu menu)
    {
        return toResponse(menuService.insertMenu(menu));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:menu:query')")
    @GetMapping("/menu/{id}")
    public ResponseData show(@PathVariable(value = "id", required = false) Long id)
    {
        SysMenu menu = menuService.findMenuById(id);
        return JsonResponse.success(SysMenuConverter.INSTANCE.toConvertSysMenuVo(menu));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:menu:update')")
    @PutMapping("/menu/{id}")
    public ResponseData update(@PathVariable(value = "id", required = false) Long id, @RequestBody SysMenu menu)
    {
        return toResponse(menuService.updateMenu(id, menu));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:menu:disabled')")
    @PatchMapping("/menu/{id}/disabled")
    public ResponseData disabledMenu(@PathVariable(value = "id", required = false) Long id,@RequestBody SysMenu menu)
    {
        return toResponse(menuService.updateMenuVisible(id, menu));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:menu:delete')")
    @DeleteMapping("/menu/{id}")
    public ResponseData destroy(@PathVariable(value = "id", required = false) Long id)
    {
        return JsonResponse.success(menuService.deleteMenuById(id));
    }
}
