package com.ruoyi.web.controller.core;

import com.ruoyi.common.core.domain.dto.LoginUserDTO;
import com.ruoyi.common.core.domain.entity.SysMenu;
import com.ruoyi.common.core.domain.model.AuthUser;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.TreeBuilder;
import com.ruoyi.framework.web.service.SysLoginService;
import com.ruoyi.framework.web.service.SysPermissionService;
import com.ruoyi.system.domain.vo.RouterVo;
import com.ruoyi.system.service.ISysMenuService;
import com.ruoyi.web.converter.AuthUserConverter;
import com.ruoyi.web.converter.SysMenuConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
public class SysAuthController
{
    @Autowired
    private SysLoginService sysLoginService;

    @Autowired
    private ISysMenuService menuService;

    @Autowired
    private SysPermissionService permissionService;

    @PostMapping("/oauth/login")
    public ResponseData login(@Validated @RequestBody LoginUserDTO loginUserDTO)
    {
        String accessToken = sysLoginService.login(loginUserDTO.getUserName(),loginUserDTO.getPassword());

        Map<String,Object> responseData = new HashMap<>();
        responseData.put("accessToken",accessToken);

        return JsonResponse.success(responseData);
    }

    @GetMapping("/currentUser")
    public ResponseData currentUser()
    {
        AuthUser loginUser = SecurityUtils.getLoginUser();

        // 角色集合
        Set<String> roles = permissionService.getUserRoles(loginUser.getUser());
        // 权限集合
        Set<String> permissions = permissionService.getUserPermission(loginUser.getUser());

        //格式化
        return JsonResponse.success(AuthUserConverter.INSTANCES.toConvertAuthUserVO(loginUser, roles, permissions));
    }

    @GetMapping("/getMenuList")
    public ResponseData getMenuList()
    {
        //当前用户id
        Long userId = SecurityUtils.getUserId();
        //
        List<SysMenu> menus = menuService.findMenuTreeByUserId(userId);

        List<RouterVo> formatMenus = SysMenuConverter.INSTANCE.toConvertRouterVoList(menus);

        return JsonResponse.success(TreeBuilder.<RouterVo>buildTreeList(formatMenus) );
    }


    public ResponseData refreshToken()
    {
        return JsonResponse.success();
    }



}
