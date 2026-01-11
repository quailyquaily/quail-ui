<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Collapse</h2>

    <div class="collapse-groups">
      <!-- Basic -->
      <div class="collapse-group">
        <div class="group-label q-text-caption q-c-dark-3">Basic</div>
        <QCollapse v-model="activeKeys">
          <QCollapseItem name="1" title="What is Quaily?">
            Quaily is a newsletter and blog platform that helps creators publish and monetize their content.
          </QCollapseItem>
          <QCollapseItem name="2" title="How do I get started?">
            Sign up for an account, create your first post, and share it with your audience. It's that simple!
          </QCollapseItem>
          <QCollapseItem name="3" title="Is there a free plan?">
            Yes! Quaily offers a generous free tier that includes all basic features.
          </QCollapseItem>
        </QCollapse>
      </div>

      <!-- With Subtitle -->
      <div class="collapse-group">
        <div class="group-label q-text-caption q-c-dark-3">With Subtitle</div>
        <QCollapse>
          <QCollapseItem name="1" title="Account Settings" subtitle="Manage your profile and preferences">
            Update your name, email, password and other account settings here.
          </QCollapseItem>
          <QCollapseItem name="2" title="Billing" subtitle="View invoices and payment methods">
            Manage your subscription, view billing history, and update payment information.
          </QCollapseItem>
        </QCollapse>
      </div>

      <!-- With Icon and Extra -->
      <div class="collapse-group">
        <div class="group-label q-text-caption q-c-dark-3">With Icon & Extra</div>
        <QCollapse>
          <QCollapseItem name="1" title="Notifications">
            <template #icon>
              <QIconMail class="icon" />
            </template>
            <template #extra>
              <QBadge type="primary" size="sm">3 new</QBadge>
            </template>
            Configure how and when you receive notifications.
          </QCollapseItem>
          <QCollapseItem name="2" title="Security">
            <template #icon>
              <QIconKey class="icon" />
            </template>
            <template #extra>
              <QBadge type="success" size="sm" variant="light">Enabled</QBadge>
            </template>
            Two-factor authentication and security settings.
          </QCollapseItem>
        </QCollapse>
      </div>

      <!-- Accordion -->
      <div class="collapse-group">
        <div class="group-label q-text-caption q-c-dark-3">Accordion Mode</div>
        <QCollapse v-model="accordionKeys" accordion>
          <QCollapseItem name="a" title="Section A">
            Only one section can be open at a time in accordion mode.
          </QCollapseItem>
          <QCollapseItem name="b" title="Section B">
            Opening this section will close the previously opened one.
          </QCollapseItem>
          <QCollapseItem name="c" title="Section C">
            This creates a cleaner interface when you have many items.
          </QCollapseItem>
        </QCollapse>
      </div>

      <!-- Ghost Mode -->
      <div class="collapse-group">
        <div class="group-label q-text-caption q-c-dark-3">Ghost Mode</div>
        <QCollapse ghost>
          <QCollapseItem name="1" title="Ghost Item 1">
            Ghost mode provides a cleaner look with separated items.
          </QCollapseItem>
          <QCollapseItem name="2" title="Ghost Item 2">
            Each item has its own background and the content has a left border.
          </QCollapseItem>
          <QCollapseItem name="3" title="Ghost Item 3">
            Great for FAQ sections or settings pages.
          </QCollapseItem>
        </QCollapse>
      </div>

      <!-- Sizes -->
      <div class="collapse-group">
        <div class="group-label q-text-caption q-c-dark-3">Sizes</div>
        <div class="size-demos">
          <div class="size-demo">
            <div class="size-label">Small</div>
            <QCollapse size="sm">
              <QCollapseItem name="1" title="Small Size">
                Compact content area.
              </QCollapseItem>
            </QCollapse>
          </div>
          <div class="size-demo">
            <div class="size-label">Medium (default)</div>
            <QCollapse size="md">
              <QCollapseItem name="1" title="Medium Size">
                Standard content area.
              </QCollapseItem>
            </QCollapse>
          </div>
          <div class="size-demo">
            <div class="size-label">Large</div>
            <QCollapse size="lg">
              <QCollapseItem name="1" title="Large Size">
                Spacious content area.
              </QCollapseItem>
            </QCollapse>
          </div>
        </div>
      </div>

      <!-- Disabled -->
      <div class="collapse-group">
        <div class="group-label q-text-caption q-c-dark-3">Disabled Item</div>
        <QCollapse>
          <QCollapseItem name="1" title="Normal Item">
            This item works normally.
          </QCollapseItem>
          <QCollapseItem name="2" title="Disabled Item" disabled>
            This item cannot be toggled.
          </QCollapseItem>
        </QCollapse>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeKeys = ref(['1']);
const accordionKeys = ref(['a']);
</script>

<style scoped lang="scss">
.collapse-groups {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.collapse-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.size-demos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.size-demo {
  .size-label {
    font-size: 0.75rem;
    color: var(--q-c-dark-3);
    margin-bottom: 0.5rem;
  }
}
</style>
