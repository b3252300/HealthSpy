
import http from '@/utils/request'

//儲存疾病風險資料
export function SaveRiskResult(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendDiseaseRisk/SaveForm',
    data

  })
}

//是否有疾病風險資料
export function HasData(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendDiseaseRisk/HasData',
    data

  })
}

