<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Avatar</h2>
    <div class="grid gap-4 grid-cols-2">
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">different variant</div>
        <div class="flow">
          <QAvatar :src="'https://picsum.photos/200'" :size="42" border-type="solid" />
          <QAvatar :src="'https://picsum.photos/200'" :size="42" variant="rounded" border-type="solid" />
          <QAvatar :src="'https://picsum.photos/200'" :size="42" variant="square" border-type="solid" />
          <QAvatar :size="42" border-type="hollow" border-color="#d2466286">
            <QIconColorInstagram class="icon" />
          </QAvatar>
          <QAvatar :size="42" border-type="hollow" border-color="#54b5e686">
            <QIconColorTwitter class="icon" />
          </QAvatar>
          <QAvatar :size="42" border-type="solid" >
            <QIconColorTwitter class="icon" />
          </QAvatar>
        </div>
      </div>
      <div>
        <div class="q-text-caption q-c-dark-3 mb-2">different size</div>
        <div class="flow">
          <QAvatar :src="'https://picsum.photos/200'" :size="24" />
          <QAvatar :src="'https://picsum.photos/200'" :size="32" variant="rounded" />
          <QAvatar :src="'https://picsum.photos/200'" :size="48" variant="square"/>
          <QAvatar :src="'https://picsum.photos/200'" :size="64" />
          <QAvatar :src="'https://quail.ink'" :size="96" />
        </div>
      </div>

    </div>
  </div>
</template>
