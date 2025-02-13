import axios from 'axios'
export default {
    async load() {
      // 获取远程数据
      const res = await axios.get(`https://api.surveybrowser.com/docs/1`)
      return { content: res.data.data.content }
    }
  }