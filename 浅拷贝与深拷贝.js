//浅拷贝

const shallowClone = (obj) => {
  const newObj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
};

//深拷贝

const deepClone = (obj, hash = new WeakMap()) => {
  //如果obj为null直接返回对象
  if (obj === null) return obj;
  //如果obj为内置函数，不做拷贝
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  //仅在obj为对象时做拷贝
  if (typeof obj !== 'object') return obj;
  //设置递归base case
  if (hash.get(obj)) return hash.get(obj);
  //创建拷贝对象，并将实参对象的构造函数指向拷贝对象
  let cloneObj = new obj.constructor();
  //使用hash来记录，避免循环拷贝，栈溢出
  hash.set(obj, cloneObj);
  //递归循环拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
};
