# `style-lab/style.css` 与 Quail UI 现有体系映射

## 对照范围

- 来源样式: `style-lab/style.css`
- Quail UI token: `src/styles/base.scss`, `src/styles/theme/morph.scss`
- Quail UI utility / demo class: `src/styles/layout/helper.scss`, `src/styles/component.scss`, `src/app/home.vue`, `src/app/components/ComponentShowcase.vue`
- Quail UI 组件: `src/components/common/*`

## 状态说明

- `直接对应`: 现有体系里已经有比较稳定的同类 token / class / component
- `部分对应`: 语义接近，但落在 demo class 或缺少完整抽象
- `暂无对应`: 目前没有共享实现，若迁入 morph 需要新增 token、class 或组件
- `已确认新增`: 当前没有，但已决定补进 Quail UI
- `已确认映射`: 已决定复用现有组件，并通过 variant / theme 承接

## 1. 变量映射

| `style-lab` 变量 | 视觉角色 | Quail UI 变量对应 | Quail UI class / 使用点 | Quail UI 组件 | 状态 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `--bp-paper` | 主背景纸面 | `--q-bg-paper`、`--q-bg-light` | `body[data-theme="morph"]` 背景、`.preview-surface` | `QDrawer`、`QFence`、`QInput` | 已确认新增 | 新增 `--q-bg-paper` 作为纸面底色 token；morph 配色改为冷蓝白后以它为主背景。 |
| `--bp-paper-white` | 更亮的卡片底 | `--q-bg-white`、`--q-field-bg`、`--q-fence-bg`、`--q-drawer-bg` | `.frame`、`.preview-surface` | `QInput`、`QTextarea`、`QDrawer`、`QFence` | 部分对应 | 卡片亮底继续由 `--q-bg-white` 系列承担，和新 `--q-bg-paper` 拉开层次。 |
| `--bp-grid` | 网格线 / 辅助线 | `--morph-bg-grid-image`、`--morph-bg-grid-mask`、`--q-c-dark-4` | `.divider`、`.category-heading`、`.home-intro` 边线 | - | 部分对应 | morph 已有网格背景，但没有单独暴露成通用线框 token。 |
| `--bp-primary` | 主强调色 | `--q-c-blue` | `.touchable.highlight`、`.q-badge-primary` | `QButton`、`QBadge` | 直接对应 | morph 配色将改成冷蓝白，`--q-c-blue` 继续承担主 accent。 |
| `--bp-secondary` | 辅助强调色 / 深一级线条 | `--q-c-secondary` | 标签、细线、辅助强调、hover 深色态 | `QBadge`、`QButton`、后续 `QMediaFrame` | 已确认新增 | 新增 `--q-c-secondary`，承接 blueprint 的第二强调色。 |
| `--bp-ink` | 主文字 | `--q-c-dark` | `q-c-dark` | 全部文本组件 | 直接对应 | 语义接近。 |
| `--bp-copy` | 次级正文 | `--q-c-dark-2`、`--q-c-dark-3` | `q-c-dark-2`、`q-c-dark-3` | 全部文本组件 | 直接对应 | Quail UI 现有正文层级比 style-lab 更细。 |
| `--bp-shadow` | 轻阴影 | `--q-button-primary-shadow`、`--q-button-outlined-shadow`、`--q-drawer-shadow-*` | `.frame.shadow` | `QButton`、`QDrawer` | 部分对应 | 只有组件级阴影 token，没有通用 `surface-shadow-soft`。 |
| `--font-mono` | 技术标注 / 标签 | `--q-font-mono` | `q-text-caption`、代码块、drawer title | `QButton` 快捷键、`QDrawer` | 直接对应 | morph 已经大量使用 mono 做技术标签。 |
| `--font-editorial` | 标题 serif | `--q-font-serif` | `q-text-display-title`、`q-text-h1`、`q-text-h2` | `QPackCover` 标题、首页大标题 | 直接对应 | 字体族不同，但角色一致。 |
| `--font-sans` | 正文 sans | `--q-font-sans`、`--q-font-ui` | `q-text-body*`、`q-text-caption` | 几乎全部组件 | 直接对应 | 角色一致。 |

## 2. 样式块与 class / 组件映射

| `style-lab` 样式块 | 视觉意图 | Quail UI 变量 | Quail UI class | Quail UI 组件 | 状态 | 备注 |
| --- | --- | --- | --- | --- | --- | --- |
| `body` 蓝图网格背景 | 给 morph 一个技术纸面底纹 | `--q-bg-light`、`--morph-bg-grid-image`、`--morph-bg-grid-mask` | `body[data-theme="morph"]::before` | - | 直接对应 | 这部分已经在 morph 主题里落地。 |
| `.hero`, `.hero-label`, `.hero h1`, `.hero p` | 首页 / 主题封面 | `--q-font-serif`、`--q-font-sans`、`--q-c-dark-*` | `.home-intro`、`.intro-kicker`、`.intro-title`、`.intro-desc` | `QButton` 作为 CTA | 部分对应 | 现有实现主要在 demo 页，不是共享页面 primitive。 |
| `.bp-topline-section`, `.bp-kicker`, `.section-title` | section 顶部分隔线 + 技术感标题 | `--q-c-dark-4`、`--q-c-red`、`--q-font-mono`、`--q-font-serif` | `.divider`、`.section-kicker`、`.category-heading`、`.section-intro`、`q-text-h1/h2/caption` | `ComponentShowcase` | 部分对应 | Quail 已有相近的层次结构，但没有统一成一个可复用 `section rule` class。 |
| `.spec-code*` | 规格说明 / 源码展示块 | `--q-font-mono`、`--q-c-dark-4` | `.showcase-code`、`.code-header`、`.code-label` | `ComponentShowcase` | 部分对应 | 功能存在，但属于 demo 容器，不是导出的共享组件。 |
| `.color-grid`, `.bp-swatch*` | 配色样本展示 | `--q-c-dark-*` 仅能复用文字色阶 | 仅有 `typeface.vue` 里的色阶 demo，没有通用 swatch class | - | 暂无对应 | 如果要保留 style-lab 的配色说明方式，需要新增 `QSwatch` 或 demo-only pattern。 |
| `.bp-button`, `.bp-button.outlined`, `.bp-button.large` | 方正技术感按钮 | `--q-button-*` | `.touchable.primary`、`.touchable.outlined`、`.touchable.plain`、`.sm`、`.xs` | `QButton`、`QToggleButton`、`QTabs` | 直接对应 | `large` 没有显式 size token，但主体结构和主题钩子已经齐全。 |
| `.bp-corner-card`, `.bp-corner-card--dashed` | 卡片外框、角标、虚线容器 | 后续 `QCard` token 组，light / dark 继承 `.frame` 风格 | 现有 `.frame` 可作为非 morph 基底 | `QCard` | 已确认新增 | 直接新增 `QCard`，Morph 下做专门样式；light / dark 从现有 `.frame` 体系演进。 |
| `.bp-bracket-tag` | 方括号技术标签 | `--q-font-mono`、`--q-c-blue`、`--q-c-secondary`、`--q-radius-xs` | `q-text-caption`、`q-text-code` | `QBadge` | 已确认映射 | 直接映射到 `QBadge`，通过新的 technical / bracket variant 承接。 |
| `.bp-spec-plate`, `.bp-spec-number`, `.bp-spec-type`, `.bp-ref-chip` | 编号片、规格片、参考编号 | `--q-font-mono`、`--q-c-blue`、`--q-c-secondary`、`--q-c-dark-*` | `q-text-caption` | `QBadge` | 已确认映射 | 不单独造新组件，统一收进 `QBadge` 的 morph 变体。 |
| `.bp-leader-line` | 标注引导线 | - | - | - | 暂无对应 | 当前组件库没有共享 annotation line primitive。 |
| `.bp-catalog-heading`, `.catalog-grid`, `.bp-part-card` | 分类目录、部件卡列表 | 后续 `QCard` token 组 | `.catalog-shell`、`.category-group`、`.catalog-group-list` 可继续作为 demo 容器 | `QCard` | 已确认新增 | `catalog tile` 直接收进新的 `QCard` 样式，而不是停留在 demo layout。 |
| `.bp-media-frame`, `.coord`, `.corner-tr`, `.corner-bl`, `.image-wrapper` | 带角标和坐标的媒体框 | `--q-bg-white`、`--q-c-blue`、`--q-c-secondary` | `.frame` 只能提供最基础边框语义 | `QMediaFrame` | 已确认新增 | Quail UI 将新增 `QMediaFrame`，承接媒体边框、坐标标记、角框 ornament。 |
| `.crt-overlay`, `@keyframes bp-crt-*` | CRT 扫描线 / 撕裂 / 闪烁 | 后续 `QMediaFrame` 内部效果 token | - | `QMediaFrame` | 已确认新增 | 作为 `QMediaFrame` 的可选 Morph 特效，而不是散落成页面私有 CSS。 |
| `.annotation-card` | 说明卡 / 注释卡 | 后续 `QCard` token 组 | 现有 `.frame` 可作为 light / dark 基础样式 | `QCard` | 已确认新增 | `annotation card` 直接归入 `QCard` 的 Morph 样式族。 |

## 3. 当前对应关系的结论

| 结论 | 说明 |
| --- | --- |
| morph 会继续吸收 style-lab，但方式从“页面样式借用”升级为“组件库抽象” | 重点不是复制 demo 页面，而是把 token、card、badge、media frame 收进 Quail UI。 |
| token 层已确认补两项 | 新增 `--q-bg-paper` 和 `--q-c-secondary`，用于承接 blueprint 的纸面背景和次强调色。 |
| card 家族将统一归入 `QCard` | `corner card`、`annotation card`、`catalog tile` 都不再散落为页面 class，而是作为 `QCard` 的 Morph 样式。 |
| tag 家族直接归入 `QBadge` | `bracket tag`、`spec plate`、`ref chip` 这类技术标签统一通过 `QBadge` variant 承接。 |
| 媒体框单独做组件 | `media frame + coords + corners + optional CRT overlay` 直接落为新的 `QMediaFrame`。 |
| morph 配色方向已确认调整 | 从当前暖灰橙系改成冷蓝白，更接近 `style-lab` 的 blueprint 气质。 |

## 4. 如果要把 style-lab 继续并入 morph，优先抽这几项

| 优先级 | 候选抽象 | 建议落点 | 原因 |
| --- | --- | --- | --- |
| P1 | `--q-bg-paper` | `src/styles/base.scss` + `src/styles/theme/morph.scss` | 把纸面背景从一般浅灰背景里拆出来，避免继续复用 `--q-bg-light`。 |
| P1 | `--q-c-secondary` | `src/styles/base.scss` + `src/styles/theme/morph.scss` | 需要一个稳定的第二强调色承接技术标签、细线和 media frame 辅助色。 |
| P1 | Morph 配色迁移 | `src/styles/theme/morph.scss` | 将 morph 从暖灰橙切换到冷蓝白，和 `style-lab` 统一气质。 |
| P1 | `QCard` | `src/components/common/QCard.vue` | 统一承接 `corner card`、`annotation card`、`catalog tile`；Morph 用专门样式，light / dark 基于 `.frame` 演进。 |
| P1 | `QBadge` 技术变体 | 扩展 `src/components/common/QBadge.vue` | 直接映射 `bracket tag`、`spec plate`、`ref chip`，避免重复造轮子。 |
| P1 | `QMediaFrame` | `src/components/common/QMediaFrame.vue` | 统一承接媒体框、坐标、角框以及可选 CRT 效果。 |
| P2 | `section rule` 模式 | 新增共享 class，或抽成轻量 `QSectionHeader` | 仍然值得做，但优先级低于 token / card / media frame。 |
| P3 | `swatch grid` | docs/demo 专用组件 | 主要用于主题说明和文档展示，不必先进入运行时组件库。 |

## 5. 本轮确认方案

| 主题 | 已确认方向 |
| --- | --- |
| 颜色 | morph 改成冷蓝白；以 `style-lab` 的 blueprint 气质为参考，不再沿用当前暖灰橙。 |
| 新 token | 新增 `--q-bg-paper`、`--q-c-secondary`。 |
| Card | 新增 `QCard`，Morph 下至少覆盖 `corner card`、`annotation card`、`catalog tile` 三类样式；light / dark 版本基于当前 `.frame` 语言调整。 |
| Tag | `style-lab` 的 tag / spec / ref chip 全部映射到 `QBadge` 的新 variant。 |
| Media | 新增 `QMediaFrame`，承接 media frame、coord、corner、CRT overlay。 |
| 现有 `.frame` | 不废弃，保留为 light / dark 的基础视觉来源，并可作为 `QCard` 的非 morph 样式基底。 |
