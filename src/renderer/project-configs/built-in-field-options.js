/**
 * Created by Deboy on 2017/5/12.
 * 默认的字段下来选项
 */
export const DB_FIELD_TYPES = [
  {name: '不设置', value: ''},
  {name: 'int', value: 'int'},
  {name: 'decimal', value: 'decimal'},
  {name: 'double', value: 'double'},
  {name: 'date', value: 'date'},
  {name: 'datetime', value: 'datetime'},
  {name: 'varchar', value: 'varchar'},
  {name: 'text', value: 'text'}
]


export const FORM_VALID_TYPES = [
  {name: '无校验', value: ''},
  {name: 'Phone', value: '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$'},
  {name: 'Email', value: '^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$'},
  {name: '数字', value: '^(-?\d+)(\.\d+)?$'},
  {name: '整数', value: '^-?\d+$'},
  {name: '金钱', value: '^\d+(\.\d+)?$'},
  {name: '百分比', value: '^\\d+\\.?\\d*\\%?$'},
  {name: '密码', value: '[a-zA-Z]\w{5,17}$'},
  {name: '强密码', value: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$'},
  {name: '身份证号', value: '^\d{15}|\d{18}$'},
  {name: 'IP地址', value: '^\d{15}|\d{18}$'},
  {name: '中国邮政编码', value: '[1-9]\d{5}(?!\d)'}
]
export const VUE_DATA_TYPES = [
  {name: '字符串', value: 'string'},
  {name: '数字(单选)', value: 'number'},
  {name: '数组(多选)', value: 'array'}
]
