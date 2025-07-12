package com.ruoyi.system.service.impl;

import com.ruoyi.common.constant.UserConstants;
import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.common.exception.ServiceException;
import com.ruoyi.common.utils.MessageUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.mapper.SysRoleUserMapper;
import com.ruoyi.system.mapper.SysUserMapper;
import com.ruoyi.system.service.ISysRoleService;
import com.ruoyi.system.service.ISysUserService;
import org.apache.commons.collections4.SetUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SysUserServiceImpl implements ISysUserService
{
    private static final Logger log = LoggerFactory.getLogger(SysUserServiceImpl.class);

    @Autowired
    private SysUserMapper userMapper;

    @Autowired
    private SysRoleUserMapper userRoleMapper;

    @Autowired
    private ISysRoleService roleService;

    @Override
    public List<SysUser> selectUserList(SysUser sysUser) {
        return userMapper.selectUserList(sysUser);
    }

    @Override
    public SysUser findUserByUserName(String userName) {
        return userMapper.findUserByUserName(userName);
    }

    @Override
    public SysUser findUserById(Long id) {
        return userMapper.findUserById(id);
    }

    @Override
    public void checkUserAllowed(SysUser user) {
        if (StringUtils.isNotNull(user.getUserId()) && user.isAdmin()) {
            throw new ServiceException(MessageUtils.message("operator.administrator.not.allow.error"));
        }
    }

    @Override
    public int insertUser(SysUser user) {
        int rows = userMapper.insertUser(user);

        Long[] roleIds = user.getRoleIds();



        return rows;
    }

    /**
     * 校验用户名称是否唯一
     *
     * @param user 用户信息
     * @return 结果
     */
    @Override
    public boolean checkUserNameUnique(SysUser user)
    {
        Long userId = StringUtils.isNull(user.getUserId()) ? -1L : user.getUserId();
        SysUser info = userMapper.checkUserNameUnique(user.getUserName());
        if (StringUtils.isNotNull(info) && info.getUserId() != userId.longValue()) {
            return UserConstants.NOT_UNIQUE;
        }
        return UserConstants.UNIQUE;
    }

    @Override
    @Transactional
    public int updateUserProfile(Long id, SysUser user) {
        return userMapper.updateUser(id, user);
    }

    @Override
    public int updateUser(Long id, SysUser user) {
        List<Long> beforeList = roleService.getUserRoleIdsByUserId(id);

        List<Long> userRoleIds = new ArrayList<>(Arrays.asList(user.getRoleIds()));

        //之前的集合
        Set<Long> beforeSet = new HashSet<Long>(beforeList);
        Set<Long> afterSet = new HashSet<Long>(userRoleIds);

        Set<Long> deleteSet= SetUtils.difference(beforeSet,afterSet);
        Set<Long> addSet= SetUtils.difference(afterSet,beforeSet);

        //更新用户角色关系
        //删除
        if(!deleteSet.isEmpty()){
            int reslut = userRoleMapper.deleteUserRole(id, deleteSet.toArray(new Long[0]));
        }

        //添加
        if(!addSet.isEmpty()){
            int result = userRoleMapper.batchInsertUserRole(id,addSet.toArray(new Long[0]));
        }

        return userMapper.updateUser(id, user);
    }

    @Override
    public int deleteUserById(Long id) {
        return 0;
    }

    @Override
    public int deleteUserByIds(Long[] ids) {
        return 0;
    }
}
