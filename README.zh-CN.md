# 排序算法可视化器

[![English](https://img.shields.io/badge/Language-English-blue)](README.md)
[![中文](https://img.shields.io/badge/语言-中文-red)](README.zh-CN.md)

一个美观的交互式排序算法可视化 Web 应用。使用 Vite、React、TypeScript 和 Tailwind CSS 构建。

---

## 🇨🇳 中文

### 功能特性

#### 6 种排序算法
- **冒泡排序** - O(n²) - 稳定，简单，适合教学
- **选择排序** - O(n²) - 不稳定，交换次数少
- **插入排序** - O(n²) - 稳定，适合小数据
- **快速排序** - O(n log n) 平均 - 不稳定，广泛使用
- **归并排序** - O(n log n) - 稳定，性能稳定
- **堆排序** - O(n log n) - 不稳定，原地排序

#### 交互式控制
- **算法选择** - 从 6 种算法中选择
- **数组大小** - 可调节 10-100 个元素
- **动画速度** - 可调节 10-1000ms
- **生成数组** - 创建新的随机数组
- **开始/暂停/重置** - 完全控制可视化过程

#### 视觉特性
- **颜色编码的数组条** 表示不同状态：
  - 🔵 蓝色：默认状态
  - 🟡 黄色：比较元素
  - 🔴 红色：交换元素
  - 🟢 绿色：已排序元素
  - 🟣 紫色：枢轴元素（快速排序）
  - 🟠 橙色：当前最小/最大值

#### 信息面板
- **统计面板** - 实时统计（比较次数、交换次数、耗时）
- **算法信息** - 每种算法的详细说明
  - 时间复杂度（最佳/平均/最差）
  - 空间复杂度
  - 稳定性和原地特性
  - 使用场景、优点、缺点

#### 双语支持
- **完整的中文/英文界面**
- **实时语言切换**
- **完整的算法描述（中英文）**
- **所有 UI 元素已翻译**

### 技术栈

- **前端框架**: React 19.2.0
- **构建工具**: Vite 7.2.4
- **语言**: TypeScript 5.9.3
- **样式**: Tailwind CSS 4.1.18
- **部署**: Vercel（推荐）

### 项目结构

```
sorting-visualizer/
├── src/
│   ├── components/          # React 组件
│   │   ├── Visualizer.tsx      # 主可视化区域
│   │   ├── ControlPanel.tsx    # 控制面板
│   │   ├── StatsPanel.tsx      # 统计信息面板
│   │   ├── AlgorithmInfo.tsx   # 算法信息展示
│   │   └── ArrayBar.tsx        # 单个数组条组件
│   ├── algorithms/          # 排序算法实现
│   │   ├── bubbleSort.ts
│   │   ├── selectionSort.ts
│   │   ├── insertionSort.ts
│   │   ├── quickSort.ts
│   │   ├── mergeSort.ts
│   │   ├── heapSort.ts
│   │   └── index.ts
│   ├── hooks/               # 自定义 React Hooks
│   │   ├── useSorting.ts      # 排序逻辑 Hook
│   │   ├── useToast.ts        # Toast 通知 Hook
│   │   └── useLanguage.ts     # 语言切换 Hook
│   ├── utils/               # 工具函数
│   │   ├── arrayGenerator.ts  # 数组生成工具
│   │   ├── colorUtils.ts      # 颜色工具
│   │   └── animationUtils.ts  # 动画工具
│   ├── i18n.ts              # 国际化配置
│   ├── types.ts             # TypeScript 类型定义
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   ├── index.css            # 全局样式
│   └── App.css              # App 组件样式
├── public/                  # 静态资源
│   ├── favicon.svg
│   ├── react.svg
│   └── vite.svg
├── index.html               # HTML 入口
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
├── postcss.config.js        # PostCSS 配置
└── eslint.config.js         # ESLint 配置
```

### 快速开始

#### 环境要求
- Node.js 18 或更高版本
- npm 或 yarn

#### 安装

1. **克隆仓库**
   ```bash
   git clone <your-repo-url>
   cd sorting-visualizer
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **在浏览器中打开**
   访问 `http://localhost:5173`

#### 构建生产版本

```bash
npm run build
```

构建输出将在 `dist/` 目录中。

#### 预览生产构建

```bash
npm run preview
```

### 使用方法

1. **从下拉菜单中选择算法**
2. **使用滑块调整数组大小**（10-100 个元素）
3. **使用速度滑块设置动画速度**
4. **点击"生成数组"** 创建新的随机数组
5. **点击"开始排序"** 开始可视化
6. **使用"暂停"** 随时暂停动画
7. **使用"重置"** 清除可视化
8. **使用语言切换** 切换中文/英文（中文/English）

### 算法详情

#### 冒泡排序
- **工作原理**：重复遍历列表，比较相邻元素并在顺序错误时交换它们
- **最适合**：教育目的、小数据集、近乎有序的数据

#### 选择排序
- **工作原理**：将数组分为已排序和未排序区域，从未排序区域重复选择最小元素
- **最适合**：当内存写入昂贵时

#### 插入排序
- **工作原理**：逐个构建排序数组，将每个元素插入到已排序部分的正确位置
- **最适合**：小数据集、近乎有序的数据、在线排序

#### 快速排序
- **工作原理**：分治算法，选择基准元素，围绕基准分区数组
- **最适合**：通用排序、大数据集

#### 归并排序
- **工作原理**：递归地将数组分成两半，对每半进行排序，然后合并
- **最适合**：大数据集、需要稳定排序时

#### 堆排序
- **工作原理**：使用二叉堆数据结构重复提取最大元素
- **最适合**：需要最坏情况 O(n log n) 时、嵌入式系统

### 部署

#### Vercel（推荐）

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **连接到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 登录
   - 点击"Add New Project"
   - 导入您的 GitHub 仓库
   - 点击"Deploy"

3. **自动部署**
   - 每次推送到 `main` 分支都会触发自动部署
   - 包含免费 SSL 证书
   - 全球 CDN 加速加载

#### GitHub Pages

1. **安装 gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **在 package.json 中添加部署脚本**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **部署**
   ```bash
   npm run build
   npm run deploy
   ```

### 开发

#### 类型检查
```bash
npm run type-check
```

#### 代码检查
```bash
npm run lint
```

### 贡献

欢迎贡献！请随时提交 Pull Request。

#### 添加新算法

1. 在 `src/algorithms/` 创建新文件
2. 将算法实现为异步生成器
3. 在 `src/algorithms/index.ts` 中添加算法信息
4. 在 `ControlPanel.tsx` 中更新算法选择器
5. 在 `src/i18n.ts` 中添加翻译

### 许可证

MIT License - 可自由用于学习或个人项目。

### 致谢

- 作为理解排序算法的教育工具而构建
- 受各种排序可视化项目启发
- 为清晰性和易用性而设计

### 联系方式

如有问题或反馈，请在仓库中提交 Issue。

---

## 🌟 项目特点

1. **教育友好** - 专为学习排序算法设计
2. **交互性强** - 完全可控制的动画过程
3. **视觉清晰** - 颜色编码直观展示算法状态
4. **信息丰富** - 提供详细的算法信息和统计
5. **双语支持** - 中英文界面切换
6. **响应式设计** - 适配不同屏幕尺寸
7. **类型安全** - 完整的 TypeScript 类型定义
8. **代码规范** - 使用 ESLint 进行代码检查

## 🚀 快速开始

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

## 📦 技术栈

- **前端框架**: React 19.2.0
- **构建工具**: Vite 7.2.4
- **语言**: TypeScript 5.9.3
- **样式**: Tailwind CSS 4.1.18
- **状态管理**: React Hooks + Context
- **国际化**: 自定义 i18n 实现

## 🎯 支持的排序算法

1. **冒泡排序** - O(n²) - 稳定，简单，适合教学
2. **选择排序** - O(n²) - 不稳定，交换次数少
3. **插入排序** - O(n²) - 稳定，适合小数据
4. **快速排序** - O(n log n) 平均 - 不稳定，广泛使用
5. **归并排序** - O(n log n) - 稳定，性能稳定
6. **堆排序** - O(n log n) - 不稳定，原地排序

## 📊 数组类型

- 随机数组
- 近乎有序数组
- 倒序数组
- 包含重复元素的数组

## 🎨 可视化特性

- **颜色编码**：默认(蓝)、比较(黄)、交换(红)、已排序(绿)、枢轴(紫)、最小/最大值(橙)
- **实时统计**：比较次数、交换次数、耗时
- **进度显示**：排序进度百分比
- **双语支持**：中文/英文切换

## 🔧 配置文件说明

### TypeScript 配置
- `tsconfig.json`: 根配置，引用其他配置文件
- `tsconfig.app.json`: 应用配置（React + Vite）
- `tsconfig.node.json`: Node 环境配置

### Vite 配置
- 插件：React + Tailwind CSS
- 开发服务器端口：5173

### ESLint 配置
- 使用 ESLint 9.x
- 支持 React Hooks 规则
- TypeScript ESLint 支持

## 📦 依赖说明

### 生产依赖
- `react`: React 核心库
- `react-dom`: React DOM 渲染

### 开发依赖
- `@vitejs/plugin-react`: Vite React 插件
- `@tailwindcss/vite`: Tailwind CSS Vite 插件
- `typescript`: TypeScript 编译器
- `eslint`: 代码检查工具
- `tailwindcss`: CSS 框架
- `autoprefixer`: CSS 前缀处理
- `postcss`: CSS 处理工具

## 🚀 部署建议

### Vercel (推荐)
1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署

### GitHub Pages
1. 安装 `gh-pages`
2. 添加部署脚本
3. 运行 `npm run deploy`

## 📞 联系方式

如有问题或建议，请在 GitHub 上提交 Issue 或 Pull Request。
