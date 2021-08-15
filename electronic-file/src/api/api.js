import request from '@/utils/request'
export function ListAlarms (aim, query = {}) { // 获取所有告警
  return request({
    url: aim + '/api/json/alarm/listAlarms',
    aim,
    method: 'get',
    params: query
  })
}
// http://202.114.205.64:8060/api/json/device/getInterfaceGraphs?&interfaceName=IF-10.80.16.120.30000000001-30000025622&isFluidic=true&graphName=traffic&period=twfourhours
export function getInterfaceGraphs (aim, query = {}) { // 获取类别中的设备
  return request({
    url: aim + '/api/json/device/getInterfaceGraphs',
    aim,
    method: 'get',
    params: query
  })
}
export function getDownDevices (aim, query = {}) { // 获取类别中的设备
  return request({
    url: aim + '/api/json/discovery/getDownDevices',
    aim,
    method: 'get',
    params: query
  })
}
export function fetchDevicesList (aim, query) { // 获取类别中的设备
  return request({
    url: aim + '/api/json/device/fetchDevicesList',
    aim,
    method: 'get',
    params: query
  })
}
export function getCategoryList (aim, query) { // 获取系统中的类别
  return request({
    url: aim + '/api/json/device/getCategoryList',
    aim,
    method: 'get',
    params: query
  })
}
