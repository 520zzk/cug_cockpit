<template>
  <div class="left-chart-1">
    <div class="lc2-header">南望山设备情况</div>
    <div class="lc1-details">设备监视总数<span>{{allDevice}}</span></div>
    <dv-active-ring-chart class="lc1-chart" :config="config" />
    <!-- <dv-capsule-chart :config="config" class="lc1-chart" /> -->
    <!-- <dv-charts :option="option" /> -->
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
import * as api from '@/api/api.js'

export default {
  name: 'LeftChart1',
  data () {
    return {
      config: {
        radius: '70%',
        // activeRadius: '45%',
        data: [
          // {
          //   name: '收费系统',
          //   value: 167
          // },
          // {
          //   name: '通信系统',
          //   value: 67
          // },
          // {
          //   name: '监控系统',
          //   value: 123
          // },
          // {
          //   name: '供配电系统',
          //   value: 55
          // },
          // {
          //   name: '其他',
          //   value: 98
          // }
        ],
        digitalFlopStyle: {
          fontSize: 20
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
  },
  mounted () {
    // this.init()
    // this.$forceUpdate()
  },
  methods: {
    init () {
      api.getCategoryList('/62_op', {}).then(res => {
        this.category = res.data
        for (var key in res.data) {
          this.fetchDevicesList(key)
        }
        // this.$store.commit('changeData', { data: this.config.data, flag: 62 })
        this.$store.dispatch('changeData', { data: this.config.data, flag: 62 })
      })
    },
    fetchDevicesList (category) {
      api.fetchDevicesList('/62_op', { category }).then(fetRes => {
        if (fetRes.data.length > 0) {
          // console.log(fetRes.data, category)
          var temp = {}
          temp.name = this.category[category]
          temp.value = fetRes.data.length
          this.allDevice += fetRes.data.length
          temp.data = fetRes.data
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
.left-chart-1 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin-bottom: 20px;
  }

  .lc1-details {
    height: 50px;
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

  .lc1-chart {
    flex: 1;
  }
}
</style>
