import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  setup() {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://w1022.ttkefu.com/k/?fid=2H7EBD1'
      script.charset = 'utf-8'
      script.async = true
      document.body.appendChild(script)

      const div = document.createElement('div')
      div.style.display = 'none'
      div.innerHTML = '<a href="http://www.ttkefu.com">在线客服系统</a>'
      document.body.appendChild(div)
    }
  }
}