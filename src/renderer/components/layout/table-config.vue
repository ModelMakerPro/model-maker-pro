<template>
    <div>
        <Modal v-model="showModal" title="表属性配置" @on-ok="saveConfig" @on-cancel="()=>{showModal = false}">
            <Form :model="table" label-position="right" :label-width="60">
                <Form-item label="表名">
                    <Input v-model="table.name" placeholder="请输入表名"></Input>
                </Form-item>
                <Form-item label="备注">
                    <Input v-model="table.comment" placeholder="请输入表备注"></Input>
                </Form-item>
            </Form>
            <p>表属性</p>
            <template v-for="(prop, index) in table.props">
                <Row type="flex" :gutter="8" style="margin-top: 10px;" justify="end" class="code-row-bg">
                    <Col :span="2" style="line-height: 30px; text-align: center">
                    属性 :
                    </Col>
                    <Col :span="8">
                    <Input v-model="prop.key" placeholder="key"></Input>
                    </Col>
                    <Col :span="2" style="line-height: 30px; text-align: center">
                    值:
                    </Col>
                    <Col :span="8">
                    <Input v-model="prop.value" placeholder="value"></Input>
                    </Col>
                    <Col :span="4" style="text-align: right">
                        <Button type="error" @click="props.splice(index, 1)">删除</Button>
                    </Col>
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
  import * as types from '../../vuex/mutation-types'
  export default{
    props: ['value'],
    data () {
      return {
        showModal: this.value,
        table: {}
      }
    },
    watch: {
      showModal (val) {
        this.table = this.clone(this.$store.getters.onEditTable)
        this.$emit('input', val)
      },
      value (val) {
        this.showModal = val
      }
    },
    computed: {
      vuexTable () {
        return this.$store.getters.onEditTable
      }
    },
    methods: {
      addRow () {
        this.table.props.push({key: '', value: ''})
      },
      saveConfig () {
        this.$store.commit(types.UPDATE_PROJECT_TABLE, Object.assign({}, this.$store.getters.onEditTable, this.clone(this.table)))
        this.showModal = false
      }
    }
  }
</script>
