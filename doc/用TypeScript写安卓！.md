# 用 `TypeScript` 写安卓吧！

本教程以 `evolution_of_math` 为例。

## 环境配置

这里假定你已经配置了 `node`、`npm` 和 `yarn`，并且均为最新版本。

你不被期待全局安装了任何 `npm` 之外的内容（如 `react-native-cli`），如果有，请移除掉。

假定你已经换了适当的 `npm` 源，因此你不会被网络连接问题所影响。

## 创建 `react-native` 项目

请执行这个：

```bash
npx react-native init evolution_of_math --template react-native-template-typescript
cd evolution_of_math
```

现在你已经拥有一个项目框架，并且在这个项目框架的根目录了。

此后如果不加说明，所有命令都在根目录下执行。

## 用 git 管理项目

我推荐你使用一种版本控制工具，便于自己的开发与版本控制。

个人倾向使用 `git`，所以此后都以 `git` 为例。

假定你已经配置好了 `git`。

```bash
git init
git add .
git commit -m "initialize project"
```

现在你已经提交了自己项目的第一个版本！可喜可贺可喜可贺！

## 添加文档，便于他人学习与自己复习

一个好的项目当然应该有文档，这个项目应当是好的，所以这篇文档也就不错。

通常文档应该添加在 `doc` 目录中，这里不做赘述，毕竟你正在看的就是本项目的文档。

另外，文档最好也使用 `git` 一起管理起来。