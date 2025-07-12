package com.ruoyi.web.controller.core;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SysConfigController extends BaseController
{
    public ResponseData index()
    {
        return JsonResponse.success();
    }
}
