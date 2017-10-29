/**
 * 一些属性需要下拉选项 但是不能每次都复制一遍 可以单独抽出来 而选项中只需记录 使用的选项的key即可
 */
import { DB_FIELD_TYPES, FORM_VALID_TYPES, VUE_DATA_TYPES } from '../built-in-field-options'

export default {
  DB_FIELD_TYPES,
  FORM_VALID_TYPES,
  VUE_DATA_TYPES,
  // 自定义的下拉选项
  ASSOCIATION_PATTERNS: [
    {name: '无关联', value: ''},
    {name: '一对一', value: 'hasOne'},
    {name: '一对多', value: 'hasMany'},
    {name: '多对一', value: 'belongsTo'},
    {name: '多对多', value: 'belongsToMany'}
  ]
}