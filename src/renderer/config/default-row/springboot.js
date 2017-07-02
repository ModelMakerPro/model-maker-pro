/**
 * Created by Deboy on 2017/5/12.
 */
export default {
  title: null,
  field: null,
  sort: false,
  isShow: true,
  edit: true,
  required: false,
  xtype: 'text',
  relTable: null,
  // 关联表列表地址
  selectUrl: null,
  displayField: null,
  customFilter: null,
  db: {
    isDbField: {
      type: 'boolean',
      name: '数据库字段',
      value: true
    },
    dbType: {
      type: 'select',
      name: '字段类型',
      value: 'varchar',
      optionKey: 'DB_FIELD_TYPES'
    },
    isPrimaryKey: {
      type: 'boolean',
      name: '是否主键',
      value: false
    },
    generatedValue: {
      type: 'boolean',
      name: '是否自增',
      value: false
    },
    allowEmpty: {
      type: 'boolean',
      name: '允许为空',
      value: true
    },
    defaultVal: {
      type: 'text',
      name: '默认值',
      value: null
    },
    maxlength: {
      type: 'text',
      name: '最大长度',
      value: null
    }
  },
  springBoot: {
    transient: {
      type: 'boolean',
      name: '非数据库字段',
      value: false
    },
    type: {
      type: 'select',
      name: '字段类型',
      value: 'String',
      optionKey: 'JAVA_FIELD_TYPES'
    },
    updateble: {
      type: 'boolean',
      name: '是否更新数据库',
      value: true
    },
    insertable: {
      type: 'boolean',
      name: '是否插入数据库',
      value: true
    },
    relevance: {
      type: 'select',
      name: '关联模式',
      value: '',
      optionKey: 'JAVA_ASSOCIATION_PATTERNS'
    },
    relevanceObject: {
      type: 'text',
      name: '关联对象',
      value: '',
    },
    verify1: {
      type: 'select',
      name: '校验',
      value: '',
      optionKey: 'FORM_VALID_TYPES'
    },
    maxlength: {
      type: 'number',
      name: '最大长度',
      value: '255'
    },
    minlength: {
      type: 'number',
      name: '最小长度',
      value: ''
    },
    format: {
      type: 'text',
      name: '格式化',
      value: ''
    }
  },
  vue: {
    // 框架校验值
    validType: {
      type: 'select',
      name: '表单校验格式',
      value: 'string',
      optionKey: 'VUE_DATA_TYPES'
    },
    // 是否是数组 决定是否在读取/提交的时候做数组/字符串的转换
    isArray: {
      type: 'boolean',
      name: '数组/字符串转换',
      value: false
    },
    // 是否是数组 决定是否在读取/提交的时候做数组/字符串的转换
    multiple: {
      type: 'boolean',
      name: '是否是多选',
      value: false
    }
  }
}