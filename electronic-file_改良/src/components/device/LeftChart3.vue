<template>
  <div class="left-chart-1">
    <div class="lc2-header">中心机房设备情况</div>
    <div class="lc1-details">设备监视总数<span>{{allDevice}}</span></div>
    <!-- <dv-capsule-chart class="lc3-chart" :config="config" /> -->
     <dv-active-ring-chart class="lc1-chart" :config="config" />
  </div>
</template>

<script>
import * as api from '@/api/api.js'
export default {
  name: 'LeftChart3',
  data () {
    return {
      config: {
        radius: '70%',
        // activeRadius: '45%',
        data: [],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 12
        },
        showOriginValue: true,
        // colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        showValue: true
      },
      category: {},
      allDevice: 0
    }
  },
  created () {
    // api.fetchDevicesList('/62_op', { category: 'WirelessLANController' }).then(res => {
    //   console.log(res)
    // }, rej => {
    //   console.log(rej)
    // })

    this.init()
    // console.log(this.$store)
  },
  mounted () {
    // this.init()
    // this.$forceUpdate()
  },
  methods: {
    init () {
      api.getCategoryList('/64_op', {}).then(res => {
        this.category = res.data
        for (var key in res.data) {
          this.fetchDevicesList(key)
        }
        this.$store.dispatch('changeData', { data: this.config.data, flag: 64 })
      })
    },
    fetchDevicesList (category) {
      api.fetchDevicesList('/64_op', { category }).then(fetRes => {
        if (fetRes.data.length > 0) {
          // console.log(fetRes.data, category)
          var temp = {}
          temp.name = this.category[category]
          temp.value = fetRes.data.length
          this.allDevice += fetRes.data.length
          temp.data = fetRes.data
          // console.log(fetRes.data)
          this.config.data.push(temp)
          this.config = { ...this.config }
          // this.$forceUpdate()
          // this.set(this.config.data, 0, temp)
        }
      }, rej => {
        console.log(rej)
      })
    }
  }
}
</script>

<style lang="less">
.left-chart-3 {
  width: 100%;
  height: 33%;
  display: flex;
  flex-direction: column;

  .lc3-header {
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-indent: 20px;
    margin-top: 10px;
  }

  .lc3-details {
    height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc3-chart {
    flex: 1;
  }
}
</style>
