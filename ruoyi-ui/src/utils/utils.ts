import { cloneDeep, pick } from 'lodash-es';
import { IListOption, ITreeOption } from '@/interfaces/tree';

const treeToOrderList =  (trees: any[], options: IListOption)=> {
  const root = { id: 0 , name: options.rootNameKey, level: 0, parentId: -1};
  const rows: any = [];
  const result: any[] = [];

  rows.push(root);

  const deepTrees = (
    arr: any[],
    level: number = 1
  ) => {
    arr.forEach(item =>{
      const row = Object.assign({}, item,{level:level});
      if(item[options.childrenKey]){
        rows.push(row);
        deepTrees(item[options.childrenKey], level + 1);
      } else {
        rows.push(row);
      }
    });
  }

  //展开
  deepTrees(trees);

  const formatLabelName = (level: number) => {
    let str= '';

    for( let i = 0; i < level; ++i){
      str += '─';
    }

    if(level === 0){
      return '';
    }else {
      return '├' + str;
    }
  }

  //格式化树
  rows.forEach((item: any)=>{
    const formatLabel = formatLabelName(item.level);
    const filterFields = pick(item, options.fieldsKey);
    result.push({
      label: formatLabel + item[options.titleKey],
      value: item[options.optionIdKey] || 0,
      ...filterFields
    })
  })

  return result;
}


const treeToList = (  trees: any[],  children: string = 'children')=>{

  const rows: any = [];
  const result: any[] = [];

  const deepTrees = (
    arr: any[],
    level: number = 1
  ) => {
    arr.forEach(item =>{
      const row = Object.assign({}, item,{level:level});
      if(item[children]){
        rows.push(row);
        deepTrees(item[children],level + 1);
      } else {
        rows.push(row);
      }
    });
  }

  //展开
  deepTrees(trees);

  //格式化树
  rows.forEach((item: any)=>{
    result.push({
      ...item
    })
  })

  return result;
}


/**
 * 生成树型列表(数据是从数据库查询出来的记录)
 * @param trees
 * @param options
 * refre: https://www.jb51.net/article/234063.htm
 */
const listToTree = (trees: any[], options: ITreeOption) => {
  //1.格式化
  const formatTrees: any[] = [];
  trees.forEach(item=>{
    formatTrees.push({
      id: item[options.idKey],
      title: item[options.titleKey],
      key: item[options.idKey],
      parentId: item[options.parentIdKey],
    });
  })

  const getTopList = (beforeTrees: any, options:ITreeOption )=>{
    return beforeTrees.filter((item: any) => item[options.parentIdKey] === options.rootValueKey);
  }

  const topList = cloneDeep(getTopList(formatTrees, options));
  const recurseTree = (parentList: any, formatTrees: any, options: ITreeOption, deep: number = 1)=>{
    if(trees.length === 0){
      return;
    }

    parentList.forEach((item:any)=>{
      const children = cloneDeep(formatTrees.filter((child: any) => child[options.parentIdKey] === item[options.optionIdKey]))

      item.children = children;
      item.deep = deep;

      recurseTree(children, formatTrees, options, deep + 1);
    });
  }

  recurseTree(topList, formatTrees, options);

  return topList;
}


/**
 * 获取树型结构叶子节点
 * @param trees
 * @param children
 */
const filterTreeLeafNode=(trees: any[], children: string = 'children') => {
  const leafRecords: any[] = [];
  const expandTree = (
    arr: any[]
  )=>{
    arr.forEach((item: any)=>{
      if(item[children].length>0){
        expandTree(item[children]);
      }else{
        leafRecords.push(item);
      }
    })
  }

  expandTree(trees);

  return leafRecords;
}

/**
 *
 * @param originalData
 */
const removeEmptyOrUndefinedField = (originalData: any) =>{
  const newData: any = {};
  for (const key in originalData) {
    //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
    if (originalData[key] !== 0 && originalData[key] !== '' && originalData[key] !== undefined && originalData[key] !== null) {
      //记录属性
      newData[key] = originalData[key];
    }
  }
  //返回对象
  return newData;
}

/**
 * 获取数组某一列最大值
 * @param list
 * @param field
 */
const queryListMaxValue=(
  list: any[],
  field: string=''
)=>{
  const sortListValues = list.map((item: any) => item[field]);
  const sort_max_array: number[] = sortListValues.filter(item=> item !== undefined)
  return Math.max(...sort_max_array);
}



/**
 * 复制文本到剪切板中
 *
 * @export
 * @param {*} value 需要复制的文本
 * @param {*} cb 复制成功后的回调
 */
const copy = (value: any, cb: any)=> {
  // 动态创建 textarea 标签
  const textarea = document.createElement('textarea');
  // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
  textarea.readOnly = true;
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  // 将要 copy 的值赋给 textarea 标签的 value 属性
  // 网上有些例子是赋值给innerText,这样也会赋值成功，但是识别不了\r\n的换行符，赋值给value属性就可以
  textarea.value = value;
  // 将 textarea 插入到 body 中
  document.body.appendChild(textarea);
  // 选中值并复制
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  document.execCommand('Copy');
  document.body.removeChild(textarea);
  if (cb && Object.prototype.toString.call(cb) === '[object Function]') {
    cb();
  }
}



export {
  treeToOrderList,
  treeToList,
  listToTree,
  filterTreeLeafNode,
  removeEmptyOrUndefinedField,
  queryListMaxValue,
  copy
}

