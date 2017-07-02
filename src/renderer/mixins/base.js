/**
 * Created by Deboy on 2017/3/25.
 */
export default {
  computed: {
    fullHeight () {
      return {
        height: this.$store.state.styles.fullHeight
      }
    },
    contentWarpHeight () {
      return {
        height: this.$store.state.styles.contentWarpHeight,
        overflow: 'auto'
      }
    }
  },
  methods: {
    clone (val) {
      let result = null
      try {
        let newVal = JSON.stringify(val)
        result = JSON.parse(newVal)
      } catch (e) {
        console.error('转换错误！请注意传值是否正常')
      }
      return result
    }
  }
}
