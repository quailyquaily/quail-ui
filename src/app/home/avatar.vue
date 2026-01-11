<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Avatar</h2>

    <div class="demo-groups">
      <!-- Variants -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Variants</div>
        <div class="flow">
          <QAvatar :src="'https://picsum.photos/200'" :size="42" />
          <QAvatar :src="'https://picsum.photos/200'" :size="42" border-type="solid" />
          <QAvatar :src="'https://picsum.photos/200'" :size="42" variant="rounded" border-type="solid" />
          <QAvatar :src="'https://picsum.photos/200'" :size="42" variant="square" border-type="solid" />
        </div>
      </div>

      <!-- With Icons -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">With Icons</div>
        <div class="flow">
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

      <!-- Sizes -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Sizes</div>
        <div class="flow">
          <QAvatar src="#" :size="24" />
          <QAvatar src="#" :size="32" variant="rounded" />
          <QAvatar src="#" :size="48" variant="square"/>
          <QAvatar src="#" :size="64" />
          <QAvatar src="#" :size="96" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.demo-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}
</style>
