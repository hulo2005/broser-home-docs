<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

const props = defineProps<{
  docId: string
}>()

const md = new MarkdownIt().use(anchor, {
  level: [1, 2, 3],
  slugify: (s) => encodeURIComponent(
    String(s).trim().toLowerCase().replace(/\s+/g, '-')
  )
})

const content = ref('')
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await axios.get(`https://api.surveybrowser.com/docs/${props.docId}`)
    content.value = md.render(res.data.data.content)
  } catch (err) {
    error.value = '文档加载失败'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="doc-container">
    <div v-if="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="content" v-html="content"></div>
  </div>
</template>

<style scoped>
.doc-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.content :deep(h1),
.content :deep(h2),
.content :deep(h3) {
  scroll-margin-top: 6rem;
}

.content :deep(.header-anchor) {
  opacity: 0.8;
  margin-left: -1.2em;
  float: left;
  transition: opacity 0.2s;
}

.content :deep(.header-anchor:hover) {
  opacity: 1;
}
</style>