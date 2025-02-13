<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { marked } from 'marked'
import markedAlert from 'marked-alert'


const props = defineProps<{ docId: string }>()
const content = ref<any>('')
const loading = ref(true)
const error = ref<string | null>(null)
// // 使用扩展并给定名称

// 安全文本提取函数
const extractText = (input: any): string => {
  if (typeof input === 'string') return input
  if (input?.text) return extractText(input.text)
  if (Array.isArray(input?.tokens)) return input.tokens.map(extractText).join('')
  return String(input)
}

// 强化渲染器
const createRenderer = () => {
  const renderer = new marked.Renderer()
  marked.use(markedAlert())
  
  renderer.heading = (text: any) => {
    const cleanText = text.text.replace(/<[^>]*>/g, '').trim();

    const slug = cleanText
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'heading'

    return `<h${text.depth} id="${slug}" class="vp-heading" data-toc-level="${text.depth}">${cleanText}</h${text.depth}>`
  }


  return renderer
}

// 生成大纲
const generateTOC = () => {
  const container = document.getElementById('vp-toc') || document.createElement('div')
  container.id = 'vp-toc'
  container.className = 'vp-toc-container'
  document.querySelector('.VPDocAside')?.prepend(container)

  const headers = Array.from(document.querySelectorAll('.vp-heading'))
    .map(el => ({
      level: parseInt(el.getAttribute('data-toc-level') || '2'),
      title: el.textContent?.replace(/#/g, '').trim() || '',
      link: `#${el.id}`
    }))
    .filter(h => h.title.length > 0)

  container.innerHTML = headers.length > 0 ? `
    <nav>
      ${headers.map(h => `
       <ul class="navul">
        <a class="toc-item level-${h.level}" 
           href="${h.link}"
           style="padding-left: ${(h.level - 1) * 12}px">
          ${h.title}
        </a>
       </ul>
      `).join('')}
    </nav>
  ` : ''
}

let observer: MutationObserver | null = null

onMounted(async () => {
  try {
    const res = await axios.get(`https://api.surveybrowser.com/docs/${props.docId}`)
    content.value = marked.parse(res.data.data.content, {
      renderer: createRenderer(),
    })

    observer = new MutationObserver(() => {
      if (document.querySelector('.vp-heading')) {
        generateTOC()
        observer?.disconnect()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

    setTimeout(generateTOC, 300)
    setTimeout(generateTOC, 600)

  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.getElementById('vp-toc')?.remove()
})
</script>

<template>
  <div class="container">
    <div v-if="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="content" v-html="content"></div>
  </div>
</template>

<style>
.content :deep(.vp-heading) {
  scroll-margin-top: 80px;
  position: relative;
}

.content :deep(.anchor) {
  opacity: 0;
  transition: opacity 0.2s;
  color: var(--vp-c-brand);
}

.content :deep(.vp-heading:hover) .anchor {
  opacity: 1;
}

.vp-toc-container {
  position: sticky;
  top: 80px;
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 20px;
}

:deep(.navul) {
  font-size:14px;
}

.toc-item {
  display: block;
  padding: 6px 0;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
  font-size: 0.9em;
}

.toc-item:hover {
  color: var(--vp-c-brand);
}


.markdown-alert-title .octicon {
    background-color: var(--vp-custom-block-tip-border);
    height: 2rem;
    width: 2rem;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.6rem;
}

.markdown-alert-note {
  color: var(--vp-custom-block-info-text);
  background-color: var(--vp-custom-block-info-bg);
  border-color: var(--vp-custom-block-info-border);
  border-left: 5px solid var(--vp-custom-block-info-border);
  padding: 10px;
  margin-bottom: 15px;
}

.danger {
  background-color: #ffcccc;
  border-left: 5px solid #f44336;
  padding: 10px;
}

.markdown-alert-tip {
  background-color: var(--vp-custom-block-tip-bg);
  border-left: 5px solid var(--vp-custom-block-tip-border);
  padding: 10px;
  margin-bottom: 15px;
  color: var(--vp-custom-block-tip-text);
}

.markdown-alert-warning {
  color: var(--vp-custom-block-warning-text);
  background-color: var(--vp-custom-block-warning-bg);
  border-left: 5px solid var(--vp-custom-block-warning-border);
  padding: 10px;
  margin-bottom: 15px;
}
.markdown-alert-caution {
  background-color: var(--vp-custom-block-danger-bg);
  border-left: 5px solid var(--vp-custom-block-danger-border);
  padding: 10px;
  margin-bottom: 15px;
  color: var(--vp-custom-block-danger-text);
}

.markdown-alert-important {
  background-color: var(--vp-code-line-diff-add-color);
  border-left: 5px solid var(--vp-code-line-diff-add-color);
  padding: 10px;
  margin-bottom: 15px;
  color: var(--vp-custom-block-tip-text);
}
</style>