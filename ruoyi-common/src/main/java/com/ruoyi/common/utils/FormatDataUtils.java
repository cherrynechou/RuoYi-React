package com.ruoyi.common.utils;

import com.ruoyi.common.constant.Constants;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class FormatDataUtils
{
    public static String formatAvatar(String avatar)
    {
        if(StringUtils.isHttp(avatar)){
            return avatar;
        }

        if(!StringUtils.isEmpty(avatar)){
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/profile")
                    .path(avatar)
                    .toUriString();
        }

        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/profile")
                .path(Constants.DEFAULT_AVATAR_URL)
                .toUriString();

    }
}
