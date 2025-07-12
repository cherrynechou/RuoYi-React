package com.ruoyi.web.controller.core;

import cn.idev.excel.FastExcel;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.common.utils.MessageUtils;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.framework.web.service.SysPasswordService;
import com.ruoyi.system.service.ISysUserService;
import com.ruoyi.web.converter.SysUserConverter;
import com.ruoyi.web.vo.SysUserVo;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class SysUserController extends BaseController
{
    @Autowired
    private ISysUserService userService;

    @Autowired
    private SysPasswordService passwordService;

    @PreAuthorize("@securityValidator.hasPermission('system:user:list')")
    @GetMapping("/users")
    public ResponseData index(SysUser user)
    {
        startPage();
        List<SysUser> list = userService.selectUserList(user);
        List<SysUserVo> formatList = SysUserConverter.INSTANCE.toConvertSysUserVoList(list);
        return JsonResponse.success(getConverterTableData(list,formatList), MessageUtils.message("query.success"));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:user:add')")
    @PostMapping("/users")
    public ResponseData store(@RequestBody SysUser user)
    {
        if(!StringUtils.isNull(user.getPassword())){
            user.setPassword(SecurityUtils.encryptPassword(user.getPassword()));
        }

        return JsonResponse.success(userService.insertUser(user));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:user:query')")
    @GetMapping("/users/{id}")
    public ResponseData show(@PathVariable(value = "id", required = false) Long id)
    {
        SysUser user = userService.findUserById(id);
        return JsonResponse.success(SysUserConverter.INSTANCE.toConvertSysUserVo(user));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:user:update')")
    @PutMapping("/users/{id}")
    public ResponseData update(@PathVariable(value = "id", required = false) Long id, @RequestBody SysUser user)
    {
        user.setUserId(id);

        userService.checkUserAllowed(user);
        if(!StringUtils.isNull(user.getPassword())){
            user.setPassword(SecurityUtils.encryptPassword(user.getPassword()));
        }
        //检查用户名是否唯一
        if(!userService.checkUserNameUnique(user)){
            return failed(MessageUtils.message("user.username.not.unique"));
        }
        return toResponse(userService.updateUser(id, user));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:user:reset:password')")
    @PatchMapping("/users/{id}/resetPassword")
    public ResponseData resetPassword(@PathVariable(value = "id", required = false) Long id)
    {
        return toResponse(passwordService.resetPassword(id));
    }

    @PreAuthorize("@securityValidator.hasPermission('system:user:forbidden')")
    @PatchMapping("/user/{id}/block")
    public ResponseData forbiddenUser(@PathVariable(value = "id", required = false) Long id,@RequestBody SysUser user)
    {
        return JsonResponse.success(userService.updateUserProfile(id, user));
    }

    @GetMapping("/user/export")
    public void exportUserData(HttpServletResponse response) throws IOException
    {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        String fileName = URLEncoder.encode("user", "UTF-8");
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");

        List<SysUser> userList = userService.selectUserList(null);

        // 写入数据
        FastExcel.write(response.getOutputStream(), SysUser.class)
                .sheet("模板")
                .doWrite(userList);

    }

    @PreAuthorize("@securityValidator.hasPermission('system:user:delete')")
    @DeleteMapping("/users/{id}")
    public ResponseData destroy(@PathVariable Long id)
    {
        return toResponse(userService.deleteUserById(id));
    }

}
