import axios from 'axios'

// 天气接口地址
const uts="https://geoapi.qweather.com"

// 天气接口的key
const key="a477e81021844a049fb9ee06ad5919f8"

// 地名查询经纬度
export function selectAddress(address) {
  return axios.get(`${uts}/v2/city/lookup?location=${address}&key=${key}&lang=zh`)
  
}

// 查询地区实时天气经纬度
export function selectWeather(address) {
  return axios.get(`https://devapi.qweather.com/v7/weather/now?location=${address}&key=${key}&lang=zh`)
  
}


