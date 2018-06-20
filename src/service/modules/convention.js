/**
 * Created by hejiahui on 2018/4/16.
 */

import {
  get,
  post,
  put,
  upImage,
  deleter,
  patch
} from '@/services/ajax/netaxios'

// 项目
class Convent {
  /**
   * 创建项目
   * */
  createProject(opt, isShowFullLoading = false) {
    const url = '/api/project'
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }
  /*
   * 选择项目列表
   * */
  projectInfo(opt, isShowFullLoading = false) {
    const url = `/api/project/${opt.projectId}`
    const params = opt || {}
    return get(
      url, {}, isShowFullLoading
    )
  }

  /*
   * 选择项目列表
   * */
  projectList(opt, isShowFullLoading = false) {
    const url = '/api/project/slidlist'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }
  /*
   *  项目下的任务列表
   * */
  tasksOfProject(opt, isShowFullLoading = false) {
    const url = '/api/project/tasks'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }
  /*
   *  添加审批留言
   * */
  taskComments(opt, isShowFullLoading = false) {
    const url = '/api/comment'
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }
  /*
   *  审批留言列表
   * */
  getTaskComments( opt, isShowFullLoading = false) {
    const url = `/api/comment/${opt.taskId}`
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }
  /*
   *  对一级留言点赞或取消点赞
   * */
  thumbs( opt, isShowFullLoading = false) {
    const url = `/api/comment/thumbs/${opt.commentId}`
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }
  /*
   *  添加/更新任务
   * */
  createTask(opt, isShowFullLoading = false) {
    const url = '/api/task'
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }

  /*
   * 添加项目节点
   * */
  createSection(opt, isShowFullLoading = false) {
    const url = '/api/project/point/insert'
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }

  /*
   * 删除项目节点
   * */
  sectionDelete(opt, isShowFullLoading = false) {
    // /api/project/point/:pointId
    const url = '/api/project/point/remove'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }
  /*
   * 项目节点列表
   * */
  sectionList(opt, isShowFullLoading = false) {
    // /api/project/point/:pointId
    const url = '/api/project/point/list'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }

  /*
   * 执行人列表
   * */
  operatorList(opt, isShowFullLoading = false) {
    // /api/project/point/:pointId
    const url = '/api/task/list'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }

  /*
   * 获取任务详情 用于 任务详情页
   * */
  taskDetail(opt, isShowFullLoading = false ) {
    const url = `/api/task/detail/${opt.taskId}?projectId=${opt.projectId}`
    //const url = '/api/task/detail/9872488840072298?projectId=986811721771147'
    return get(
      url, {}, isShowFullLoading
    )
  }

  /*
   * 获取任务基本信息 用于进度更新页
   * */
  getTaskBaseInfo(opt, isShowFullLoading = false) {
    const url = '/api/task/basic'
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }
  /*
   * 获取任务基本信息
   * */
  getTaskBasicInfo(taskId,opt, isShowFullLoading = false) {
    const url = `/api/task/basic/${taskId}`
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }

  /*
   * 置底任务
   * */
  sitDownTask (taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/user/down/${taskId}`
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }
  /*
   * 置顶任务
   * */
  standUpTask (taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/user/up/${taskId}`
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }
  /*
   * 置顶任务
   * */
  recoverTask (taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/user/normal/${taskId}`
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }

  /*
   * 收藏任务
   * */
  starTask(taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/user/star/${taskId}`
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }

  /*
   * 获取群组
   * */
  getGroupAvatar(projectId, opt, isShowFullLoading = false) {
    const url = `/api/project/group/users/${projectId}`
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }
   /*
   * 跳转到项目群
   * */
  goToGroup(projectId, opt, isShowFullLoading = false) {
    const url = `/api/task/group/${projectId}`
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }

  /*
   * 修改任务
   * */
  editTask(opt, isShowFullLoading = false) {
    const url = '/api/task'
    const params = opt || {}
    return patch(
      url, params, isShowFullLoading
    )
  }

  /*
   * 关闭任务
   * */
  closeTask(taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/close/${taskId}`
    const params = opt || {}
    return patch(
      url, params, isShowFullLoading
    )
  }

  /*
   * 验收通过
   * */

  passTask(taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/pass/${taskId}`
    const params = opt || {}
    return patch(
      url, params, isShowFullLoading
    )
  }

  /*
   * 拒绝任务
   * */
  rejectTask(taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/reject/${taskId}`
    const params = opt || {}
    return patch(
      url, params, isShowFullLoading
    )
  }
  /*
   * 接受任务
   * */
  recieveTask(taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/receive/${taskId}`
    const params = opt || {}
    return patch(
      url, params, isShowFullLoading
    )
  }
  /*
   * 添加任务进度
   * */
  addTaskProcess(opt, isShowFullLoading = false) {
    const url = '/api/task/schedule/add'
    const params = opt || {}
    return post(
      url, params, isShowFullLoading
    )
  }
  /*
   * 删除任务进度
   * */
  deleteTaskProcess(opt, isShowFullLoading = false) {
    const url = '/api/task/schedule/remove'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }
  /*
   * 任务进度列表
   * */
  taskProcessList(opt, isShowFullLoading = false) {
    const url = '/api/task/schedule/list'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading
    )
  }
  /*
   * 面对面分享
   * */
  sharefacetoface(opt, isShowFullLoading = false) {
    const url = '/api/wx/share/face'
    const params = opt || {}
    return post(
      url, params, isShowFullLoading = false
    )
  }
  /*
   * 检测二维码是否有效
   * */
  checkValid(opt, isShowFullLoading = false) {
    const url = '/api/wx/share/face/check'
    const params = opt || {}
    return get(
      url, params, isShowFullLoading = false
    )
  }
  /*
   * 获取执行人列表
   * */
  getExcutorList(projectId, opt, isShowFullLoading = false) {
    const url = `/api/project/members/${projectId}`
    const params = opt || {}
    return get(
      url, params, isShowFullLoading = false
    )
  }
   /*
   * 删除项目成员
   * */
  deleteExcutor(projectId, opt, isShowFullLoading = true) {
    const url = `/api/project/member/${projectId}`;
    const params = opt || {}
    return post(
      url, params, isShowFullLoading = true
    )
  }
  /*
   * 指定执行人
   * */
  cmdExcutor(taskId, opt, isShowFullLoading = false) {
    const url = `/api/task/assign/${taskId}`
    const params = opt || {}
    return patch(
      url, params, isShowFullLoading = false
    )
  }
  /*
   * 更新进度
   * */
  updateTask(taskId, opt, isShowFullLoading = true) {
    const url = `/api/task/basic/${taskId}`
    const params = opt || {}
    return patch(
      url, params, isShowFullLoading = false
    )
  }
   /*
   * 创建时更新进度
   * */
  settingUpdateTask(taskId, opt, isShowFullLoading = true) {
    const url = `/api/task/${taskId}`
    const params = opt || {}
    return patch(
      url, params, isShowFullLoading = false
    )
  }
}

export default new Convent()
