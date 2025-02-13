<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: DefaultLayout } = DefaultTheme.Components
const { page } = useData()
</script>

<template>
  <DefaultLayout>
    <template #aside-outline-before>
      <!-- 这里放置自定义 TOC 容器 -->
      <div id="dynamic-toc-container" class="dynamic-toc" />
    </template>
  </DefaultLayout>
</template>

<style>
.dynamic-toc {
  position: sticky;
  top: 6rem;
  max-height: 80vh;
  overflow-y: auto;
}
</style>