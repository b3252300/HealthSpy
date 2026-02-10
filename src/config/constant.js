export const COOKIE_PREFIX = 'vite_'
export const TOKEN = `${COOKIE_PREFIX}_token`
export const AVATAR = ''

export const GLOBAL_DATA = {
  env: 'fat',
  // dev : {
  //   baseUrl : '/api'
  // },
  fat: {
    baseUrl: '/api'
  },
  uat: {
    baseUrl: '/api'
  },
  pro: {
    baseUrl: '/api'
  }
}

export const WHITE_CODE_LIST = [
  {
    code: 0,
    msg: ''
  },
  {
    code: 5006,
    msg: '驗證碼錯誤或已過期'
  }
]

export const LOGIN_ERROR_CODE = [
  {
    code: 5004,
    msg: '無效token'
  }
]
