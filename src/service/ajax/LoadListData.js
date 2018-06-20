import ErrorMessage from './ErrorMessage'
import {ybLoadListData} from '../../../api/invitations'

class LoadListData {

  constructor (url, baseModel, property = {}, pageNum = 1, pageSize = 5) {
    // 当前分页
    this.pageNum = pageNum
    // 分页数据大小
    this.pageSize = pageSize
    // 加载数据的url
    this.url = url
    // 加载数据的额外参数
    this.property = property
    // 数据数组
    this.dataArr = []
    // 是否正在加载数据
    this.isLoading = false
    // 基础模型
    this.baseModel = baseModel
  }

  // 加载网络数据
  getWebData (property = {}) {
    // 首先判断是否正在加载数据
    if (this.isLoading) {
      return new Promise((resolve, reject) => {
        reject(ErrorMessage.loading)
      })
    } else {
      // 标记正在加载数据
      this.isLoading = true
      // 拼接参数
      this.property.pageNum = this.pageNum
      this.property.pageSize = this.pageSize
      // 拼接外部传入的数据
      for (let item in property) {
        this.property[item] = property[item]
      }
      return new Promise((resolve, reject) => {
        ybLoadListData(this.url, this.property).then((dataArr) => {
          // 标记数据加载完成
          this.isLoading = false
          // 分页数据+1
          this.pageNum += 1
          // 数据转模型
          const modelArr = this.baseModel.getModelsWithArr(dataArr)
          // 拼接数据
          this.dataArr = this.dataArr.concat(modelArr)
          resolve(this.dataArr)
        }).catch((err) => {
          // 标记数据加载完成
          this.isLoading = false
          reject(err)
        })
      })
    }
  }

  // 清空所有数据
  clearAllData () {
    this.pageNum = 1
    this.dataArr = []
  }

  // 清除指定位置的数据
  clearDataWithIndex (index) {
    this.dataArr.splice(index, 1)
  }
}

export default LoadListData
