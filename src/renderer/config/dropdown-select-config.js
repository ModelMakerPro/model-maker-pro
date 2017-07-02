/**
 * Created by Deboy on 2017/5/12.
 */
export default {
  // 数据库属性设置 只加了常用的 需要可以在这里添加 不建议加太多无用的或者不常见的
  'DB_FIELD_TYPES': [
    {name: '不设置', value: ''},
    {name: 'int', value: 'int'},
    {name: 'decimal', value: 'decimal'},
    {name: 'double', value: 'double'},
    {name: 'date', value: 'date'},
    {name: 'datetime', value: 'datetime'},
    {name: 'varchar', value: 'varchar'},
    {name: 'text', value: 'text'}
  ],
  // java字段类型
  'JAVA_FIELD_TYPES': [
    {name: 'Integer', value: 'Integer'},
    {name: 'Double', value: 'Double'},
    {name: 'Long', value: 'Long'},
    {name: 'String', value: 'String'},
    {name: 'Date', value: 'Date'},
    {name: 'Set', value: 'Set'},
    {name: 'List', value: 'List'}
  ],
  // JAVA 关联模式
  'JAVA_ASSOCIATION_PATTERNS': [
    {name: '无关联', value: ''},
    {name: '一对一', value: 'oneToOne'},
    {name: '一对多', value: 'oneToMany'},
    {name: '多对一', value: 'manyToOne'},
    {name: '多对多', value: 'manyToMany'}
  ],
  // laravel 关联模式
  'LARAVEL_ASSOCIATION_PATTERNS': [
    {name: '无关联', value: ''},
    {name: '一对一', value: 'hasOne'},
    {name: '一对多', value: 'hasMany'},
    {name: '多对一', value: 'belongsTo'},
    {name: '多对多', value: 'belongsToMany'}
  ],
  // 表单校验
  'FORM_VALID_TYPES': [
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
  ],
  // Vue表单下拉校验
  'VUE_DATA_TYPES': [
    {name: '字符串', value: 'string'},
    {name: '数字(单选)', value: 'number'},
    {name: '数组(多选)', value: 'array'}
  ]
}