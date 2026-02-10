import {
  createRouter,
  createWebHistory,
  // createWebHashHistory
} from 'vue-router'

import Layout from '@/layout/index.vue'
import LayoutSpy from '@/layout/spy.vue'

// 配置路由信息
export const constantRoutes = [{
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: {
      title: 'Redirect',
      hidden: true
    },
    children: [{
      path: '/redirect/:path(.*)',
      name: 'RedirectInfo',
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: 'Redirect',
        hidden: true
      }
    }]
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/HealthCheckup/index.vue'),
  //   meta: {
  //     hidden: true,
  //     title: '登录'
  //   }
  // },

  {
    path: '/404',
    name: 'Error404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
      title: '404'
    }
  },
  {
    path: '/500',
    name: 'Error500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      hidden: true,
      title: '500'
    }
  }
]




export const asyncRoutes = [{
    path: '/',
    name: 'nhmc',
    component: Layout,
    redirect: '/member/HealthSurvey/index',
    meta: {
      title: 'nhmc',
    },
    children: [{
        path: '/v',
        name: 'Version',
        component: () => import('@/views/HealthCheckup/Version.vue'),
        meta: {
          title: 'Version',
          affix: true,
          activeMenu: true,
          hidden: true

        }
      },
      {
        path: '/member/nhmc/Schedule',
        name: 'schedule',
        component: () => import('@/views/HealthCheckup/index.vue'),
        meta: {
          title: '健檢行程',
          affix: true,
          activeMenu: true

        }
      },
      {
        path: '/member/nhmc/Confirm',
        name: 'Confirm',
        component: () => import('@/views/HealthCheckup/Confirm.vue'),
        meta: {
          title: '行前資料確認',
          affix: true,
          activeMenu: true

        }
      },
      {
        path: '/member/nhmc/CheckItem',
        name: 'CheckItem',
        component: () => import('@/views/HealthCheckup/CheckItem.vue'),
        meta: {
          title: '健檢行程總覽',
          affix: true,
          activeMenu: true

        }
      },

    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    name: 'Redirect404',
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/500',
    name: 'Error500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      hidden: true,
      title: '500'
    }
  }
]

export const healthAsyncRoutes = [{
    path: '/',
    redirect: '/member/HealthSurvey/index',
    component: LayoutSpy,
    children: [{
        path: '/test',
        name: 'test',
        component: () => import('@/views/HealthCheckup/test.vue'),
        meta: {
          title: 'test',
          affix: true,
          activeMenu: true,
          hidden: true

        }
      },
      {
        path: '/healthspyvue/validation/:rowId/:action',
        name: 'validation',
        component: () => import('@/views/HealthCheckup/validation.vue'),
        meta: {
          title: '健康特務',
          affix: true,
          activeMenu: true,
          hidden: true

        }
      },
      {
        path: '/member/HealthSurvey/index',
        name: 'HealthSurveyQuestionnaire',
        component: () => import('@/views/HealthSurvey/index.vue'),
        meta: {
          title: '健康分數',
          affix: true,
          activeMenu: true

        }
      },
      {
        path: '/member/HealthSurvey/Result',
        name: 'HealthSurveyResult',
        component: () => import('@/views/HealthSurvey/Results.vue'),
        meta: {
          title: '健康分數結果',
          affix: true,
          activeMenu: true

        }
      },
      {
        path: '/member/DiseaseRisk/index',
        name: 'RiskQuestionnaire',
        component: () => import('@/views/DiseaseRisk/index.vue'),
        meta: {
          title: '疾病風險',
          affix: true,
          activeMenu: true

        }
      },
      {
        path: '/member/DiseaseRisk/Result',
        name: 'RiskQuestionnaireResult',
        component: () => import('@/views/DiseaseRisk/Results.vue'),
        meta: {
          title: '疾病風險預測結果',
          affix: true,
          activeMenu: true

        }
      },
      {
        path: '/member/DiseaseRisk/NationalResult',
        name: 'NationalResult',
        component: () => import('@/views/DiseaseRisk/NationalResult.vue'),
        meta: {
          title: '疾病風險預測結果',
          affix: true,
          activeMenu: true

        }
      }

    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    name: 'Redirect404',
    meta: {
      title: '404',
      hidden: true
    }
  },
    {
    path: '/500',
    name: 'Error500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      hidden: true,
      title: '500'
    }
  }
]




const router = createRouter({
  // history: createWebHashHistory('./'),
  history: createWebHistory(
    import.meta.env.VITE_PUBLIC_PATH),
  routes: healthAsyncRoutes,
  scrollBehavior: () => ({
    left: 0,
    top: 0
  })
})

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login']
  router.getRoutes().forEach(route => {
    const {
      name
    } = route
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router