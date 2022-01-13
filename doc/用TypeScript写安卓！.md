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

## 使用在线版本管理

`github` 是一个好的平台，我们可以使用。

由于政治正确的原因，`github` 默认分支名称将被推荐使用 `main`，因此我们也这样做。

```bash
git remote add origin git@github.com:RedContritio/Let-s-android-with-TypeScript.git
git branch -M main
git push -u origin main
```

这样一来，我们的项目就上传到了 github。

## 下载所需依赖

这一步非常简单，但是同时也很重要。

执行 `yarn`，会下载依赖到 `node_modules`。

如果你不是完全参考此教程，坚持使用 `npm` 进行管理的话，你可能需要 `npm install`。

通过看根目录下的 `lock` 文件可以判断应该使用什么。

如果根目录存在 `yarn.lock`，那么请 `yarn`。

否则，你应该会看到 `package-lock.json`，不用犹豫，`npm install` 吧。

由于 `node_modules` 在 `.gitignore` 中有声明，因此不会被记录进版本。

## 格式化与提示

`node` 项目上进行操作通常是执行 `package.json` 中定义的脚本。

对于 `npm` 管理的项目，通常使用 `npm run XXX`。特别的，由于该模板项目为 `yarn` 管理的，因此我们可以直接 `yarn XXX`。

`package.json` 中可以看到预定义的内容如下。

```json
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  },
```

`lint` 可以用来静态分析代码，检查是否有不符合规范的地方。
此外，我们使用 `prettier` 来格式化代码。

对 `package.json` 的内容略作修改，在 `"scripts"` 中添加以下几行（相同键的行进行覆盖，可能需要酌情增删逗号）。

```json
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "prettier": "prettier . --check",
    "prettier:fix": "prettier . --write",
```

现在，已经配置好了命令。

`lint` 与 `prettier` 用于检查，而加上后缀的 `:fix` 则用于自动修正。

现在我们进行自动修复。

```bash
yarn prettier:fix
yarn lint:fix
```

当遇到问题不能自动修复时，对应命令会给出详情，请手动解决。

现在项目已经完成了格式化工作。

继续提交当前更新。

```bash
git add .
git commit -m "add prettier and lint"
```

版本管理工作此后都不做赘述。
