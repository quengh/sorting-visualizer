# Sorting Algorithm Visualizer

[![English](https://img.shields.io/badge/Language-English-blue)](README.md)
[![中文](https://img.shields.io/badge/语言-中文-red)](README.zh-CN.md)

A beautiful, interactive web application for visualizing sorting algorithms. Built with Vite, React, TypeScript, and Tailwind CSS.

---

## 🇺🇸 English

### Features

#### 6 Sorting Algorithms
- **Bubble Sort** - O(n²) - Stable, simple, educational
- **Selection Sort** - O(n²) - Unstable, minimal swaps
- **Insertion Sort** - O(n²) - Stable, efficient for small data
- **Quick Sort** - O(n log n) average - Unstable, widely used
- **Merge Sort** - O(n log n) - Stable, consistent performance
- **Heap Sort** - O(n log n) - Unstable, in-place

#### Interactive Controls
- **Algorithm Selection** - Choose from 6 algorithms
- **Array Size** - Adjustable from 10 to 100 elements
- **Animation Speed** - Adjustable from 10ms to 1000ms
- **Generate Array** - Create new random arrays
- **Start/Pause/Reset** - Full control over visualization

#### Visual Features
- **Color-coded bars** for different states:
  - 🔵 Blue: Default state
  - 🟡 Yellow: Comparing elements
  - 🔴 Red: Swapping elements
  - 🟢 Green: Sorted elements
  - 🟣 Purple: Pivot element (Quick Sort)
  - 🟠 Orange: Current minimum/maximum

#### Information Panels
- **Stats Panel** - Real-time statistics (comparisons, swaps, time)
- **Algorithm Info** - Detailed explanation of each algorithm
  - Time complexity (best/average/worst)
  - Space complexity
  - Stability and in-place properties
  - Use cases, advantages, disadvantages

#### Bilingual Support
- **Full Chinese/English interface**
- **Real-time language switching**
- **Complete algorithm descriptions in both languages**
- **All UI elements translated**

### Technology Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.18
- **Deployment**: Vercel (recommended)

### Project Structure

```
sorting-visualizer/
├── src/
│   ├── components/          # React components
│   │   ├── Visualizer.tsx      # Main visualization area
│   │   ├── ControlPanel.tsx    # Control interface
│   │   ├── StatsPanel.tsx      # Statistics display
│   │   ├── AlgorithmInfo.tsx   # Algorithm information
│   │   └── ArrayBar.tsx        # Single bar component
│   ├── algorithms/          # Sorting algorithm implementations
│   │   ├── bubbleSort.ts
│   │   ├── selectionSort.ts
│   │   ├── insertionSort.ts
│   │   ├── quickSort.ts
│   │   ├── mergeSort.ts
│   │   ├── heapSort.ts
│   │   └── index.ts
│   ├── hooks/               # Custom React hooks
│   │   ├── useSorting.ts      # Sorting logic hook
│   │   ├── useToast.ts        # Toast notification hook
│   │   └── useLanguage.ts     # Language switching hook
│   ├── utils/               # Utility functions
│   │   ├── arrayGenerator.ts  # Array generation
│   │   ├── colorUtils.ts      # Color utilities
│   │   └── animationUtils.ts  # Animation helpers
│   ├── i18n.ts              # Internationalization configuration
│   ├── types.ts             # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── App.css              # App component styles
├── public/                  # Static assets
│   ├── favicon.svg
│   ├── react.svg
│   └── vite.svg
├── index.html               # HTML entry
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── tailwind.config.js       # Tailwind config
├── postcss.config.js        # PostCSS config
└── eslint.config.js         # ESLint config
```

### Getting Started

#### Prerequisites
- Node.js 18 or higher
- npm or yarn

#### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sorting-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

#### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

#### Preview Production Build

```bash
npm run preview
```

### How to Use

1. **Select an algorithm** from the dropdown menu
2. **Adjust array size** using the slider (10-100 elements)
3. **Set animation speed** using the speed slider
4. **Click "Generate Array"** to create a new random array
5. **Click "Start Sorting"** to begin the visualization
6. **Use "Pause"** to pause the animation at any point
7. **Use "Reset"** to clear the visualization
8. **Switch language** using the language toggle (中文/English)

### Algorithm Details

#### Bubble Sort
- **How it works**: Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order
- **Best for**: Educational purposes, small datasets, nearly sorted data

#### Selection Sort
- **How it works**: Divides the array into sorted and unsorted regions, repeatedly selects the smallest element from the unsorted region
- **Best for**: When memory writes are expensive

#### Insertion Sort
- **How it works**: Builds the sorted array one element at a time by inserting each element into its correct position
- **Best for**: Small datasets, nearly sorted data, online sorting

#### Quick Sort
- **How it works**: Divide-and-conquer algorithm that picks a pivot and partitions the array around it
- **Best for**: General-purpose sorting, large datasets

#### Merge Sort
- **How it works**: Recursively splits the array into halves, sorts each half, then merges them back together
- **Best for**: Large datasets, when stable sorting is required

#### Heap Sort
- **How it works**: Uses a binary heap data structure to repeatedly extract the maximum element
- **Best for**: When worst-case O(n log n) is required, embedded systems

### Deployment

#### Vercel (Recommended)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Automatic deployments**
   - Every push to `main` branch triggers automatic deployment
   - Free SSL certificate included
   - Global CDN for fast loading

#### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

### Development

#### Type Checking
```bash
npm run type-check
```

#### Linting
```bash
npm run lint
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

#### Adding a New Algorithm

1. Create a new file in `src/algorithms/`
2. Implement the algorithm as an async generator
3. Add the algorithm to `ALGORITHM_INFO` in `src/algorithms/index.ts`
4. Update the algorithm selector in `ControlPanel.tsx`
5. Add translations in `src/i18n.ts`

### License

MIT License - feel free to use this project for learning or personal projects.

### Acknowledgments

- Built as an educational tool for understanding sorting algorithms
- Inspired by various sorting visualizer projects
- Designed for clarity and ease of use

### Contact

For questions or feedback, please open an issue on the repository.

---

## 🌟 Project Highlights

1. **Educational Friendly** - Designed specifically for learning sorting algorithms
2. **Highly Interactive** - Fully controllable animation process
3. **Visual Clarity** - Color-coded visualization of algorithm states
4. **Information Rich** - Detailed algorithm information and statistics
5. **Bilingual Support** - Chinese/English interface switching
6. **Responsive Design** - Adapts to different screen sizes
7. **Type Safe** - Complete TypeScript type definitions
8. **Code Quality** - ESLint for code quality checks

## 🚀 Quick Start

```bash
# Development mode
npm run dev

# Build production version
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Code linting
npm run lint
```

## 📦 Technology Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.18
- **State Management**: React Hooks + Context
- **Internationalization**: Custom i18n implementation

## 🎯 Supported Sorting Algorithms

1. **Bubble Sort** - O(n²) - Stable, simple, suitable for teaching
2. **Selection Sort** - O(n²) - Unstable, minimal swaps
3. **Insertion Sort** - O(n²) - Stable, suitable for small data
4. **Quick Sort** - O(n log n) average - Unstable, widely used
5. **Merge Sort** - O(n log n) - Stable, consistent performance
6. **Heap Sort** - O(n log n) - Unstable, in-place

## 📊 Array Types

- Random arrays
- Nearly sorted arrays
- Reverse sorted arrays
- Arrays with duplicate elements

## 🎨 Visualization Features

- **Color coding**: Default (blue), comparing (yellow), swapping (red), sorted (green), pivot (purple), min/max (orange)
- **Real-time stats**: Comparison count, swap count, elapsed time
- **Progress display**: Sorting progress percentage
- **Bilingual support**: Chinese/English switching

## 🔧 Configuration Files

### TypeScript Configuration
- `tsconfig.json`: Root configuration, references other config files
- `tsconfig.app.json`: Application configuration (React + Vite)
- `tsconfig.node.json`: Node environment configuration

### Vite Configuration
- Plugins: React + Tailwind CSS
- Development server port: 5173

### ESLint Configuration
- Uses ESLint 9.x
- Supports React Hooks rules
- TypeScript ESLint support

## 📦 Dependencies

### Production Dependencies
- `react`: React core library
- `react-dom`: React DOM rendering

### Development Dependencies
- `@vitejs/plugin-react`: Vite React plugin
- `@tailwindcss/vite`: Tailwind CSS Vite plugin
- `typescript`: TypeScript compiler
- `eslint`: Code quality tool
- `tailwindcss`: CSS framework
- `autoprefixer`: CSS prefix processing
- `postcss`: CSS processing tool

## 🚀 Deployment Recommendations

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Automatic deployment

### GitHub Pages
1. Install `gh-pages`
2. Add deployment script
3. Run `npm run deploy`

## 📞 Contact

For questions or suggestions, please submit an Issue or Pull Request on GitHub.
