package com.ruoyi.framework.security.handle;

import com.alibaba.fastjson2.JSON;
import com.ruoyi.common.core.domain.model.AuthUser;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.utils.ServletUtils;
import com.ruoyi.common.utils.MessageUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.framework.web.service.TokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import java.io.IOException;

@Configuration
public class LogoutSuccessHandlerImpl implements LogoutSuccessHandler
{
    @Autowired
    private TokenService tokenService;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException
    {
        AuthUser loginUser = tokenService.getAuthUser(request);
        if (StringUtils.isNotNull(loginUser))
        {
            // 删除用户缓存记录
            tokenService.delLoginUser(loginUser.getAccessToken());
        }
        ServletUtils.renderString(response, JSON.toJSONString(JsonResponse.success(MessageUtils.message("user.logout.success"))));
    }
}
