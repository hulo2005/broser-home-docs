<template>
  <div>
    <div v-if="loading">正在加载内容...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else v-html="content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { marked } from 'marked'

const props = defineProps({
  docId: {
    type: String,
    required: true
  }
})

const content = ref('')
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get(`https://your-backend-api/docs/${props.docId}`)
    content.value = marked(response.data.markdownContent)
  } catch (err) {
    console.error('Error fetching document:', err)
    error.value = '无法加载内容。请稍后再试。'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* 可选：添加样式以美化内容 */
</style>