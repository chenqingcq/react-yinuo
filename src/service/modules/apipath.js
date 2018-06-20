// 首页模板案例
export const homeTemplate = '/api/invitations/count'


//=========================主页 home=======================
// 主页红包列表
export const homeRedPacket = '/api' + '/invitations/redPacket'
export const homeRedPacketRank = '/api/invitations/redPacket'

//=========================分享邀请函链接END=======================


//=========================邀请函统计 cou ==========================

export const couCreateUser = 'api/invitations/createUser'
export const couInvitatonCount = '/invitations/count/:invitationId'

// 主页红包列表
export const couHomeRedPacket = '/api' + '/invitations/redPacket'

// 收索界面查询
export const couSearchTemplate = '/api' + '/invitations/count'

// 获取回收站列表
export const couRecycleList = '/api' + '/invitations/trash'

// 通过邀请函ID获取红包详细信息
export const couRedPacketDetail = '/api' + '/invitations/redPacket/detail'

//获取邀请函基本信息
export const couInvitationstBasic = '/api' + '/invitations/basic/'

// 查询指定邀请函的数据统计数据
export const couInvitationstCount = '/api' + '/invitations/count/'

// 获取当前用户排名情况
export const couInvitationsCreateUserCurrentRank = '/api' + '/invitations/createUser/currentRank'

// 获取创建者排行榜总计数
export const couInvitationsCreateUserTotal = '/api' + '/invitations/createUser/total'

// 批量删除回收站内邀请函
export const couInvitationsBatch = '/api' + '/invitations/batch/delete'

// 批量恢复回收站内邀请函
export const couBatchRestore = '/api' + '/invitations/batch/restore'

//通过邀请函ID获取我的顶部数据
export const couInvitationCountData = '/api/invitations/count/'

// 获取创建者排名列表
export const couInvitationsCreateUserRank = '/api' + '/invitations/createUser/rank'

// 获取展商用户创建的所有邀请函统计信息
export const couInvitationsCreateUser = '/api/invitations/createUser'

// 获取指定邀请函ID的分享者排名情况
export const couInvitationsSharesRank = '/api/invitations/shares/rank'

// 获取指定邀请函分享者总人数和浏览或转发数量
export const couInvitationsSharesTotal = '/api/invitations/shares/total'

// 通过邀请函ID查询红包领取数据
export const couRedPacketUsers = '/api/invitations/redPacket/users'

// 通过邀请函ID查询用户红包领取情况
export const couRedPacketCurrentUsers = '/api/invitations/redPacket/currentUsers'

// 模糊搜索邀请函
export const couSearch = '/api/invitations/search'


//=========================邀请函统计END=======================


//=========================微信 wx ================================
// 获取微信配置
export const wxBaseData = '/api/wx/jssdk'
// 微信授权获取code值
export const wxCode = 'https://open.weixin.qq.com/connect/oauth2/authorize'

// 获取微信jssdk配置
export const wxJssdk = '/api/wx/jssdk'
//=========================微信END================================


//=========================文件上传 fil ============================
//上传邀请函封面图片
export const filSurface = '/api' + '/invitations/surface'
//上传邀请函内容图片
export const filContentImg = '/api' + '/invitations/contentImg'

//转换跨域图片数据
export const imageData = '/api' + '/invitations/change/image'
//=========================文件上传END============================


//=========================邀请函 inv ==============================
export const invInvitationsDetail = '/api' + '/invitations/detail'
export const invInvitationsRelease = '/api' + '/invitations/release'


export const invMyList = '/api/invitations/personal'
export const invMyListReleased = '/api/invitations/released'

//通过邀请函ID获取红包基本信息
export const invRedPackData = '/api/invitations/redPacket/info'

//获取分享邀请函列表
export const invShareList = '/api/invitations/shares'

// 获取邀请函分享链接
export const invShareLink = '/api/invitations/shares'

//获取收藏的邀请函列表
export const invCollectionList = '/api/invitations/collectionList'

//删除我的邀请函
export const invDeleteMyListItem = '/api/invitations'
//删除收藏列表(取消收藏)
export const invCancelCollection = '/api/invitations/collections'

//查询邀请函评论列表 c
export const invCommentList = '/api/invitations/comments'

//新增邀请函评论 c
export const invAddNewComment = '/api/invitations/comments'

//通过评论ID查询评论信息
export const invCommentDataById = '/api/invitations/comments/'

//评论点赞
export const invCommentLike = '/api/invitations/comments/thumbs'

export const invSetting = '/api/invitations/set'
export const invRepact = '/api/invitations/redPacket'
export const invUpdataRepact = '/api/invitations/redPacket'

export const invCreate = '/api' + '/invitations'
export const invUpdate = '/api' + '/invitations'


export const invBasic = '/api/invitations/basic/'
export const invInfo = '/api/invitations/redPacket/info'
export const invdetail = '/api/invitations/redPacket/detail'


//通过邀请函ID查询红包信息  c
export const invInviRedPacketById = '/api/invitations/redPacket/info'

//通过邀请函ID查询红包领取信息 c
export const invRedPacketListByInviID = '/api/invitations/redPacket/'

//通过邀请函ID查询当前用户是否领取红包   c
export const invCheckStatus = '/api/invitations/redPacket/currentUsers'

//通过邀请函ID和shareID录入领取邀请函的红包的情况   c
export const invChangeReciveStatus = '/api/invitations/redPacket/receive'


//=========================邀请函END==============================


//=========================邀请函红包 invR ==========================
//=========================邀请函红包END==========================


//=========================评论 comm ===============================
//=========================评论END===============================


//=========================收藏 col ===============================
//=========================收藏END===============================


//=========================分享 sh ===============================
// 获取指定邀请函ID和当前用户ID的排名
export const shareCurrentUserRank = '/api/invitations/share/currentUser/rank'
export const shareMessage = '/api/invitations/share/'
export const shareThumbnail = '/api/invitations/thumbnail'

export const shareSave = "/api/invitations/saveShare"
//=========================分享END===============================


//=========================用户 us ===============================
export const usAuthentical = '/api/user/authentication'
export const usAuthenticalForm = '/api/user/authentication'
export const usCashDetail = '/api/user/cashDetail'
export const usCashList = '/api/user/cashList'
// 查询用户信息
export const usData = '/api' + '/user'

//上传名片
export const usNameCard = '/api/user/businessCard'

//=========================用户END===============================


//=========================创建者红包 exhR ==========================
// 通过主办用户账号ID获取主办给创建者排名的红包数据
export const exhrExhibitorRedPacket = '/api' + '/exhibitor/redPacket'

//通过红包ID获取主办给创建者排名的红包数据
export const exhrExhibitorRedPacketbyID = '/api/exhibitor/redPacket'

//通过主办查红包ID
export const exhrExhibitorRedPacketId = '/api/exhibitor/redPacket'

//通过红包id查红包信息
export const exhrExhibitorRedPacketDetail = '/api/exhibitor/redPacket/detail'

// 通过创建者红包ID查询红包领取的用户信息列表(创建者红包详情列表)
export const exhrRedPacketReceiveUsers = '/api/exhibitor/redPacket/receiveUsers'

// 获取用户领取创建者排名奖励红包情况
export const exhrRedPacketCurrentReceive = '/api/exhibitor/redPacket/currentReceive'

//获取创建者红包用户领取信息列表c
export const exhrReceiveUsersList = '/api/exhibitor/redPacket/receiveUsers'

//通过红包ID查询用户是否领取红包的状态
export const exhrReceiveCreaterRedBag = '/api/exhibitor/redPacket/receiveStatus'

//未领取红包点击领取修改状态
export const exhrChangeStaus = ''

//通过红包ID获取主办的信息
export const exhrCreaterMsg = '/api/exhibitor/redPacket/detail'

//录入领取红包的状态
export const exhrChangeReciveStatus = '/api/exhibitor/redPacket/record'

//=========================创建者红包END==========================


//=========================分享邀请函链接 =======================
//=========================分享邀请函链接END=======================


//=========================public =======================

export const publicLogin = '/public/login'

//=========================public end=======================
