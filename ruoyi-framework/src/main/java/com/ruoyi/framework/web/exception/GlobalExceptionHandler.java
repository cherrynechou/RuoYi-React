package com.ruoyi.framework.web.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ruoyi.common.utils.MessageUtils;
import com.ruoyi.common.utils.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import jakarta.servlet.http.HttpServletResponse;
import com.ruoyi.common.exception.ServiceException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 全局异常
 */
@RestControllerAdvice
public class GlobalExceptionHandler
{
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 权限校验异常
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseData handleAccessDeniedException(AccessDeniedException e,HttpServletRequest request)
    {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',权限校验失败'{}'", requestURI, e.getMessage());
        return JsonResponse.failed(HttpStatus.FORBIDDEN.value(), MessageUtils.message("forbidden.error"));
    }


    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseData handleAuthorizationDeniedException(AuthorizationDeniedException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',权限校验失败'{}'", requestURI, e.getMessage());
        return JsonResponse.failed(HttpStatus.FORBIDDEN.value(), MessageUtils.message("forbidden.error"));
    }


    /**
     * 请求方式不支持
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseData handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException e, HttpServletRequest request)
    {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',不支持'{}'请求", requestURI, e.getMethod());
        return JsonResponse.failed(e.getMessage());
    }


    /**
     * 业务异常
     */
    @ExceptionHandler(ServiceException.class)
    public ResponseData handleServiceException(ServiceException e, HttpServletRequest request)
    {
        log.error(e.getMessage(), e);
        Integer code = e.getCode();
        return StringUtils.isNotNull(code) ? JsonResponse.failed(code, e.getMessage()) : JsonResponse.failed(e.getMessage());
    }

    /**
     *  拦截未知的运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseData handleRuntimeException(RuntimeException e, HttpServletRequest request)
    {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',发生未知异常.", requestURI, e);
        return JsonResponse.failed(e.getMessage());
    }

    /**
     * 系统异常
     */
    @ExceptionHandler(Exception.class)
    public ResponseData handleException(HttpServletResponse response,Exception e)
    {
        log.info("服务器异常",e);
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return JsonResponse.failed(e.getMessage());
    }


    /**
     * 请求类型不是有效的json数据
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseData handleHttpMessageNotReadableException(HttpMessageNotReadableException ex)
    {
        log.error(ex.getMessage(), ex);
        return JsonResponse.failed(ex.getMessage());
    }

    /**
     * 自定义验证异常
     */
    @ExceptionHandler(BindException.class)
    public ResponseData handleBindException(BindException e)
    {
        log.error(e.getMessage(), e);
        String message = e.getAllErrors().get(0).getDefaultMessage();
        return JsonResponse.failed(message);
    }

    /**
     * 自定义验证异常
     * https://blog.csdn.net/u012613251/article/details/138345610
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseData handleMethodArgumentNotValidException(MethodArgumentNotValidException ex)
    {
        log.info("test");
        log.error(ex.getMessage(), ex);
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();

        String message = errors.stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining(","));

        //String message = ex.getBindingResult().getFieldError().getDefaultMessage();
        return JsonResponse.failed(message);
    }

}
