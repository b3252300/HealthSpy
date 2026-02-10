
import http from '@/utils/request'

//測試
// export function ReservationList(data) {
//   return http.request({
//     method: 'post',
//     url: '/api/FrontendNhmc/ReservationList',
//     data
//   })
// }

//取得token
export function GetVersion(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetVersion',
    data

  })
}


//取得token
export function Validation(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/Validation',
    data

  })
}

//取得預設停留頁籤
export function GetDefaultTab(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetDefaultTab',
    data
  })
}

//取得預約清單
export function GetReservationList(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetReservationList',
    data
  })
}


//取得歷史清單
export function GetHistoryList(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetHistoryList',
    data
  })
}

//取得行前確認資料
export function GetConfirmData(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetConfirmData',
    data
  })
}

//設定行前確認資料
export function SetConfirmData(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/SetConfirmData',
    data
  })
}

//取得行程總覽
export function GetExamCheckItem(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetExamCheckItem',
    data
  })
}


//取得縣市區域
export function GetCities(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetCities',
    data
  })
}


// 取得問卷
export function GetExamSurvey(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetExamSurvey',
    data
  })
}


// 取得報告
export function GetExamReport(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetExamReport',
    data
  })
}


// 取得報到QrCode
export function GetQrCode(data) {
  return http.request({
    method: 'post',
    url: '/api/FrontendNhmc/GetQrCode',
    data
  })
}