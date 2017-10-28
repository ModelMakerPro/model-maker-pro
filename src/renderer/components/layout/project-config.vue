<template>
    <div>
        <Modal v-model="showModal" title="项目属性配置" @on-ok="saveConfig" @on-cancel="()=>{showModal = false}">
            <Form :model="project" label-position="right" :label-width="60">
                <Form-item label="项目名">
                    <Input v-model="project.name" placeholder="请输入表名"></Input>
                </Form-item>
            </Form>
            <p>项目属性</p>
            <template v-for="(prop, index) in project.props">
                <Row type="flex" :gutter="8" style="margin-top: 10px;" justify="end" class="code-row-bg">
                    <i-col :span="2" style="line-height: 30px; text-align: center">
                    属性 :
                    </i-col>
                    <i-col :span="8">
                    <Input v-model="prop.key" :disabled="!prop.editable" placeholder="key"></Input>
                    </i-col>
                    <i-col :span="2" style="line-height: 30px; text-align: center">
                    值:
                    </i-col>
                    <i-col :span="8">
                    <Input v-model="prop.value" :disabled="!prop.editable" placeholder="value"></Input>
                    </i-col>
                    <i-col :span="4" style="text-align: right">
                    <!--扩展字段才能删除-->
                    <Button type="error" @click="deleteProp(index)" v-show="prop.extend">删除</Button>
                    </i-col>
                </Row>
            </template>
            <div style="text-align: right">
                <Button style="text-align: right;margin: 20px 0 10px 10px;" type="primary" @click="addRow">新增</Button>
            </div>
        </Modal>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
</style>
<script type="text/ecmascript-6">
  import * as types from '../../store/mutation-types'
  export default{
    props: ['value'],
    data () {
      return {
        showModal: this.value,
        project: {}
      }
    },
    watch: {
      showModal (val) {
        this.project = this.clone(this.$store.getters.onEditProject)
        this.$emit('input', val)
      },
      value (val) {
        this.showModal = val
      }
    },
    computed: {
      vuexProject () {
        return this.$store.getters.onEditProject
      }
    },
    methods: {
      deleteProp (index) {
        this.project.props.splice(index, 1)
      },
      addRow () {
        this.project.props.push({key: '', value: '', editable: true, extend: true})
      },
      saveConfig () {
        if (this.project.name !== this.$store.getters.onEditProject.name) {
          this.$project.reNameProject(this.$store.getters.onEditProject.name, this.project.name, () => {
            this.$store.commit(types.UPDATE_PROJECT, Object.assign({}, this.$store.getters.onEditProject, this.clone(this.project)))
            this.$project.syncProject(false)
          })
        } else {
          this.$store.commit(types.UPDATE_PROJECT, Object.assign({}, this.$store.getters.onEditProject, this.clone(this.project)))
          this.showModal = false
        }
      }
    }
  }
</script>
