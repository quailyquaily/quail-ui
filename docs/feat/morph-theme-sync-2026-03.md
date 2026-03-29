# Morph 主题与 Mister Morph 站点设计同步（2026-03）

## 对照范围

- canonical 来源：[`../../../mistermorph-website/docs/design_impl.md`](../../../mistermorph-website/docs/design_impl.md)
- 当前 Quail UI 实现：
  - [`../../src/styles/base.scss`](../../src/styles/base.scss)
  - [`../../src/styles/theme/morph.scss`](../../src/styles/theme/morph.scss)
  - [`../../src/components/common/QCard.vue`](../../src/components/common/QCard.vue)
  - [`../../src/components/common/QBadge.vue`](../../src/components/common/QBadge.vue)
  - [`../../src/components/common/QMediaFrame.vue`](../../src/components/common/QMediaFrame.vue)
  - [`../../src/components/common/QDivider.vue`](../../src/components/common/QDivider.vue)
- 旧映射文档：[`../style-lab-morph-mapping.md`](../style-lab-morph-mapping.md)

## 结论

- `quail-ui` 的 Morph 颜色方向、纸面背景、技术标签、card、media frame，已经基本跟上这一轮站点设计。
- 真正需要同步的，不是继续堆更多页面私有 CSS，而是把 Morph 文档从“`style-lab` 映射”升级为“以 `design_impl.md` 为准的共享语法边界”。
- 新版站点文档里大量规则属于页面骨架，不应该直接塞进通用主题 token；应区分 `theme / component layer` 和 `page-shell layer`。

## 1. 当前已经对齐或基本对齐的部分

| 设计规则 | 当前状态 | Quail UI 落点 | 说明 |
| --- | --- | --- | --- |
| 冷蓝白配色、纸面底色、第二强调色 | 已对齐 | `base.scss`、`theme/morph.scss` | `--q-bg-paper`、`--q-c-secondary`、冷蓝白色阶已经存在，可继续视为 Morph 主题基线。 |
| 技术纸面背景 | 基本对齐 | `theme/morph.scss` | 已有 `--morph-bg-grid-*` 和纸面背景，但“背景更淡、更通透”目前仍是经验值，不是单独的强度 token。 |
| 技术标签 / bracket 语言 | 已对齐 | `QBadge.vue` | `technical` / `bracket` 方向已经成立，能够承接大部分技术标签语法。 |
| card 家族 | 已对齐 | `QCard.vue` | `annotated`、`tile`、spec plate、leader line 已经覆盖新版文档里 card 体系的大部分需求。 |
| media frame 家族 | 已对齐 | `QMediaFrame.vue` | coordinate、corner、optional CRT overlay 已经存在。 |
| Morph 下的细分隔线审美 | 部分对齐 | `QDivider.vue` | 目前只有横向 labeled divider；还不能代表新版站点的整套 divider language。 |

## 2. 需要继续同步到共享层的部分

这些内容已经超出旧 `style-lab` 映射，但又确实属于可以复用的 Morph 语法，应继续抽到 `quail-ui` 的共享文档或共享实现里。

| 待同步项 | 建议落点 | 原因 |
| --- | --- | --- |
| `kicker` tokenization | 新增轻量 primitive，或在 docs 中定义统一 HTML/CSS 语法 | 新版 canonical 明确要求 `[`、`//`、`]` 分别 token 化，且 `kicker` 不做本地化。Quail UI 当前没有共享写法。 |
| `display-heading-secondary` | 新增共享 heading utility，或文档化为统一 class | 新版 homepage / install / catalog 二级标题已统一成一套 display heading 语言，Quail UI 当前没有明确承接。 |
| shared install CTA rule | 给 `QButton` 增加明确的 Morph preset，或新增 utility class | `install` 是跨页面共享主动作，新的设计文档明确给出高度、字号、tracking、padding 约束。当前 Quail UI 只有通用按钮 token，没有这层语义。 |
| external link treatment | 新增 `external-link` utility 或链接变体文档 | 站点已经区分产品内导航和跳出体系的外链；Quail UI 目前没有单独的 Morph 外链语法。 |
| divider language 的页面化部分 | 单独定义 page-shell primitive，不要继续挤进 `QDivider` | 新版 divider language 包含渐隐横线、page rail 虚线、标题短竖线三套规则；它们不是一个普通 divider 组件能覆盖的。 |
| background permeability | 把网格强度单独 token 化 | 设计文档已经把背景“降淡、退后”写成 canonical 规则，后续若继续调淡，不应再直接改死在主题样式里。 |

## 3. 不应直接并入通用主题的部分

以下规则虽然是新版 `design_impl.md` 的 canonical 内容，但它们属于站点级页面骨架，而不是通用组件库的 Morph theme。

| 站点规则 | 判断 | 说明 |
| --- | --- | --- |
| `--site-max-width`、`--site-gutter`、`2256px` canvas | 保留在页面层 | 这是站点容器策略，不是通用组件 token。 |
| `rail-section` 命名、三栏/两栏/单栏断点、`rail-section-narrow` | 保留在页面层 | 这是页面 skeleton system，不是单个组件的主题职责。 |
| header IA、一级导航结构、`LANG` / `MENU` helper surface | 保留在页面层 | 这些是 Mister Morph 站点信息架构，不应文档化成 Quail UI 通用主题规范。 |
| install / deploy / downloads / Aqua / Coe 页面骨架 | 保留在页面层 | 它们是产品页模板，不是可直接抽象成主题 token 的组件规则。 |
| stacked contour outline 工具 | 保留在页面层或单独工具层 | 这是面向特定 hero action block 的几何工具，不属于基础 Morph theme。 |

## 4. 文档层面的推荐写法

后续在 `quail-ui` 文档里描述 Morph 时，建议采用下面这条边界：

- `Morph theme`
  - 负责颜色、表面、标签、卡片、media frame、基础 divider、按钮和字段的视觉语言。
- `Morph page-shell`
  - 负责 rail、container、页面级 divider、hero / install / downloads 这类页面骨架。

也就是说：

- 不要把 `rail-section` 写成 `quail-ui` 已有主题 token。
- 不要把当前 `QDivider` 描述成已经覆盖新版站点 divider language。
- 要明确写出 `QCard`、`QBadge`、`QMediaFrame` 已经是新版 Morph 共享语法的一部分。

## 5. 建议的后续动作

| 优先级 | 动作 | 说明 |
| --- | --- | --- |
| P1 | 把 Morph 的 canonical 来源切换到 `design_impl.md` | 旧的 `style-lab` 文档只能作为来源之一，不该继续被理解成唯一基线。 |
| P1 | 为 `kicker`、secondary display heading、install CTA、external link 补共享文档 | 这四项是新版设计里最明显、也最值得抽象的共享语法。 |
| P2 | 如果之后真的要在 Quail UI 里复用站点骨架，再单开 `page-shell` 层 | 不建议把 rail system 直接塞进现有 theme token。 |
| P2 | 为背景网格强度单独留 token | 这样后续可以继续“降淡”而不破坏其他 Morph 组件。 |

## 6. 本轮同步结论

本轮判断不是 “Quail UI 的 Morph 需要重做”，而是：

- 组件层已经跟上了新版 Morph 的大方向。
- 文档边界需要更新。
- 新增同步重点应放在 `kicker / heading / CTA / external link` 这些共享语法。
- `rail` 和各产品页 skeleton 继续留在站点实现层，除非后续明确要抽一套 `page-shell`。
