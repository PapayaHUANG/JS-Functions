//手写call
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function');
  }
  //创建一个独一无二的方法
  const symbolFn = Symbol();
  //若context为非真值则返回window
  context = context || window;
  //提取参数
  const args = [...arguments].slice(1);
  //设置this的指向
  context[symbolFn] = this;
  const res = context[symbolFn](...args);
  delete context[symbolFn];
  return res;
};

//手写apply
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }
  const symbolFn = Symbol();
  context = context || window;
  context[symbolFn] = this;
  const args = arguments[1];
  const res = context[symbolFn](...args);
  delete context[symbolFn];
  return res;
};

//手写bind
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }
  //设置this指向
  const self = this;
  //提取参数
  const args = [...arguments].slice(1);
  return function F() {
    //兼容new关键字
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    //动态传参数
    return self.apply(context, args.concat(...arguments));
  };
};
