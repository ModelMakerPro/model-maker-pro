<template>
    <div>
        <div class="label">{{label}}</div>
        <div class="warp">
            <template v-if="type === 'number'">
                <Input v-model="model" number placeholder="请输入..."></Input>
            </template>
            <template v-else-if="type==='select'">
                <Select v-model="model" :label="'请选择' + label">
                    <Option v-for="(item, index) in options" :value="item.value" :key="index">{{ item.name }}</Option>
                </Select>
            </template>
            <template v-else-if="type==='boolean'">
                <i-switch v-model="model"></i-switch>
            </template>
            <template v-else>
                <Input v-model="model" placeholder="请输入..."></Input>
            </template>

        </div>
        <div class="action">
            <Icon style="text-align: right;cursor: pointer;" size="20" @click.native="$emit('on-remove')" v-if="isCustom" type="minus-round"></Icon>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .label {
        width: 100px;
        text-align: right;
        padding-right: 10px;
        display: inline-block;
        line-height: 30px;
        height: 38px;
    }

    .warp {
        width: 150px;
        display: inline-block;
    }
    .action{
        line-height: 40px;
        display: inline-block;
        float: right;
    }
</style>
<script type="text/ecmascript-6">
  export default{
    props: ['type', 'value', 'options', 'label', 'isCustom'],
    data () {
      return {
        model: this.value
      }
    },
    watch: {
      value (val) {
        this.model = val === undefined ? '' : val
      },
      model (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
