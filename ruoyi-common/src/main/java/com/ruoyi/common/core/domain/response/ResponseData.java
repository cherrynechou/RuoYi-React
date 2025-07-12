package com.ruoyi.common.core.domain.response;

import com.ruoyi.common.utils.StringUtils;

import java.util.HashMap;

public class ResponseData extends HashMap<String, Object>
{
    private static final long serialVersionUID = 1L;

    /** 状态码 */
    public static final String CODE_TAG = "code";

    /** 返回内容 */
    public static final String MEG_TAG = "msg";

    /** 数据对象 */
    public static final String DATA_TAG = "data";

    public ResponseData() {}

    public ResponseData(int code,String msg)
    {
        super.put(CODE_TAG,code);
        super.put(MEG_TAG,msg);
    }

    public ResponseData(int code, String msg, Object data)
    {
        super.put(CODE_TAG,code);
        super.put(MEG_TAG,msg);
        if (StringUtils.isNotNull(data))
        {
            super.put(DATA_TAG, data);
        }
    }

    @Override
    public ResponseData put(String key,Object value)
    {
        super.put(key,value);
        return this;
    }

}
