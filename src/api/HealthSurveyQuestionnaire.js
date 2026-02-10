
import http from '@/utils/request'

//取得會員健康問卷結果
export function GetSurveyList(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendHealthScore/GetSurveyList',
    data

  })
}
//儲存健康問卷答案
export function SaveSurvey(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendHealthScore/SaveSurvey',
    data

  })
}


//取得會員是否填過問卷
export function HaveSurveyResult(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendHealthScore/HaveSurveyResult',
    data

  })
}
