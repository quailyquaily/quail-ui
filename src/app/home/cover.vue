<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Cover</h2>
    <div class="grid gap-4 grid-cols-1">
      <div class="frame p-4" style="display: flex;">
        <div class="">
          <QPackCover src="https://static.quaily.com/media/jo4uz87q.jpg"
            title="A Pack Title"
            subtitle="A Pack Subtitle, it's a bit long"
            desc="10 items"
            :width="200"/>
        </div>
        <div class="ml-4">
          <QPackCover
            title="A Pack Title"
            subtitle="A Pack Subtitle, it's a bit long"
            desc="10 items"
            :width="300"/>
        </div>
        <div class="content p-4 ml-4">
          <h3 class="one-line-ellipsis q-text-h2 mb-2">A Pack Title</h3>
          <div class="two-line-ellipsis q-text-desc q-c-dark-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </div>
      </div>
    </div>
  </div>
</template>
