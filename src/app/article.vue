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
.q-article {
  margin: 0 auto;
  max-width: 760px;
}
</style>
<template>
  <div class="q-article">
    <h1>An H1 header for this article</h1>
    <p>Paragraphs are separated by a blank line.</p>
    <p>2nd paragraph. <em>Italic</em>, <strong>bold</strong>, <del>Strikethrough</del>, <mark>highlight text</mark>, and <code>monospace</code>. Itemized lists
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

    <h2>Extended Markdown Syntax</h2>
    <h3>Images</h3>
    <p>
      <span class="quail-image-wrapper" style="width: auto; height: auto; margin: 1rem 0px; display: block;"><img src="https://static.quail.ink/media/qn2u29wq.webp" alt="An image to describe A girl and a boy, is playing in the yard" style="width: auto; height: auto;" class="quail-image"><span class="quail-image-caption" style="display: block;">A girl and a boy, is playing in the yard</span></span>
    </p>

    <p><span class="quail-image-wrapper" style="width: 120px; height: auto; margin: 1rem 0px; display: block;"><img src="https://static.quail.ink/media/qn2u29wq.webp?w=120px" alt="An image to describe post" style="width: 120px; height: auto;" class="quail-image"><span class="quail-image-caption" style="display: block;"></span></span></p>

    <h3>Custom Blocks</h3>

    <div data-fence="1" class="custom-block info" data-title="INFO"><div class="custom-block-title">INFO</div><p>This is a block of information, usually used to inform readers of some extra information. For example: grapes are a kind of fruit that can be eaten.</p></div>

    <div data-fence="1" class="custom-block tip" data-title="TIP"><div class="custom-block-title">TIP</div><p>This is a tip, usually used to tell readers some tips. For example: you can eat grapes without spitting out the skin.</p></div>

    <div data-fence="1" class="custom-block warning" data-title="WARNING"><div class="custom-block-title">WARNING</div><p>This is a warning, usually used to warn readers. For example: if you don't chew grapes, you may choke, please pay attention to the grapes in your mouth.</p></div>

    <div data-fence="1" class="custom-block danger" data-title="DANGER"><div class="custom-block-title">DANGER</div><p>This is a danger message, usually used to emphasize dangerous operations. For example: choking on grapes can lead to death, please be careful!</p></div>

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
</template>