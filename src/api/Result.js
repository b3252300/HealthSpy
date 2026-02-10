
import http from '@/utils/request'

//取得會員健康問卷結果
export function GetSurveyResult(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendHealthScore/GetSurveyResult',
    data

  })
}

//取得所有病種最近風險資料
export function GetAllRisk(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendDiseaseRisk/GetAllRisk',
    data

  })
}


//取得最近五次疾病風險資料
export function GetRiskHistory(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendDiseaseRisk/GetRiskHistory',
    data

  })
}
