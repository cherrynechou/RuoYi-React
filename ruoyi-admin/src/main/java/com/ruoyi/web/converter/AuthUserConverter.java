package com.ruoyi.web.converter;

import com.ruoyi.common.core.domain.model.AuthUser;
import com.ruoyi.common.utils.FormatDataUtils;
import com.ruoyi.web.vo.AuthUserVo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.Set;

@Mapper
public interface AuthUserConverter
{
    AuthUserConverter INSTANCES = Mappers.getMapper(AuthUserConverter.class);

    //自定义转换方法
    default AuthUserVo toConvertAuthUserVO(AuthUser loginUser, Set<String> roles, Set<String> permissions)
    {
        AuthUserVo userVo = new AuthUserVo();

        assert loginUser != null;
        userVo.setUserId(loginUser.getUserId());
        userVo.setUsername(loginUser.getUser().getUserName());
        userVo.setNickname(loginUser.getUser().getNickName());
        userVo.setAllPermissions(permissions);
        userVo.setIsAdmin(loginUser.getUser().isAdmin());

        //文件路径
        String avatar  = loginUser.getUser().getAvatar();

        userVo.setAvatarUrl(FormatDataUtils.formatAvatar(avatar));
        userVo.setRoles(roles);

        return userVo;
    }
}
