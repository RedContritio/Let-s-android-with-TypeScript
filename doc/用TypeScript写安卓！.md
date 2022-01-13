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

版本管理工作此后都不做赘述，代码与文档可能存在版本差异。因此建议使用尽可能新的版本，以便最大程度使其同步。

## 运行代码

**首次运行会很慢，因为要下载大量依赖库**

如果你有虚拟机，可以直接 `yarn android` 运行，并跳过本节。

由于我更喜欢在设备上通过 `ADB` 运行（好吧，因为我开发环境性能太差，虚拟机效果并不好），因此该节介绍在实机上调试。

假设你安装了 `Android SDK`，并且 `adb` 命令可用。

首先执行 `adb devices`，你将期待看到你的设备显示在下面并且是连接状态，否则，请在对应手机上的开发者选项中配置允许 USB 调试。

现在，执行 `yarn android`，其将会默认通过 USB 连接的设备进行调试。

为了此后方便，我们不妨将 `package.json` 中的脚本进行微调。

将

```json
    "android": "react-native run-android",
```

修改为

```json
    "android": "adb devices && react-native run-android",
```

此后就可以直接执行 `yarn android`。

为了保留原来的调用模拟器调试功能，我们添加一行。

```json
    "android:direct": "react-native run-android",
```

如果想用模拟器执行，则使用 `yarn android:direct`，否则直接使用 `yarn android`。

## 使用 redux

**_我们当然可以直接使用 redux toolkit，但是还是一步步来比较好？_**

先安装 `react-redux` 库。

```bash
yarn add react-redux redux
```

让我们初步认识一下 `redux`。

`redux` 由三部分构成，分别是 `action`, `reducer` 和 `state`。

`state` 全局只有一个，只能被 `reducer` 改变。

`reducer` 接收到 `action` 时执行，用于更新状态。

首先我们调整目录结构，首先创建 `src` 作为源码目录，随后在 `src` 下新建几个目录 `action`, `reducer` 和 `store`。

```bash
mkdir src/action
mkdir src/reducer
mkdir src/store
```

先创建 `src/store/index.ts`，提供一个空的状态。

```typescript
export class StoreState {}
```

然后创建 `src/action/index.ts`，提供一个测试用的 `action`。

```typescript
export const dummyaction = 'test/dummy';
export type DummyActionType = typeof dummyaction;

export interface IDummyAction {
  type: DummyActionType;
}

export type IAction = IDummyAction;
```

最后创建 `src/reducer/index.ts`，提供一个测试用的 `reducer`。

```typescript
import {IAction} from '../action';
import {StoreState} from '../store';

export function rootReducer(
  state: StoreState = new StoreState(),
  action: IAction,
) {
  switch (action.type) {
    default:
      return state;
  }
}
```

现在，就可以将三者在 `App.tsx` 中整合。

首先找到 `App` 函数，随后在其最外层定义一个 `Provider`，并定义一个全局变量 `store` 传入。

修改后的 `App` 函数如下（含 `store` 定义与 `import`）。

```typescript
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from '../reducer';

const store = createStore(rootReducer);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
          >
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};
```

现在已经整合了 `redux`，当然，具体使用留待后续处理。

## 简化操作 `redux toolkit`

这里我推荐参考一些文档，比如[这篇](https://www.jianshu.com/p/49aa25353c2e)，虽然其也有很多的错漏内容，但作为入门读物，我觉得蛮不错的。
附带一提，其对应的[下部分](https://www.jianshu.com/p/dacd871843d4)也有读的必要。

然后回到正轨。

首先安装 `redux toolkit`。

```bash
yarn add @reduxjs/toolkit
```

接下来，我们先移除掉 `action` 和 `reducer` 目录。

相对的，我们创建一个 `features` 目录，其中用于创建 `slice` 对象及拼装 `reducer`。

`slice` 是一种同时定义了 `reducer` 和 `action` 的对象，其只负责处理 `store` 的一个子集。

迁移此前的 `dummyAction`，在 `features/dummy.ts` 中使用如下代码创建对应 `slice`。

```typescript
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const dummySlice = createSlice({
  name: 'test/dummy',
  initialState: {},
  reducers: {
    dummy: (state, _action: PayloadAction<undefined>) => state,
    default: (state, _action: PayloadAction<undefined>) => state,
  },
});

export const {dummy} = dummySlice.actions;
export const dummyReducer = dummySlice.reducer;
```

随后，创建 `features/index.ts`，对 `reducer` 进行整合。

```typescript
import {combineReducers} from '@reduxjs/toolkit';
import {dummyReducer} from './dummy';

export const rootReducer = combineReducers({
  dummyReducer,
});
```

最后，根据 `rootReducer` 的类型信息创建 `store`。现在我们将 `store` 的创建放在 `store/index.ts` 中。

```typescript
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from '../features';

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
```

现在，我们可以改写 `App.tsx` 中的相关内容，移除原有的 `import` 和 `store` 定义，改为如下内容，其余部分不变。

```typescript
import store from '../store';
```

这样一来，就有了一个吃了更多糖的框架了，我喜欢吃糖，希望你也喜欢。

## 随时间变动的主循环

我们需要一个主循环！否则，我们的程序在不操作的情况下几乎不进行任何运算。

即使是俄罗斯方块这样的游戏，这种表现也不是令人满意的，因此我们需要主循环！

主循环有很多实现方式。

首先，我们应该定义对应的 `slice`。

我们创建 `features/timer.ts`，在其中编写如下的代码。

```typescript
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'basic/timer',
  initialState: {
    g_frame: 0,
  },
  reducers: {
    tick: (state, _action: PayloadAction<number>) => {
      state.g_frame += 1;
    },
    default: (state, _action: PayloadAction<undefined>) => state,
  },
});

export const {tick} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
```

我们不妨假定我们只关注 `g_frame`，而不关注实际时间（后者也不难，我们在随后会进行改进）。

我们提供一个 `tick` 的 `action`，用于引发 `g_frame` 的增长。

接着，如 `dummy`，我们将其整合进 `features/index.ts`。

```typescript
import {combineReducers} from '@reduxjs/toolkit';
import {dummyReducer} from './dummy';
import {timerReducer} from './timer';

export const rootReducer = combineReducers({
  dummyReducer,
  timerReducer,
});
```

接下来，我们需要将其加载进实际存在的组件中，否则其只是死代码。

我们创建 `container/timer.tsx`，这个文件会产生两个组件，`HiddenTimer` 和 `TimerDisplay`，前者用于实现计时逻辑，后者则用于显示当前计时情况，方便验证效果。

最朴素的思路，我们当然可以用 `setInterval` 来处理。

如果这样做，很简单。

```typescript
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {FPS} from '../utils/constant';
import {tick as tick_action} from '../action/timer';

interface IProps {
  tick: () => void;
}

function HiddenTimer({tick}: IProps) {
  useEffect(() => {
    console.log('interval install');
    const interval = setInterval(() => {
      tick();
    }, 1000 / FPS);
    return () => {
      console.log('interval remove');
      clearInterval(interval);
    };
  }, [tick]);

  return <></>;
}

const mapDispatch2Props = (dispatch: Dispatch) => ({
  tick: () => dispatch(tick_action(0)),
});

export default connect(undefined, mapDispatch2Props)(HiddenTimer);
```

很简单的代码，通过指定 `FPS`，就能实现任意的帧率。

但是，我们会发现，这个代码有个奇怪的问题。

> 为什么 `mapDispatch2Props` 的时候，调用的是 `tick_action(0)`？这个 `0` 是什么？

奇怪的占位符？

为什么需要用到占位符？是 `tick` 这个 `action` 设计有错吗？

不全是，但是也相差不远。

实际上，我更推荐使用的是 **`requestAnimationFrame`**，因此 `tick` 也是基于这里设计的。

`requestAnimationFrame` 参数是 `(t: number) => void`，传入的 `t` 表示当前的真实时间（秒）。

这个函数调用后，所有组件将会暂停渲染，直到到达下一帧。

**帧率**呢？

这个函数优点在于，其会根据设备的刷新率决定帧率，通常帧率为 `60`，由于其并不受保证，因此建议基于参数 `t` 获取经过的实际时间换算到自己的帧率上（这也是之后要做的）。

当然，也存在一个缺点，这个函数会回传一个非零的 `id`，用于取消这个操作，这里需要一个保存，而且是非 `state`（`store`） 的保存。

鉴于此，我们使用 `class component`。

我们将 `container/timer.tsx` 修改为如下内容。

```typescript
import {Dispatch} from '@reduxjs/toolkit';
import React from 'react';
import {Text} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {tick as tick_action} from '../features/timer';
import {RootState} from '../store';

interface IProps {
  tick: (v: number) => void;
}

class InnerHiddenTimer extends React.Component<IProps> {
  loopID: number = 0;

  componentDidMount() {
    console.log('timer start.');
    this.loop(0);
  }

  loop(v: number): void {
    const {tick} = this.props;
    if (this.loopID !== 0) {
      tick(v);
    }

    this.loopID = requestAnimationFrame(this.loop.bind(this));
  }

  componentWillUnmount() {
    console.log('timer stop.');
    if (this.loopID !== 0) {
      cancelAnimationFrame(this.loopID);
      this.loopID = 0;
    }
  }

  render(): React.ReactNode {
    return <></>;
  }
}

const mapDispatch2Props = (dispatch: Dispatch) => ({
  tick: (v: number) => dispatch(tick_action(v)),
});

export const HiddenTimer = connect(
  undefined,
  mapDispatch2Props,
)(InnerHiddenTimer);
```

而需要的 `TimerDisplay` 则很简单，直接显示当前帧及当前时间（秒）。

```typescript
export function TimerDisplay() {
  const {g_frame} = useSelector((state: RootState) => state.timerReducer);
  return (
    <Text>
      current frame: {g_frame}, current second: {(g_frame / 60).toFixed(2)}
    </Text>
  );
}
```

最后，在 `App.tsx` 中，（在`App` 函数里）引入这两个组件 `HiddenTimer` 及 `TimerDisplay`。

```typescript
  return (
    <Provider store={store}>
      <HiddenTimer />
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Header />
          <TimerDisplay />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
          >
```

现在运行，我们可以发现显示的帧率和时间能够随着时间自行更新，到这里姑且告一段落。
