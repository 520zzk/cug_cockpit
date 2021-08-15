<template>
  <div class="left-chart-1">
    <div class="lc2-header">未来城设备情况</div>
    <div class="lc1-details">设备监视总数<span>{{allDevice}}</span></div>
    <!-- <dv-charts class="lc2-chart" :option="option" /> -->
    <dv-active-ring-chart class="lc1-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>

import * as api from '@/api/api.js'
export default {
  name: 'LeftChart2',
  data () {
    return {
      // option: {
      //   series: [
      //     {
      //       type: 'pie',
      //       data: [
      //         { name: '收费系统', value: 93 },
      //         { name: '通信系统', value: 32 },
      //         { name: '监控系统', value: 65 },
      //         { name: '供配电系统', value: 44 },
      //         { name: '其他', value: 52 }
      //       ],
      //       radius: ['45%', '65%'],
      //       insideLabel: {
      //         show: false
      //       },
      //       outsideLabel: {
      //         labelLineEndLength: 10,
      //         formatter: '{percent}%\n{name}',
      //         style: {
      //           fontSize: 14,
      //           fill: '#fff'
      //         }
      //       }
      //     }
      //   ],
      //   color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b']
      // }
      config: {
        radius: '70%',
        // activeRadius: '45%',
        data: [],
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
      api.getCategoryList('/63_op', {}).then(res => {
        this.category = res.data
        for (var key in res.data) {
          this.fetchDevicesList(key)
        }
        this.$store.dispatch('changeData', { data: this.config.data, flag: 63 })
      })
    },
    fetchDevicesList (category) {
      api.fetchDevicesList('/63_op', { category }).then(fetRes => {
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
.left-chart-2 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;

  .lc2-header {
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-indent: 20px;
    margin-top: 10px;
  }

  .lc2-details {
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

  .lc2-chart {
    height: calc(~"100% - 80px");
  }
}
</style>
