<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Share</h2>
    <div class="grid gap-4 grid-cols-2">
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">layout:row</div>
        <QShare url="https://quaily.com" layout="row" :services="['twitter', 'facebook', 'linkedin','mastodon', 'bluesky', 'hackernews', 'general']"/>
      </div>
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">layout:column</div>
        <QShare url="https://quaily.com" layout="column" />
      </div>
    </div>
  </div>
</template>
