import router from './router'
import cookies from '@/utils/cookies'
import { TOKEN } from '@/config/constant'
import getPageTitle from '@/utils/getPageTitle'
import { useUserStore, usePermissionStore } from '@/store'
import NProgress from '@/utils/progress'

const whiteList = ['/login', 'test']
router.beforeEach(async (to, from, next) => {
  console.log(to, "to");

  NProgress.start()
  document.title = getPageTitle(to.meta?.title)
  const hasToken = cookies.get(TOKEN)
  const userStore = useUserStore()
  const permissionStore = usePermissionStore();

  if (hasToken && hasToken !== 'undefined') {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
