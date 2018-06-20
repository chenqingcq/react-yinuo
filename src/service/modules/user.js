/*
 *用户相关
 */
import {
  usAuthentical,
  usAuthenticalForm,
  couHomeRedPacket,
  usCashList,
  usCashDetail,
  usData,
  usNameCard,
  publicLogin
} from "./apipath"
import {get, post, put, upImage} from '@/services/ajax/netaxios'

class User{
  checkAuthen() {
    const url = usAuthentical
    return get(url)
  }

  createAuthen(exname, excompany, exphone, businessCard = '') {
    const url = usAuthenticalForm;
    let params = {
      exhibitorName: exname,
      exhibitorCompany: excompany,
      exhibitorPhone: exphone,
      businessCard,
    }
    return post(url, params)
  }

  updateAuthen(exname, excompany, exphone, imgurl) {
    const url = usAuthenticalForm;
    let params = {
      exhibitorName: exname,
      exhibitorCompany: excompany,
      exhibitorPhone: exphone,
      businessCard: imgurl
    }
    return put(url, {params})
  }

  updateAuthenNameCard(etarget) {
    const url = usNameCard;
    let params = {
      name: 'businessCard',
      e: etarget
    }
    return upImage(url, params)
  }

  CashDetail() {
    const url = usCashDetail
    return get(url)
  }

  CashList() {
    const url = usCashList
    return get(url)
  }


// ===================== 查询用户信息 start =======================
  getUserData() {
    return get(usData)
  }

// ===================== 查询用户信息 end =======================


// ===================== 获取token start =======================
  getToken(p) {
    return get(publicLogin, p, true)
  }



  /*
   * 添加进度
   * */
  getUserInfo (opt, isShowFullLoading = true) {

    const url = '/api/user'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }

}

export default new User()


// ===================== 获取用户信息 end =======================
