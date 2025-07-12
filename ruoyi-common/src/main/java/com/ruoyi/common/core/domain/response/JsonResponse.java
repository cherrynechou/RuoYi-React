package com.ruoyi.common.core.domain.response;

import com.ruoyi.common.constant.HttpStatus;
import com.ruoyi.common.utils.MessageUtils;

public class JsonResponse {

    /**
     * 无参
     * 正确返回
     *
     * @return
     */
    public static ResponseData success() {
        return new ResponseData(HttpStatus.SUCCESS, MessageUtils.message("operation.success"));
    }

    /**
     *
     * @param msg
     * @return
     */
    public static ResponseData success(String msg)
    {
        return new ResponseData(HttpStatus.SUCCESS, msg);
    }

    /**
     *
     * @param data
     * @return
     */
    public static ResponseData success(Object data)
    {
        return new ResponseData(HttpStatus.SUCCESS, MessageUtils.message("operation.success"), data);
    }

    /**
     * 正确返回
     * @param code
     * @param msg
     * @return
     */
    public static ResponseData success(int code ,String msg)
    {
        return new ResponseData(code, msg);
    }


    public static ResponseData success(Object data,String msg)
    {
        return new ResponseData(HttpStatus.SUCCESS, msg,data);
    }

    /**
     * 正确返回
     * @param code
     * @param msg
     * @param data
     * @return
     */
    public static ResponseData success(int code, String msg, Object data)
    {
        return new ResponseData(code, msg, data);
    }

    /**
     *
     * @param message
     * @param data
     * @return
     */
    public static ResponseData warn(String message, Object data)
    {
        return new ResponseData(HttpStatus.WARN,message,data);
    }

    /**
     * 失败
     */
    public static ResponseData failed(){
        return new ResponseData(HttpStatus.ERROR,MessageUtils.message("operation.failed"));
    }

    /**
     * 失败
     */
    public static ResponseData failed(String msg)
    {
        return new ResponseData(HttpStatus.ERROR,msg);
    }

    /**
     * 失败
     */
    public static ResponseData failed(int code, String msg)
    {
        return new ResponseData(code,msg);
    }
}
