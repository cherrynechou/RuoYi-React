package com.ruoyi.common.utils;

import com.ruoyi.common.core.tree.TreeNode;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TreeBuilder
{
    public static <T extends TreeNode<T>> List<T> buildTreeList(List<T> dataList)
    {
        Map<Long,List<T>> groupMap = dataList.stream().collect(Collectors.groupingBy(TreeNode::getParentId));
        dataList.forEach(data->{
            data.setChildren(groupMap.get(data.getCurrentId()));
        });

        return dataList.stream().filter(data->data.getParentId().equals(0L)).collect(Collectors.toList());
    }
}
