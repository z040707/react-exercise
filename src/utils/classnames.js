// 函数要求
// 1. 参数数量不限制
// 2. 字符串类型参数直接作为类名使用
// 3. 对象类型参数，如果属性值可以转换 true，属性名作为类名使用，否则忽略这个属性
// 4. 数组类型参数，根据数组元素内容类型依次按照上述规则处理
// 5. 返回一个由空格区分类名的字符串（去重）

export const getTypeOf = (data) => {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  // toLowerCase 转为小写
};

export const classnames = (...args) => {
  // 接收保存每一个参数转换处理的结果
  const ret = [];

  for (let i = 0; i < args.length; i++) {
    // 循环获取每一个函数参数
    let item = args[i];

    // 根据不同的数据类型做对应的处理，转为类名字符串
    switch (getTypeOf(item)) {
      case "string": {
        // 不需要额外处理，直接保存
        ret.push(item);

        break;
      }
      case "object": {
        // for...in: 获取当前对象所有可枚举属性，以及原型链上可枚举属性
        // Object.keys(): 仅使用对象自身的属性名，并且组成一个数组

        let keys = Object.keys(item);
        keys.forEach((key) => {
          // 判断属性值是否为真，如果是，就保存这个属性名
          let value = item[key];
          if (Boolean(value)) {
            ret.push(key);
          }
        });

        break;
      }
      case "array": {
        // 递归处理数组内的字符串和对象
        ret.push(classnames(...item));

        break;
      }
    }
  }

  return [...new Set(ret.join(" ").split(" "))].join(" ");
  // [...new Set()] // 去重
};
