import request from '@/utils/request'
import { panelInit } from '@/components/canvas/utils/utils'
import { getPanelAllLinkageInfo } from '@/api/panel/linkage'
import { queryPanelJumpInfo } from '@/api/panel/linkJump'
import store from '@/store'

export function deleteSubject(id) {
  return request({
    url: '/panel/subject/delete/' + id,
    method: 'delete',
    loading: true
  })
}

export function saveOrUpdateSubject(data) {
  return request({
    url: '/panel/subject/update',
    method: 'post',
    loading: true,
    data
  })
}

export function querySubject(data) {
  return request({
    url: '/panel/subject/query',
    method: 'post',
    loading: true,
    data
  })
}

export function querySubjectWithGroup(data) {
  return request({
    url: '/panel/subject/querySubjectWithGroup',
    method: 'post',
    data
  })
}

export function defaultTree(data, loading = true, timeout = 60000) {
  return request({
    url: '/panel/group/defaultTree',
    method: 'post',
    loading: loading,
    data
  })
}

export function groupTree(data, loading = true, timeout = 60000) {
  return request({
    url: '/panel/group/tree',
    method: 'post',
    loading: loading,
    data
  })
}

export function viewData(id, panelId, data) {
  return request({
    url: '/chart/view/getData/' + id + '/' + panelId,
    method: 'post',
    hideMsg: true,
    data
  })
}
export function panelSave(data) {
  return request({
    url: 'panel/group/save',
    method: 'post',
    loading: true,
    data
  })
}

export function panelUpdate(data) {
  return request({
    url: 'panel/group/update',
    method: 'post',
    loading: true,
    data
  })
}

export function findOne(id) {
  return request({
    url: 'panel/group/findOne/' + id,
    method: 'get',
    loading: true
  })
}

export function getTable(id) {
  return request({
    url: '/panel/table/get/' + id,
    method: 'post'
  })
}

export function getPreviewData(data) {
  return request({
    url: '/panel/table/getPreviewData',
    method: 'post',
    data
  })
}

export function fieldList(id) {
  return request({
    url: '/panel/field/list/' + id,
    method: 'post'
  })
}

export function batchEdit(data) {
  return request({
    url: '/panel/field/batchEdit',
    method: 'post',
    data
  })
}

export function post(url, data) {
  return request({
    url: url,
    method: 'post',
    loading: true,
    data
  })
}

export function get(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function delGroup(groupId) {
  return request({
    url: '/panel/group/deleteCircle/' + groupId,
    loading: true,
    method: 'post'
  })
}

export function initPanelData(panelId, callback) {
  // ??????????????????
  findOne(panelId).then(response => {
    // ???????????????data???style ??????
    panelInit(JSON.parse(response.data.panelData), JSON.parse(response.data.panelStyle))
    // ?????????????????????????????????
    store.dispatch('panel/setPanelInfo', {
      id: response.data.id,
      name: response.data.name,
      privileges: response.data.privileges,
      sourcePanelName: response.data.sourcePanelName,
      status: response.data.status,
      createBy: response.data.createBy,
      createTime: response.data.createTime,
      updateBy: response.data.updateBy,
      updateTime: response.data.updateTime
    })
    // ??????????????????
    getPanelAllLinkageInfo(panelId).then(rsp => {
      store.commit('setNowPanelTrackInfo', rsp.data)
    })
    // ??????????????????
    queryPanelJumpInfo(panelId).then(rsp => {
      store.commit('setNowPanelJumpInfo', rsp.data)
    })
    callback(response)
  })
}

export function queryPanelViewTree() {
  return request({
    url: '/panel/group/queryPanelViewTree',
    method: 'post'
  })
}

export function queryPanelMultiplexingViewTree() {
  return request({
    url: '/panel/group/queryPanelMultiplexingViewTree',
    method: 'post',
    loading: false
  })
}

export function initPanelComponentsData(panelId, callback) {
  // ?????????????????????????????????
  queryPanelComponents(panelId).then(rep => {
    store.commit('initPanelComponents', rep.data)
    callback(rep)
  })
}

export function queryPanelComponents(id) {
  return request({
    url: 'panel/group/queryPanelComponents/' + id,
    method: 'get',
    loading: false
  })
}

export function initViewCache(panelId) {
  // ??????????????????????????????
  return request({
    url: 'chart/view/initViewCache/' + panelId,
    method: 'post',
    loading: false
  })
}
export function exportDetails(data) {
  // ??????????????????????????????
  return request({
    url: 'panel/group/exportDetails',
    method: 'post',
    data: data,
    loading: true,
    responseType: 'blob'
  })
}

export function updatePanelStatus(panelId, param) {
  return request({
    url: '/panel/group/updatePanelStatus/' + panelId,
    method: 'post',
    loading: false,
    data: param
  })
}

