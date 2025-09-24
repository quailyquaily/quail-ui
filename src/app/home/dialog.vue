<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Dialog & MessageDialog</h2>
    <div class="grid gap-4 grid-cols-2 mb-4">
      <QButton class="outlined" @click="dialogValue1 = true">
        Open Dialog
      </QButton>

      <QButton class="outlined" @click="dialogValue2 = true">
        Open Persistent Dialog
      </QButton>

      <QDialog v-model="dialogValue3" desktop-mode="popup">
        <template #trigger>
          <QButton class="outlined" @click.stop="openDialog3">
            Open Dialog (popup)
          </QButton>
        </template>

        <div class="dialog-body">
          <div class="form-row center">
            <p style="text-align: center">Some text here</p>
          </div>
        </div>
      </QDialog>

      <QDialog v-model="dialogValue4" desktop-mode="popup" no-frame>
        <template #trigger>
            <QButton class="outlined" @click.stop="openDialog4">
            Open Dialog (popup & no-frame)
          </QButton>
        </template>

        <div
          class="dialog-body"
          style="padding: 1rem; position: relative"
        >
          <div class="dialog-body-frame" style="background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
            <div class="grid gap-4 grid-cols-1 center">
              <QButton class="primary block">
                Action
              </QButton>
              <QButton class="danger block">
                Action
              </QButton>
              <QButton class="stripe" @click="dialogValue4 = false">
                Cancel
              </QButton>
            </div>
          </div>
        </div>
      </QDialog>

      <QDialog v-model="dialogValue8" desktop-mode="popup" no-frame popup-position="top">
        <template #trigger>
          <QButton class="outlined" @click.stop="dialogValue8 = true">
            Open Dialog (top)
          </QButton>
        </template>

        <div class="dialog-body" style="padding: 1rem; position: relative">
          <div class="dialog-body-frame" style="background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
            <div class="flex search-wrapper">
              <QSearchInput class="search-box" />
              <QButton class="primary block icon ml-2">
                <QIconSearch class="icon" />
              </QButton>
            </div>
            <div class="search-result flex place-center q-c-dark-3 q-text-caption">
              <span class="p-4">Search results</span>
            </div>
          </div>
        </div>
      </QDialog>

      <QDialog v-model="dialogValue1" title="Hello">
        <div class="dialog-body">
          <div class="form-row center">
            <p class="text-center p-4">Some text here!</p>
          </div>
        </div>
      </QDialog>

      <QDialog v-model="dialogValue2" title="Hello" :persistent="true">
        <div class="dialog-body">
          <div class="form-row center mb-4">
            <p class="text-center p-4">You must click close button to close me</p>
          </div>
          <div class="flex place-center">
            <QButton class="primary" @click="dialogValue2 = false">
              Close
            </QButton>
          </div>
        </div>
      </QDialog>

    </div>
    <div class="grid gap-4 grid-cols-2 mb-4">
      <QButton class="outlined" @click="dialogValue5 = true">
        Open Message Dialog
      </QButton>

      <QButton class="outlined" @click="dialogValue6 = true">
        Open Message Dialog (emoji)
      </QButton>

      <QButton class="outlined" @click="dialogValue7 = true">
        Open Message Dialog (warn)
      </QButton>

      <QMessageDialog v-model="dialogValue5"
        icon="QIconSun"
        icon-color="orange"
        title="Hello!"
        text="This is a message dialog."
        :actions="[{label: 'OK', class: 'primary', action: () => { dialogValue5 = false }}]"/>

      <QMessageDialog v-model="dialogValue6"
        icon-emoji="💎"
        icon-color="green"
        title="Treasure!"
        text="You lucky guy, you found a treasure! 🎉  "
        :actions="[{label: 'OK', class: 'primary', action: () => { dialogValue6 = false }}]"/>

      <QMessageDialog v-model="dialogValue7"
        icon="QIconTrash"
        icon-color="red"
        title="Are you sure to delete?"
        text="This is an unrecoverable action, please be careful. Your data [xxx] will be deleted forever, are you really sure?"
        :actions="[
          {label: 'Cancel', class: 'outlined', action: () => { dialogValue7 = false }},
          {label: 'Delete', class: 'primary danger', action: () => { dialogValue7 = false }}
        ]"/>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const dialogValue1 = ref(false);
const dialogValue2 = ref(false);
const dialogValue3 = ref(false);
const dialogValue4 = ref(false);
const dialogValue5 = ref(false);
const dialogValue6 = ref(false);
const dialogValue7 = ref(false);
const dialogValue8 = ref(false);

function openDialog3(ev:any) {
  dialogValue3.value = true;
}

function openDialog4(ev:any) {
  dialogValue4.value = true;
}

</script>

<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  .search-box {
    flex: 1;
  }
}
</style>
