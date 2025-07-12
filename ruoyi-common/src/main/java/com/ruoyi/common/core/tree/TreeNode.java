package com.ruoyi.common.core.tree;

import java.util.List;

public interface TreeNode<T>
{
    Long getCurrentId();

    Long getParentId();

    List<T> getChildren();

    void setChildren(List<T> children);
}
