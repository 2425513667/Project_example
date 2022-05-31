import axios from 'axios'

const uts="https://www.fastmock.site/mock/5ca672858b710f010c0e528acfad29b7/api"

// 查询所有岗位列表 
export function selectPostAll() {
  return axios.get(`${uts+'/postfind'}`)
  
}
