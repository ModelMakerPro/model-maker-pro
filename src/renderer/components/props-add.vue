<template>
    <div>
        <Modal v-model="show"
               :title="'添加' + name + '属性'"
               @on-ok="()=>{show = false}"
               @on-cancel="()=>{show = false}">
            <Form :model="form" :label-width="80">
                <Form-item prop="key" label="key*">
                    <Input type="text" v-model="form.key" placeholder="key">
                    </Input>
                </Form-item>
                <Form-item prop="name" label="备注*">
                    <Input type="text" v-model="form.name" placeholder="name">
                    </Input>
                </Form-item>
                <Form-item prop="value" label="value">
                    <Input type="text" v-model="form.value" placeholder="value">
                    </Input>
                </Form-item>
            </Form>
            <div slot="footer">
                <Button type="primary" :long="true" @click="save">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
</style>
<script type="text/ecmascript-6">
  const defaultFrom = {
    key: '',
    name: '',
    value: '',
    type: 'text',
    isCustom: true
  }
  export default{
    props: ['value', 'name'],
    data () {
      return {
        show: this.value,
        form: defaultFrom
      }
    },
    watch: {
      show (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.show = val
      }
    },
    methods: {
      save () {
        if (!this.form.key) {
          this.$store.dispatch('showNotice', {
            type: 'info',
            desc: '请输入key'
          })
        } else if (!this.form.name) {
          this.$store.dispatch('showNotice', {
            type: 'info',
            desc: '请输入备注'
          })
        } else {
          this.$emit('on-confirm', this.form)
          this.show = false
          this.form = defaultFrom
        }
      }
    }
  }
</script>
