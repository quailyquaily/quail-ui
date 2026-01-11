<script lang="ts" setup>
import { util } from "quail-js";
import { onMounted, ref } from "vue";

const hljsBase = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0";
const hljsUrl = `${hljsBase}/highlight.min.js`;
const hljsThemeDarkUrl = `${hljsBase}/styles/obsidian.min.css`;
const hljsThemeLightUrl = `${hljsBase}/styles/atom-one-light.min.css`;

const langs:any = ref([]);

async function injectHljs() {
  await util.inject(hljsUrl, { async: true });
  const codeItems = document.querySelectorAll(".q-article pre code");
  for (let ix = 0; ix < codeItems.length; ix++) {
    let lang = codeItems[ix].className
      .replace("language-", "")
      .toLowerCase();
    if (lang === "" || lang === "undefined") {
      lang = "code";
    }
    langs.value.push(lang);
  }
}

async function renderCodeblock() {
  async function renderCodeblockFn() {
    const codeDom = document.querySelectorAll("code");
    const hljsDom = [];
    for (let ix = 0; ix < codeDom.length; ix++) {
      const item = codeDom[ix];
      if (item.classList.contains("hljs")) {
        // check the class `.hljs`
        hljsDom.push(item);
      } else if (item.className.indexOf("language-") !== -1) {
        // the code block failed to render by hljs
        hljsDom.push(item);
      }
    }
    for (let ix = 0; ix < hljsDom.length; ix++) {
      const item = hljsDom[ix];
      const parent = item.parentElement as any;
      const tag = document.createElement("div");
      const tagShadow = document.createElement("div");
      let lang = "";
      for (let ix = 0; ix < item.classList.length; ix += 1) {
        const cls = item.classList[ix];
        if (cls.startsWith("language-")) {
          lang = cls.replace("language-", "");
          break;
        }
      }
      if (lang === "" || lang === "undefined") {
        lang = "code";
      }
      console.log("render block, lang:", lang);
      tag.classList.add("hljs-tag");
      tagShadow.classList.add("hljs-tag-shadow");
      tag.innerText = lang;
      tagShadow.innerText = lang;
      parent.appendChild(tag);
      parent.appendChild(tagShadow);
    }
  }

  const detected = document.querySelector("pre code");
  if (detected !== null) {
    await injectHljs();
    util.wait(
      () => {
        const hljs = (window as any).hljs;
        if (hljs) {
          const filteredLangs = [];
          for (let ix = 0; ix < langs.value.length; ix++) {
            if (filteredLangs.indexOf(langs.value[ix]) === -1) {
              filteredLangs.push(langs.value[ix]);
            }
          }

          console.log(
            "[i] render codeblock for languages:",
            filteredLangs.join(",")
          );

          hljs.configure({ languages: filteredLangs });

          const appDom = document.querySelector("#app");
          if (appDom) {
            if (appDom.className.indexOf("light") !== -1) {
              util.inject(hljsThemeLightUrl, { "data-id": "hljs-theme" });
            } else {
              util.inject(hljsThemeDarkUrl, { "data-id": "hljs-theme" });
            }
          }
          const codeItems = document.querySelectorAll(".q-article pre code");
          for (let ix = 0; ix < codeItems.length; ix++) {
            hljs.highlightElement(codeItems[ix]);
          }
          const hljsDom = document.querySelectorAll(".hljs");
          console.log(
            `[i] render codeblock, total=${codeItems.length}, rendered=${hljsDom.length}`
          );
          return hljsDom && hljsDom.length > 0;
        }
        return false;
      },
      async () => {
        await renderCodeblockFn();
      },
      100,
      30
    );
  }
};

onMounted(async () => {
  renderCodeblock();
});
</script>
<style lang="scss" scoped>

.article-container {
  border: 0.5px solid var(--q-c-dark-4);
  border-radius: 8px;
  background: var(--q-bg-light);
}

.article-header {
  padding: 0.875rem 1.25rem;
  background: var(--q-bg-light-2);
  border-bottom: 0.5px solid var(--q-c-dark-4);
  border-radius: 8px 8px 0 0;
}

.article-content {
  padding: 2rem;
  border-radius: 0 0 8px 8px;
}

.q-article {
  margin: 0 auto;
  overflow: auto;
}

</style>

<style lang="scss">
.dark {
  .article-container {
    border-color: var(--q-c-light-4);
    background: var(--q-bg-dark);
  }

  .article-header {
    background: var(--q-bg-dark-2);
    border-bottom-color: var(--q-c-light-4);

    .q-text-h2 {
      color: var(--q-c-light);
    }

    .q-text-desc {
      color: var(--q-c-light-2) !important;
    }
  }
}
</style>
<template>
  <div class="article-page">
    <div class="article-container">
      <div class="article-header">
        <h2 class="q-text-h2">Article Preview</h2>
        <p class="q-text-desc q-c-dark-3 mt-1">Rich text content styling showcase</p>
      </div>
      <div class="article-content">
        <div class="q-article">
    <h1>An H1 header for this article</h1>
    <p>Paragraphs are separated by a blank line.</p>
    <p>2nd paragraph. <em>Italic</em>, <strong>bold</strong>, <del>Strikethrough</del>, <mark>highlight text</mark>, <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd>, and <code>monospace</code>. Itemized lists
    look like:</p>
    <ul>
    <li>this one
      <ul>
        <li>The hex dump reveals references to the Windows PowerShell executable.</li>
        <li>This suggests that the shortcut is likely designed to invoke PowerShell, potentially to execute a series of commands without user consent.</li>
      </ul>
    </li>
    <li>that one</li>
    <li>the other one</li>
    </ul>
    <p>Here's a numbered list:</p>
    <ol>
      <li>first item
        <ol>
          <li>The hex dump reveals references to the Windows PowerShell executable.</li>
          <li>This suggests that the shortcut is likely designed to invoke PowerShell, potentially to execute a series of commands without user consent.</li>
        </ol>
      </li>
      <li>second item</li>
      <li>third item</li>
    </ol>
    <p>And following a blockquote</p>
    <blockquote>
    <p>Block quotes are
    written like so.</p>
    <p>They can span multiple paragraphs,
    if you like.</p>
    </blockquote>
    <p>Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., &quot;it's all
    in chapters 12--14&quot;). Three dots ... will be converted to an ellipsis.
    Unicode is supported. ☺</p>

    <p>Here's a table:</p>
    <table>
      <thead>
        <tr><th></th><th>重量</th><th>尺寸</th></tr>
      </thead>
      <tbody>
        <tr><td>Framework 13</td><td>2.9 磅</td><td>11.67x9x0.62 英寸</td></tr>
        <tr><td>Macbook Air M2</td><td>2.7 磅</td><td>11.97x8.46x0.44 英寸</td></tr>
        <tr><td>Macbook Pro M1</td><td>3.0 磅</td><td>11.97x8.36x0.61 英寸</td></tr>
      </tbody>
    </table>

    <p>Here's a code sample:</p>
    <pre><code># Let me re-iterate ...
for i in 1 .. 10 { do-something(i) }</code></pre>
    <p>As you probably guessed, indented 4 spaces. By the way, instead of
    indenting the block, you can use delimited blocks, if you like:</p>
    <pre><code class="language-xasd">define foobar() {
    print &quot;Welcome to flavor country!&quot;;
}</code></pre>
    <p>(which makes copying &amp; pasting easier). You can optionally mark the
    delimited block for Pandoc to syntax highlight it:</p>
    <pre><code class="language-python">import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i</code></pre>

    <div class="quail-ad-wrapper" style="width: 100%; height: auto; margin: 1rem 0px; display: block;"><div class="quail-ad active" data-ad-id="1" style="width: 100%; height: auto;"><img src="https://quaily.com/portal-images/illustration/finance-you-0.webp" class="quail-ad-cover"><div class="quail-ad-content-container"><div class="quail-ad-title q-c-dark-1 q-text-h3">测试广告 1: 一口价</div><div class="quail-ad-content q-c-dark-3 q-text-body-title">他好我也好</div></div><div class="quail-ad-tag">Ad</div></div></div>

    <h2>Extended Markdown Syntax</h2>
    <h3>Images</h3>
    <p>
      <span class="quail-image-wrapper" style="width: auto; height: auto; margin: 1rem 0px; display: block;"><img src="https://static.quaily.com/media/qn2u29wq.webp" alt="An image to describe A girl and a boy, is playing in the yard" style="width: auto; height: auto;" class="quail-image"><span class="quail-image-caption" style="display: block;">A girl and a boy, is playing in the yard</span></span>
    </p>

    <p><span class="quail-image-wrapper" style="width: 120px; height: auto; margin: 1rem 0px; display: block;"><img src="https://static.quaily.com/media/qn2u29wq.webp?w=120px" alt="An image to describe post" style="width: 120px; height: auto;" class="quail-image"><span class="quail-image-caption" style="display: block;"></span></span></p>

    <h3>Custom Blocks</h3>

    <div data-fence="1" class="custom-block info" data-title="INFO">
      <div class="custom-block-title">
        <svg viewBox="0 0 16 16" version="1.1" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>
        INFO
      </div>
      <p>This is a block of information, usually used to inform readers of some extra information. For example: grapes are a kind of fruit that can be eaten.</p>
    </div>

    <div data-fence="1" class="custom-block tip" data-title="TIP">
      <div class="custom-block-title">
        <svg viewBox="0 0 16 16" version="1.1" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>
        TIP
      </div>
      <p>This is a tip, usually used to tell readers some tips. For example: you can eat grapes without spitting out the skin.</p>
    </div>

    <div data-fence="1" class="custom-block important" data-title="IMPORTANT">
      <div class="custom-block-title">
        <svg viewBox="0 0 16 16" version="1.1" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
        IMPORTANT
      </div>
      <p>This is a important, usually used to tell readers some important. For example: you can eat grapes without spitting out the skin.</p>
    </div>

    <div data-fence="1" class="custom-block warning" data-title="WARNING">
      <div class="custom-block-title">
        <svg viewBox="0 0 16 16" version="1.1" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
        WARNING
      </div>
      <p>This is a warning, usually used to warn readers. For example: if you don't chew grapes, you may choke, please pay attention to the grapes in your mouth.</p>
    </div>

    <div data-fence="1" class="custom-block danger" data-title="DANGER">
      <div class="custom-block-title">
        <svg viewBox="0 0 16 16" version="1.1" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>
        DANGER
      </div>
      <p>This is a danger message, usually used to emphasize dangerous operations. For example: choking on grapes can lead to death, please be careful!</p>
    </div>

    <h3>Enclave / TradingView</h3>

    <div class="enclave-object-wrapper"><iframe class="enclave-object youtube-enclave-object" width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div>

    <h3>Enclave / Quaily</h3>

    <div class="enclave-object-wrapper normal-wrapper"><div class="enclave-object quail-enclave-object normal-object no-border"><iframe src="https://quail.ink/blog/widget?theme=light&amp;layout=&amp;logged=ignore" data-theme="light" width="100%" height="auto" title="Quail Widget" frameborder="0" allow="web-share"></iframe></div></div>

    <div class="enclave-object-wrapper normal-wrapper"><div class="enclave-object quail-enclave-object normal-object no-border"><iframe src="https://quail.ink/blog/p/customize-newsletter-subscription-form-for-your-website/widget?theme=light&amp;layout=&amp;logged=ignore" data-theme="light" width="100%" height="128px" title="Quail Widget" frameborder="0" allow="web-share"></iframe></div></div>

    <div class="enclave-object-wrapper normal-wrapper"><div class="enclave-object quail-enclave-object normal-object no-border"><iframe src="https://quail.ink/blog/widget?theme=light&amp;layout=subscribe_form_mini&amp;logged=ignore" data-theme="light" width="100%" height="142px" title="Quail Widget" frameborder="0" allow="web-share"></iframe></div></div>

    <h3>An h3 header</h3>
    <h4>Nested list and others</h4>
    <p>Now a nested list:</p>
    <ol>
      <li>
      <p>First, get these ingredients:</p>
      <ul>
      <li>carrots</li>
      <li>celery</li>
      <li>lentils</li>
      </ul>
      </li>
    <li>
      <p>Boil some water.</p>
    </li>
    <li>
      <p>Dump everything in the pot and follow
      this algorithm:</p>
      <pre><code>find wooden spoon
      uncover pot
      stir
      cover pot
      balance wooden spoon precariously on pot handle
      wait 10 minutes
      goto first step (or shut off burner when done)
      </code></pre>
      <p>Do not bump wooden spoon or it will fall.</p>
    </li>
    </ol>
    <p>Notice again how text always lines up on 4-space indents (including
    that last line which continues item 3 above).</p>
    <h5>Link test</h5>
    <p>Here's a link to <a href="http://foo.bar">a website</a>, to a <a href="local-doc.html">local
    doc</a>, and to a <a href="#an-h2-header">section heading in the current
    doc</a>. Here's a footnote [^1].</p>
    <p>[^1]: Footnote text goes here.</p>
    <p>Tables can look like this:</p>
    <p>size  material      color</p>
    <hr>
    <p>9     leather       brown
    10    hemp canvas   natural
    11    glass         transparent</p>
    <p>Table: Shoes, their sizes, and what they're made of</p>
    <p>(The above is the caption for the table.) Pandoc also supports
    multi-line tables:</p>
    <hr>
    <p>keyword   text</p>
    <hr>
    <p>red       Sunsets, apples, and
    other red or reddish
    things.</p>
    <p>green     Leaves, grass, frogs
    and other things it's
    not easy being.</p>
    <hr>
    <p>A horizontal rule follows.</p>
    <hr>
    <p>Here's a definition list:</p>
    <p>apples
    : Good for making applesauce.
    oranges
    : Citrus!
    tomatoes
    : There's no &quot;e&quot; in tomatoe.</p>
    <p>Again, text is indented 4 spaces. (Put a blank line between each
    term/definition pair to spread things out more.)</p>
    <p>Here's a &quot;line block&quot;:</p>
    <p>| Line one
    |   Line too
    | Line tree</p>
    <p>and images can be specified like so:</p>
    <p><img src="https://quaily.com/portal-images/illustration/hero-0.webp" alt="example image" title="An exemplary image"></p>
    <p>Inline math equations go in like so: $\omega = d\phi / dt$. Display
    math should get its own line and be put in in double-dollarsigns:</p>
    <p>$$I = \int \rho R^{2} dV$$</p>
    <p>And note that you can backslash-escape any punctuation characters
    which you wish to be displayed literally, ex.: `foo`, *bar*, etc.</p>
        </div>
      </div>
    </div>
  </div>
</template>
