<template>
    <div>
        <Modal v-model="showModel" title="选项配置" @on-ok="()=>{showModel = false}" @on-cancel="()=>{showModel = false}">
            <Row>
                <template v-for="(value, key) in filter">
                    <Col>
                        <Input :value="value" disabled>
                    </Col>
                    <Col>
                        <Input :value="key" disabled>
                    </Col>
                </template>
            </Row>
        </Modal>
    </div>
</template>
<style lang="less" scoped>
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      value: {
        type: Boolean
      }
    },
    data () {
      return {
        filter: this.value,
        showModal: false
      }
    },
    watch: {
    },
    methods: {
      open () {
        this.showModal = true
      }
    }
  }
</script>
