---
sidebar_position: 2
---

# 语言设计

### 1. 过程式的 for 循环

KCL 中为何不支持过程式的 for 循环！

KCL 提供了推导表达式以及 all/any/map/filter 表达式等用于对一个集合元素进行处理，满足大部分需求，提供过程式的 for 循环体从目前场景看需求暂时不强烈，因此暂未提供过程式的 for 循环支持

此外，KCL 中虽然没有支持过程式的 for 循环，但是可以通过 for 循环和 lambda 函数“构造”相应的过程式 for 循环

```python
result = [(lambda x: int, y: int -> int {
    # 在其中书写过程式的 for 循环逻辑
    z = x + y
    x * 2
})(x, y) for x in [1, 2] for y in [1, 2]]  # [2, 2, 4, 4]
```

### 2. 默认变量不可变

KCL 变量不可变性是指 KCL 顶层结构中的非下划线 `_` 开头的导出变量初始化后不能被改变。

```python
schema Person:
    name: str
    age: int

a = 1  # a会输出到YAML中，一旦赋值不可修改
_b = 1  # _b变量以下划线开头命名，不会输出到YAML中, 可多次赋值修改
_b = 2
alice = Person {
    name = "Alice"
    age = 18
}
```

规定变量不可变的方式分为两类：

- schema 外的非下划线顶层变量

```python
a = 1  # 不可变导出变量
_b = 2  # 可变非导出变量
```

