<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Fence</h2>
    <div class="grid gap-4 grid-cols-2">
      <QFence text="Some text here to tell you something useful." />
      <QFence text="This will redirect you to an external page" link="https://quail.ink" />
      <QFence text="Some text here to tell you important information." type="warning" />
      <QFence text="Some text here to tell you some words of critical." type="error" />
      <QFence text="Some text here to make you happy." type="success" />
      <QFence text="Use your favorite icon to replace the default one." icon="QIconSun" />
      <QFence text="Super long text here, very blah blah bla, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
    </div>
  </div>
</template>