# Quail UI 优化建议

本文档记录了 Quail UI 库的代码审查结果和改进建议。

## 优先级说明

- **P0**: 严重问题，需立即修复
- **P1**: 重要问题，应尽快处理
- **P2**: 改进建议，可逐步实施

---

## 1. 内存泄漏问题 (P0) - ✅ 已修复

### 1.1 全局事件监听器未清理 ✅

**已修复文件**:
- `src/components/common/QDropdownMenu.vue` - 添加 `onUnmounted` 清理 storage 和 keydown 事件监听器
- `src/components/common/QDialog.vue` - 添加 `onUnmounted` 清理 storage 和 keydown 事件监听器

### 1.2 插件安装时重复添加监听器 ✅

**已修复文件**: `src/index.ts`

添加了防重复安装检查：
```typescript
if (!(window as any).__quailui_click_handler_installed) {
  document.body.addEventListener('click', () => closePopupMenu());
  (window as any).__quailui_click_handler_installed = true;
}
```

---

## 2. 无障碍访问 (P0) - ✅ 已修复

### 2.1 下拉菜单缺少键盘导航 ✅

**已修复文件**: `src/components/common/QDropdownMenu.vue`

添加了完整的键盘导航支持：
- `ArrowDown` - 移动到下一项
- `ArrowUp` - 移动到上一项
- `Enter` - 选择当前项
- `Escape` - 关闭菜单

### 2.2 对话框缺少焦点陷阱 ✅

**已修复文件**: `src/components/common/QDialog.vue`

添加了：
- 焦点陷阱 - Tab 键在对话框内循环
- Escape 键关闭对话框（非 persistent 模式）

### 2.3 ARIA 属性问题 ✅

**已修复文件**: `src/components/common/QButton.vue`

```html
<!-- 修复前 -->
<button :ariaLabel="realAriaLabel">

<!-- 修复后 -->
<button :aria-label="realAriaLabel">
```

### 2.4 菜单项缺少角色 ✅

**已修复文件**: `src/components/common/QMenu.vue`

添加了：
- `role="menu"` 到菜单容器
- `role="menuitem"` 到菜单项
- `role="separator"` 到分隔线
- `aria-disabled` 到禁用项

---

## 3. TypeScript 类型安全 (P1)

**状态**: 待处理

### 3.1 过度使用 `any` 类型

建议在以下文件改进类型定义：
- `src/index.ts` - install 函数参数
- `src/composables/useUtil.ts` - debounce 函数
- `src/components/common/QInput.vue` - ref 类型

### 3.2 Props 类型缺失

建议为 QMenu 等组件添加完整的接口定义。

---

## 4. 性能优化 (P1) - ✅ 已修复

### 4.1 使用 requestAnimationFrame 替代 setTimeout ✅

**已修复文件**: `src/components/common/QDropdownMenu.vue`

```typescript
// 修复前
setTimeout(() => {
  const rect = menu.getBoundingClientRect();
  if (rect.left < 0) menu.style.left = "0";
}, 10);

// 修复后
requestAnimationFrame(() => {
  const rect = menu.getBoundingClientRect();
  if (rect.left < 0) menu.style.left = "0";
});
```

### 4.2 字符串拼接优化 ✅

**已修复文件**: `src/composables/useUtil.ts`

`extractText` 函数改为使用数组 join 代替字符串拼接。

---

## 5. 代码一致性 (P1)

### 5.1 Props 类型统一 ✅

**已修复文件**: `src/components/common/QInput.vue`, `src/components/common/QTextarea.vue`

`hintIcon` 现在同时支持 `String` 和 `Object` 类型：
```typescript
hintIcon: {
  type: [String, Object],
  default: null,
}
```

### 5.2 重复的 debounce 函数 ✅

**已修复文件**: `src/composables/useUtil.ts`

已移除 `useUtil.ts` 中的重复 `debounce` 函数，统一使用 `src/util.ts` 中的版本。

### 5.3 全局弹窗关闭机制 ✅

**已修复文件**: `src/util.ts`, `QDropdownMenu.vue`, `QDialog.vue`

已改用 `CustomEvent` 替代 `sessionStorage` + `StorageEvent`：
```typescript
const POPUP_CLOSE_EVENT = 'quailui:close-popup';

function closePopupMenu() {
  window.dispatchEvent(new CustomEvent(POPUP_CLOSE_EVENT));
}

function onPopupClose(handler: () => void): () => void {
  window.addEventListener(POPUP_CLOSE_EVENT, handler);
  return () => window.removeEventListener(POPUP_CLOSE_EVENT, handler);
}
```

---

## 6. 样式改进 (P2) - ✅ 已修复

### 6.1 硬编码颜色值 ✅

**已修复文件**: `src/components/common/QSwitch.vue`

```scss
// 修复前
background: #ccc;

// 修复后
background: var(--q-c-dark-4);
```

### 6.2 CSS 变量标准化 ✅

**已修复文件**: `src/styles/base.scss`

添加了标准化的 border-radius 变量：
```scss
:root {
  --q-radius-xs: 4px;
  --q-radius-sm: 6px;
  --q-radius-md: 8px;
  --q-radius-lg: 12px;
  --q-radius-xl: 16px;
  --q-radius-full: 9999px;
}
```

### 6.3 暗色模式 Mixin ✅

**已创建文件**: `src/styles/mixin/dark-mode.scss`

```scss
@mixin dark-mode {
  .dark & {
    @content;
  }
}
```

---

## 7. 测试覆盖 (P1)

**状态**: 待处理

当前项目没有任何测试，建议添加：
- 单元测试 (Vitest)
- 组件测试 (@vue/test-utils)

---

## 8. 依赖更新 (P2) - ✅ 已修复

**已修复文件**: `package.json`

| 依赖 | 旧版本 | 新版本 |
|------|-------|-------|
| vue | ^3.3.4 | ^3.5.13 |
| vite | ^4.5.2 | ^6.0.7 |
| typescript | ^5.0.2 | ^5.7.3 |
| sass | ^1.66.1 | ^1.83.1 |
| @vitejs/plugin-vue | ^4.2.3 | ^5.2.1 |
| @types/node | ^20.5.1 | ^22.10.5 |
| qrcode | ^1.5.3 | ^1.5.4 |

---

## 9. 构建优化 (P2) - ✅ 已修复

### 9.1 按需加载支持 ✅

**已修复文件**: `src/index.ts`, `package.json`

添加了 tree-shaking 支持：

1. **Re-export 所有组件**：
```typescript
export * from './components/icons';
export * from './components/common';
```

2. **添加 sideEffects 配置**：
```json
"sideEffects": ["**/*.css", "**/*.scss"]
```

3. **单独的样式入口**：
```json
"exports": {
  "./style.css": "./dist/style.css"
}
```

**使用方式**：

```typescript
// 全量导入（自动加载样式）
import { QuailUI } from 'quail-ui';
app.use(QuailUI);

// 按需导入（需手动导入样式）
import { QButton, QInput } from 'quail-ui';
import 'quail-ui/style.css';
```

### 9.2 rollup-plugin-scss

**状态**: 保留现状

`rollup-plugin-scss` 用于将独立的 SCSS 文件打包为 `quail-ui.css`，这是 Vite 内置 SCSS 支持不直接处理的特定用例。

---

## 待修复的 Bug - ✅ 已修复

### QPagination 语法错误 ✅

**已修复文件**: `src/components/common/QPagination.vue`

```typescript
// 修复前
val.value++;1.234

// 修复后
val.value++;
```

---

## 修复总结

### 已完成 ✅

| 优先级 | 问题 | 文件 |
|--------|------|------|
| P0 | 内存泄漏 - QDropdownMenu | `QDropdownMenu.vue` |
| P0 | 内存泄漏 - QDialog | `QDialog.vue` |
| P0 | 内存泄漏 - 插件重复安装 | `index.ts` |
| P0 | 键盘导航 - QDropdownMenu | `QDropdownMenu.vue` |
| P0 | 焦点陷阱 - QDialog | `QDialog.vue` |
| P0 | ARIA 属性 - QButton | `QButton.vue` |
| P0 | ARIA 角色 - QMenu | `QMenu.vue` |
| P0 | 键盘导航视觉反馈 | `QMenu.vue`, `QDropdownMenu.vue` |
| P0 | QPagination 语法错误 | `QPagination.vue` |
| P1 | setTimeout 改 requestAnimationFrame | `QDropdownMenu.vue` |
| P1 | 字符串拼接优化 | `useUtil.ts` |
| P1 | 统一 hintIcon 类型 | `QTextarea.vue` |
| P1 | 合并重复 debounce | `useUtil.ts` |
| P1 | 全局弹窗关闭机制 (CustomEvent) | `util.ts`, `QDropdownMenu.vue`, `QDialog.vue` |
| P2 | 硬编码颜色 - QSwitch | `QSwitch.vue` |
| P2 | border-radius 变量 | `base.scss` |
| P2 | 暗色模式 Mixin | `dark-mode.scss` |
| P2 | 依赖更新 | `package.json` |

### 待处理

| 优先级 | 问题 |
|--------|------|
| P1 | TypeScript 类型安全改进 |
| P1 | 测试覆盖 |
