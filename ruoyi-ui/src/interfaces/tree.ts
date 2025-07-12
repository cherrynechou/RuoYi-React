/**
 * 生成树型列表所需要的
 */
export interface ITreeOption {
  idKey: string | number,     //请求过来主键
  titleKey: string,            //标题
  parentIdKey: string,
  childrenKey: string,
  optionIdKey: string,
  rootValueKey: string | number    //根节点 值
}

export interface IListOption {
  rootNameKey: string,
  titleKey: string,
  parentIdKey: string,
  childrenKey: string,
  optionIdKey: string,
  fieldsKey: string,
}


export interface ITreeDataObj {
  [id: string]: any,
  children?: ITreeDataObj[],
  title: string,
  parent_id: string | number
}
