import { defineStore } from 'pinia'
import cookies from '@/utils/cookies'
import { TOKEN } from '@/config/constant'
// import { logout } from '@/api/user'
import { resetRouter } from '@/router'
import useTagsViewStore from './tagsView'

const useUserStore = defineStore({
  id: 'users',
  state: () => {
    return {
      token: cookies.get(TOKEN),

    }
  },
  actions: {
    SET_TOKEN(token = '') {
      token ? cookies.set(TOKEN, token) : cookies.remove(TOKEN)
      this.token = token
    },


    // 清空所有登录信息
    RESET_INFO() {
      return new Promise(resolve => {
        const tagsViewStore = useTagsViewStore()
        cookies.clearAll()
        resetRouter()
        tagsViewStore.DEL_ALL_VIEWS(null)
        resolve()
      })
    }
  }
})
export default useUserStore
