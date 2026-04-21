# 依赖漏洞修复记录（2026-04-21）

这份记录基于 2026-04-21 的两次 `pnpm audit --json`：

- 第一次用于定位问题
- 第二次用于验证修复结果

修复前总数：

| 等级 | 数量 |
| --- | ---: |
| critical | 0 |
| high | 8 |
| moderate | 4 |
| low | 1 |
| 合计 | 13 |

修复后验证结果：

| 等级 | 数量 |
| --- | ---: |
| critical | 0 |
| high | 0 |
| moderate | 0 |
| low | 0 |
| 合计 | 0 |

## 修复结果

这 13 条都在开发工具链里，不在当前运行时代码的直接依赖里。最后采用的是“一个直接升级 + 一组传递依赖 override”的最小改动方案。

来源主要有三条：

| 入口包 | 当前版本 | 传递出的漏洞包 |
| --- | --- | --- |
| `vite` | `6.4.2` | `vite`、`rollup`、`picomatch` |
| `sass` | `1.97.2` | `immutable`、`picomatch` |
| `vue-tsc` | `2.2.12` | `minimatch`、`brace-expansion` |

实际落地的改动如下：

| 类型 | 包 | 变更 |
| --- | --- | --- |
| 直接依赖升级 | `vite` | `6.4.1 -> 6.4.2` |
| `pnpm.overrides` | `rollup` | `4.55.1 -> 4.60.2` |
| `pnpm.overrides` | `picomatch` | `4.0.3 -> 4.0.4` |
| `pnpm.overrides` | `picomatch` | `2.3.1 -> 2.3.2` |
| `pnpm.overrides` | `immutable` | `5.1.4 -> 5.1.5` |
| `pnpm.overrides` | `minimatch` | `9.0.4 -> 9.0.9` |
| `pnpm.overrides` | `brace-expansion` | `2.0.1 -> 2.1.0` |

验证结果：

1. `pnpm build` 通过
2. `pnpm build:demo` 通过
3. `pnpm audit --json` 结果为 `0` 漏洞

## 漏洞明细

### 1. `vite` 相关

| 等级 | 包 | 当前版本 | Advisory | 漏洞 | 依赖路径 | 建议 |
| --- | --- | --- | --- | --- | --- | --- |
| high | `vite` | `6.4.1` | `GHSA-p9ff-h696-f583` / `CVE-2026-39363` | Vite dev server WebSocket 可读任意文件 | `.>vite` | 升到 `vite >=6.4.2` |
| moderate | `vite` | `6.4.1` | `GHSA-4w7w-66w2-5vf9` / `CVE-2026-39365` | 优化依赖的 `.map` 请求存在路径穿越 | `.>vite` | 升到 `vite >=6.4.2` |
| high | `rollup` | `4.55.1` | `GHSA-mw96-cpmx-2vgc` / `CVE-2026-27606` | 构建输出文件名清洗不严，可能导致任意文件写入 | `.>vite>rollup` | 升到 `rollup >=4.59.0`；优先通过升级 `vite` 带上来 |
| high | `picomatch` | `4.0.3` | `GHSA-c2c7-rcm5-vvqj` / `CVE-2026-33671` | extglob 触发 ReDoS | `.>vite>picomatch` | 升到 `picomatch >=4.0.4`；优先通过升级 `vite` 带上来 |
| moderate | `picomatch` | `4.0.3` | `GHSA-3v7f-55p6-f55p` / `CVE-2026-33672` | POSIX 字符类方法注入，导致 glob 匹配错误 | `.>vite>picomatch` | 升到 `picomatch >=4.0.4`；优先通过升级 `vite` 带上来 |

说明：

`vite` 这一组和本仓库最贴近，因为本地开发和预览都直接用到它。尤其是 dev server 相关问题，如果把开发服务暴露到局域网或公网，风险更实际。

### 2. `sass` 相关

| 等级 | 包 | 当前版本 | Advisory | 漏洞 | 依赖路径 | 建议 |
| --- | --- | --- | --- | --- | --- | --- |
| high | `immutable` | `5.1.4` | `GHSA-wf6x-7x77-mvgw` / `CVE-2026-29063` | Prototype Pollution | `.>sass>immutable` | 升到 `immutable >=5.1.5` |
| high | `picomatch` | `2.3.1` | `GHSA-c2c7-rcm5-vvqj` / `CVE-2026-33671` | extglob 触发 ReDoS | `.>sass>@parcel/watcher>micromatch>picomatch` | 升到 `picomatch >=2.3.2` |
| moderate | `picomatch` | `2.3.1` | `GHSA-3v7f-55p6-f55p` / `CVE-2026-33672` | POSIX 字符类方法注入，导致 glob 匹配错误 | `.>sass>@parcel/watcher>micromatch>picomatch` | 升到 `picomatch >=2.3.2` |

说明：

这一组都在 `sass` 的依赖链里。`immutable` 可以直接看版本线是否已修；`picomatch@2` 则要看 `@parcel/watcher` 和 `micromatch` 的组合有没有新版已经带上修复。审计结果没有给出这条链的自动修复目标，说明很可能需要人工确认，必要时用 `pnpm.overrides`。

### 3. `vue-tsc` 相关

| 等级 | 包 | 当前版本 | Advisory | 漏洞 | 依赖路径 | 建议 |
| --- | --- | --- | --- | --- | --- | --- |
| high | `minimatch` | `9.0.4` | `GHSA-3ppc-4f35-3m26` / `CVE-2026-26996` | 重复 `*` 通配符导致 ReDoS | `.>vue-tsc>@vue/language-core>minimatch` | 升到 `minimatch >=9.0.6`；审计建议目标是 `9.0.9` |
| high | `minimatch` | `9.0.4` | `GHSA-7r86-cg39-jmmj` / `CVE-2026-27903` | 多个非相邻 `**` 触发组合爆炸式回溯 | `.>vue-tsc>@vue/language-core>minimatch` | 升到 `minimatch >=9.0.7`；审计建议目标是 `9.0.9` |
| high | `minimatch` | `9.0.4` | `GHSA-23c5-xmqv-rm74` / `CVE-2026-27904` | 嵌套 `*()` extglob 生成灾难性回溯正则 | `.>vue-tsc>@vue/language-core>minimatch` | 升到 `minimatch >=9.0.7`；审计建议目标是 `9.0.9` |
| low | `brace-expansion` | `2.0.1` | `GHSA-v6h2-p8h4-qcjw` / `CVE-2025-5889` | 正则复杂度问题，可能导致 ReDoS | `.>vue-tsc>@vue/language-core>minimatch>brace-expansion` | 升到 `brace-expansion >=2.0.2` |
| moderate | `brace-expansion` | `2.0.1` | `GHSA-f886-m6hf-6m8v` / `CVE-2026-33750` | 零步长序列会卡死并大量吃内存 | `.>vue-tsc>@vue/language-core>minimatch>brace-expansion` | 升到 `brace-expansion >=2.0.3`；审计建议目标是 `2.1.0` |

说明：

这一组都是 `vue-tsc -> @vue/language-core -> minimatch -> brace-expansion` 带进来的。因为 `package.json` 里没有直接声明 `minimatch`，实际修法通常是升级 `vue-tsc`，或者在确认兼容后，用 `pnpm.overrides` 压到 `minimatch 9.0.9` 和 `brace-expansion 2.1.0`。

## 审计工具给出的升级方向

`pnpm audit` 这次给出的建议目标版本如下：

| 包 | 建议目标版本 | 备注 |
| --- | --- | --- |
| `brace-expansion` | `2.1.0` | 可同时覆盖两个 `brace-expansion` 问题 |
| `minimatch` | `9.0.9` | 可同时覆盖三个 `minimatch` 问题 |
| `rollup` | `4.60.2` | 高于漏洞修复最低版本 `4.59.0` |
| `immutable` | `5.1.5` | 直接修复 |
| `picomatch` | `4.0.4` | 只覆盖 `vite` 这条 `4.x` 依赖线 |
| `vite` | 需要人工 review | 但 advisory 明确写的是 `>=6.4.2` |

## 后续建议

1. 这次用了 `pnpm.overrides`，后面如果 `sass`、`vue-tsc` 的上游版本自然带上这些修复，可以把 override 缩掉。
2. 每次升级构建工具链后，继续保留 `pnpm build` 和 `pnpm audit` 这两步验证。
