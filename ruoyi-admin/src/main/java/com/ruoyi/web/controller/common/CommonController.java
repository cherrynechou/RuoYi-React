package com.ruoyi.web.controller.common;

import com.ruoyi.common.config.RuoYiConfig;
import com.ruoyi.common.core.domain.response.JsonResponse;
import com.ruoyi.common.core.domain.response.ResponseData;
import com.ruoyi.common.utils.file.FileUtils;
import com.ruoyi.framework.config.ServerConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.utils.file.FileUploadUtils;
import com.ruoyi.common.constant.Constants;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/common")
public class CommonController
{
    private static final Logger log = LoggerFactory.getLogger(CommonController.class);

    @Autowired
    private ServerConfig serverConfig;

    @PostMapping("/upload")
    public ResponseData uploadFile(@RequestParam("file") MultipartFile file) throws Exception
    {
        try{
            // 上传文件路径
            String uploadPath = RuoYiConfig.getUploadPath();

            // 上传并返回新文件名称
            String filePath = FileUploadUtils.upload(uploadPath, file);
            String url = serverConfig.getUrl() + Constants.RESOURCE_PREFIX +  filePath;

            Map<String,Object> responseData = new HashMap<>();

            responseData.put("url",url);
            responseData.put("filePath",filePath);
            responseData.put("newFileName", FileUtils.getName(filePath));
            responseData.put("originalFilename", file.getOriginalFilename());

            return JsonResponse.success(responseData);

        }catch (Exception e){
            return JsonResponse.failed(e.getMessage());
        }
    }
}
