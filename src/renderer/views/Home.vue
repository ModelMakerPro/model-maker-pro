<template>
    <div :style="contentWarpHeight">
        本工具用于生成项目Model <br>
        使用步骤
        <Steps :current="6" direction="vertical">
            <Step icon="folder" title="新增项目" content="新建一个项目选择项目类型并给这个项目起个名字"></Step>
            <Step icon="plus-round" title="编辑默认数字段" content="每个表都有同样的字段要维护？没问题 默认字段帮你省事儿"></Step>
            <Step icon="hammer" title="新增表格" content="新建表格(Model)并对表格字段进行编辑"></Step>
            <Step icon="wrench" title="编辑附加属性" content="每个字段都可以编辑对应的 Java/Laravel属性 DB属性 Vue属性 超强定制化"></Step>
            <Step icon="checkmark" title="保存项目"
                  content="在编辑完成每一个表的属性的时候 记得保存 否则数据将会丢失哦！Ctrl+S 保存到软件中 Ctrl+Shift+S 保存到本地中"></Step>
            <Step icon="shuffle" title="导出项目" content="超强定制化模版 固定 Model 随意定制导出结构"></Step>
        </Steps>
        <h2>当前版本: <b>{{version}}</b></h2>
        <h3 class="title">更新日志</h3>
        <Timeline>
            <template v-for="update in updateLogs">
                <Timeline-item :color="update.tips.color">
                    <p class="time">{{update.version}} <span class="date-label">{{update.date}}</span></p>
                    <p class="content">
                    <div class="tips">{{update.tips.desc}}</div>
                    <ol>
                        <li v-for="(log, index) in update.logs">
                            {{index + 1}}. {{log}}
                        </li>
                    </ol>
                    </p>
                </Timeline-item>
            </template>

        </Timeline>
    </div>
</template>
<style scoped lang="less">
    .title {
        padding: 10px 0;
    }

    .tips {
        font-weight: 600;
        font-size: 14px;
        margin-top: 5px;
        color: rgba(255, 000, 000, 0.6);
    }
</style>
<script type="text/ecmascript-6">
  const {app} = require('electron').remote
  export default{
    data () {
      return {
        updateLogs: [
          {
            version: '0.2.67',
            date: '2017-5-17',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['Model预览 采用 vue-json-tree-view 插件', '修复关联属性处理不当导致的无限循环关联BUG']
          },
          {
            version: '0.2.66',
            date: '2017-5-16',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['修复项目兼容问题', '修复项目在 模版设置 <=> 导出配置 页面的时候数据不更新的BUG']
          },
          {
            version: '0.2.65',
            date: '2017-5-16',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['修复跳转错误', '新增java 关联对象字段', '修复快捷键绑定失效']
          },
          {
            version: '0.2.63',
            date: '2017-5-16',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['新增帮助函数的相应跳转', '新增软件自带函数的文档和使用预览', '修复Java属性没有经过处理的BUG', '修改导出页面的快捷键（Mac下有冲突）']
          },
          {
            version: '0.2.62',
            date: '2017-5-14',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['软件更名: Model Maker Pro', '兼容旧项目文件', '修复部分BUG 和 卡顿现象优化']
          },
          {
            version: '0.2.6',
            date: '2017-5-14',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['合并Java和PHP的生成器 新建项目会选择', '默认字段变成可配置', '新增开发者调试窗口 Ctrl+Shift+K']
          },
          {
            version: '0.2.5',
            date: '2017-5-11',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['优化导出部分 替换语法高亮引擎为hightlightjs(之前的高亮语法会导致软件变卡)', '删除许多冗余的方法(统一使用模版导出)']
          },
          {
            version: '0.2.4',
            date: '2017-5-10',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['继续优化性能 主要是表单编辑部分', '清晰上传同步逻辑', '增加同步到本地(Ctrl+Shift+S)、从本地同步到软件中(Ctrl+Alt+S快捷键)']
          },
          {
            version: '0.2.3',
            date: '2017-5-10',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['优化部分性能', '修复部分BUG', '新增导出project模式', '将文件是否大写 改成下拉选择文件命名格式']
          },
          {
            version: '0.1.9',
            date: '2017-4-24',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['新增模版助手：http://assemble.io/helpers/', '原有（还能继续使用）：https://github.com/NEYouFan/nei-toolkit/blob/master/doc/Handlebars%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0%E9%9B%86.md']
          },
          {
            version: '0.1.8',
            date: '2017-4-20',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['新增表单Ctrl+S保存 去掉自动保存', '添加自定义属性功能 并且自定义属性能够删除', '延迟三秒储存到软件内部存储中']
          },
          {
            version: '0.1.6',
            date: '2017-4-19',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['新增手动同步到本地功能', '自动保存（软件内存）中 延迟1秒 解决性能问题', '自动兼容性处理 点击同步即可', '修复一些BUG']
          },
          {
            version: '0.0.7',
            date: '2017-4-6',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['将项目列表的更改监听移到app.vue中', '文件写入方法优化、延迟五秒写入项目配置', '完成导出SQL文件的功能']
          },
          {
            version: '0.0.6',
            date: '2017-4-5',
            tips: {
              color: 'red',
              desc: '不兼容旧版项目文件 请直接用新版'
            },
            logs: ['项目属性、表格属性可配置、有默认配置(项目数据库相关配置 表格是否可批量删除配置)、可添加自定义配置']
          },
          {
            version: '0.0.5',
            date: '2017-4-5',
            tips: {
              color: 'green',
              desc: ''
            },
            logs: ['字段允许上下移动、在当前位置之下新增字段']
          }
        ]
      }
    },
    computed: {
      version () {
        return app.getVersion()
      }
    }
  }
</script>
