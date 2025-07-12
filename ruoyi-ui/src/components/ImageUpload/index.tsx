import { FC, useEffect, useMemo, useState } from 'react';
import { Image, App, Modal, Upload } from 'antd';
import type { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import type { UploadFile, UploadListType } from 'antd/es/upload/interface';
import { FormattedMessage } from '@umijs/max';
import { nanoid } from 'nanoid';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadImageFile } from '@/services/system/CommonController';
import { map } from 'lodash-es';

export type ImageUploadProps = {
  accept: string;
  listType:  UploadListType | undefined;
  maxCount: number; //可上传的图片张数
  fileList: UploadFile[];
  multiple?: boolean;
  maxSize?: number;
  onUploadChange: (file: any[]) => void;
}

let imageList: any[] = [];
const ImageUpload: FC<ImageUploadProps> =(props: ImageUploadProps)=>{
  const [loading, setLoading] = useState(false);
  const {accept, listType, multiple, onUploadChange,fileList, maxCount, maxSize} = props;
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(fileList || []);

  const { message } = App.useApp();

  useEffect(()=>{
    if(fileList.length){
      fileList.map(v=>{
        imageList.push(v.url);
      })
    }
  },[fileList]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    setUploadFileList(info.fileList);
  }

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        <FormattedMessage id='component.upload.addFile' />
      </div>
    </button>
  );

  /**
   * 处理文件
   * @param file
   */
  const handleBeforeUpload = async (file: RcFile) => {
    const allowFormat = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!allowFormat) {
      message.error('只允许 JPG/PNG 文件!', 1000);
      return false;
    }

    const isLimit3M = file.size / 1024 / 1024 < 3;

    if (maxSize && !isLimit3M) {
      message.error(`文件上传需要小于 3MB!`);
      return false;
    }
  };


  /**
   * 处理文件上传
   * @param options
   */
  const handleCustomUpload = async (options: any) => {
    const { file,onProgress } = options;
    onProgress({ percent: 50 });

    const formData = new FormData();
    formData.append('file',file);

    uploadImageFile(formData).then((response: any)=>{
      if(response.code === 200){
        setUploadFileList([
          ...uploadFileList.filter((item) => item.status === 'done'),
          {
            uid: nanoid(),
            name: response.data.newFileName,
            status: 'done',
            url: response.data.url,
          } as UploadFile,
        ]);

        imageList.push(response.data.filePath);
        onUploadChange(imageList);

        message.success('上传成功');
      }
    })
  }


  /**
   * 删除
   * @param file
   */
  const handleRemove = (file: UploadFile) => {
    const resultFileList = uploadFileList.filter((item: UploadFile<any>)=> item.uid !== file.uid);
    const resultList: any[] = map(resultFileList, 'name');
    onUploadChange(resultList);
  };

  return (
    <>
      <Upload
        accept={accept}
        listType={listType}
        fileList={uploadFileList}
        multiple={multiple}
        maxCount={maxCount}
        customRequest={handleCustomUpload}
        beforeUpload={handleBeforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {uploadFileList.length >= maxCount ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image
          alt="preview"
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

export default ImageUpload;