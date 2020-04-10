import request from '@/utils/request'
import { getMd5 } from '@/utils/md5'

// 兴趣
export function getInterestLabel(data) {
  return request({
    url: '/api/v1/interest/label',
    method: 'post',
    data: getMd5(data)
  })
}

// 首页发现
export function getFind(data) {
  return request({
    url: '/api/v1/index/find',
    method: 'post',
    data: getMd5(data)
  })
}

// 个人主页
export function getUser(data) {
  return request({
    url: '/api/v1/user/index',
    method: 'post',
    data: getMd5(data)
  })
}

// 用户个人兴趣
export function getUserLabel(data) {
  return request({
    url: '/api/v1/user/interest/label',
    method: 'post',
    data: getMd5(data)
  })
}

// 热门话题
export function getHotTopic(data) {
  return request({
    url: '/api/v1/hot/topic',
    method: 'post',
    data: getMd5(data)
  })
}

// 个人主页 商品
export function getUserGoods(data) {
  return request({
    url: '/api/v1/user/index/goods',
    method: 'post',
    data: getMd5(data)
  })
}

// 个人主页-动态
export function getUserDynamic(data) {
  return request({
    url: '/api/v1/user/index/dynamic',
    method: 'post',
    data: getMd5(data)
  })
}

// 个人主页-收藏
export function getCollectList(data) {
  return request({
    url: '/api/v1/user/index/collect',
    method: 'post',
    data: getMd5(data)
  })
}

// 用户操作----关注
export function getFollowAdd(data) {
  return request({
    url: '/api/v1/user/follow/add',
    method: 'post',
    data: getMd5(data)
  })
}

// 用户操作----取消关注
export function getFollowCancel(data) {
  return request({
    url: '/api/v1/user/follow/cancel',
    method: 'post',
    data: getMd5(data)
  })
}

// 笔记详情
export function getDynamicDetail(data) {
  return request({
    url: '/api/v1/dynamic/detail',
    method: 'post',
    data: getMd5(data)
  })
}

//商品详情
export function getGoodsDetail(data) {
  return request({
    url: '/api/v1/goods/detail',
    method: 'post',
    data: getMd5(data)
  })
}

// 留言
export function getCommentList(data) {
  return request({
    url: '/api/v1/user/comment/list',
    method: 'post',
    data: getMd5(data)
  })
}

// 评论回复
export function getCommentReply(data) {
  return request({
    url: '/api/v1/user/comment/reply',
    method: 'post',
    data: getMd5(data)
  })
}

// 用户操作-----评论笔记
export function getUserComment(data) {
  return request({
    url: '/api/v1/user/comment',
    method: 'post',
    data: getMd5(data)
  })
}

// 代理商品
export function getAgentGoods(data) {
  return request({
    url: '/api/v1/user/agent/goods',
    method: 'post',
    data: getMd5(data)
  })
}

// 取消代理商品
export function getAgentGoodsCancel(data) {
  return request({
    url: '/api/v1/user/agent/goods/cancel',
    method: 'post',
    data: getMd5(data)
  })
}

// 关联商品
export function getRelationGoods(data) {
  return request({
    url: '/api/v1/relation/goods',
    method: 'post',
    data: getMd5(data)
  })
}

// 用户操作-----点赞
export function getLike(data) {
  return request({
    url: '/api/v1/user/like',
    method: 'post',
    data: getMd5(data)
  })
}

// 用户操作----取消点赞
export function getLikeCancel(data) {
  return request({
    url: '/api/v1/user/like/cancel',
    method: 'post',
    data: getMd5(data)
  })
}

// 收藏
export function getAddCollection(data) {
  return request({
    url: '/api/v1/collection/add',
    method: 'post',
    data: getMd5(data)
  })
}
//取消收藏
export function getAddCollectionCancel(data) {
  return request({
    url: '/api/v1/collection/cancel',
    method: 'post',
    data: getMd5(data)
  })
}

// 搜索

export function getSearch(data) {
  return request({
    url: '/api/v1/search',
    method: 'post',
    data: getMd5(data)
  })
}

// 用户黑名单添加/删除
export function getblacklistUser(data) {
  return request({
    url: '/api/v1/user/blacklist/operate',
    method: 'post',
    data: getMd5(data)
  })
}

// 屏蔽用户笔记
export function getUserOperate(data) {
  return request({
    url: '/api/v1/shield/user/operate',
    method: 'post',
    data: getMd5(data)
  })
}
