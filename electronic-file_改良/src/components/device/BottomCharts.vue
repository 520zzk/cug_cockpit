<template>
  <div class="bottom-charts">
    <div class="scroll-board">
      <div class="bottom-title">告警信息列表</div>
      <dv-scroll-board :config="config" />
    </div>
    <!-- <div class="bc-chart-item">
      <div class="bcci-header">联通出口流量</div>
      <div id="option_1" class="bottom-charts"></div>
    </div>
    <dv-decoration-2 class="decoration-1" :reverse="true" style="width:5px;" />

    <div class="bc-chart-item">
      <div class="bcci-header">电信出口流量</div>
      <div id="option_2" class="bottom-charts"></div>

    </div>

    <dv-decoration-2 class="decoration-2" :reverse="true" style="width:5px;" />

    <div class="bc-chart-item">
      <div class="bcci-header">教育网IPv4出口流量</div>
      <div id="option_3" class="bottom-charts"></div>
    </div>

    <dv-decoration-2 class="decoration-3" :reverse="true" style="width:5px;" />
    <div class="bc-chart-item">
      <div class="bcci-header">广佳出口流量</div>
      <div id="option_4" class="bottom-charts"></div>
    </div> -->

  </div>
</template>

<script>
// import * as echarts from 'echarts'
import * as api from '@/api/api.js'
let option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%']
    },
    formatter: (data) => {
      var str = `<div class="tooltip">
                        <div class="tooltip-title note-circle-blue"> ${data[0].axisValueLabel} </div>
                        <div class="tooltip-content">
                          <div>${data[0].marker}<span class="tooltip-title-left">${data[0].seriesName}: </span> <sapn class="tooltip-title-right" style="color:#666;font-weight:900"> ${data[0].value[2]} </sapn>
                          </div>
                          <div>${data[1].marker}<span class="tooltip-title-left">${data[1].seriesName}: </span> <sapn class="tooltip-title-right" style="color:#666;font-weight:900"> ${data[1].value[2]} </sapn>
                          </div>
                        </div>
                      </div>`
      return str
    }
  },
  grid: {
    top: 20
  },
  legend: {
    right: '0',
    textStyle: {
      color: '#fff' // 图例文字颜色
    }
  },
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },

  series: [
    {
      name: '模拟数据',
      type: 'line',
      smooth: true,
      symbol: 'none',
      itemStyle: {
        color: 'rgb(255, 70, 131)',
        borderWidth: 0
      },
      areaStyle: {
        color: 'rgb(255, 70, 131)'
      },
      data: []
    },
    {
      name: '模拟数据2',
      type: 'line',
      smooth: true,
      symbol: 'none',
      itemStyle: {
        color: 'rgb(25, 70, 111)',
        borderWidth: 0
      },
      areaStyle: {
        color: 'rgb(25, 70, 111)'
      },
      data: []
    }
  ]
}
export default {
  name: 'BottomCharts',
  data () {
    return {
      // option1: { ...option },
      // option2: { ...option },
      // option3: { ...option },
      // option4: { ...option },
      config: {
        header: ['探针', '消息', '来源', '分类', '重要程度', '告警时间', '时间间隔'],
        data: [],
        align: ['center'],
        carousel: 'page',
        waitTime: 3000,
        headerBGC: 'rgba(17,35,93,1)',
        oddRowBGC: 'rgba(11,96,156,0.8)',
        evenRowBGC: 'rgba(30,122,169,0.8)'
      }
    }
  },
  created () {
  },
  mounted () {
    // this.myChart_1 = echarts.init(document.getElementById('option_1'))
    // this.myChart_2 = echarts.init(document.getElementById('option_2'))
    // this.myChart_3 = echarts.init(document.getElementById('option_3'))
    // this.myChart_4 = echarts.init(document.getElementById('option_4'))
    this.init()
    // this.myChart_1.setOption(this.option1)
  },
  methods: {
    init () {
      // var interfaces = ['IF-10.80.16.120.30000000001-30000025622', 'IF-10.80.16.120.30000000001-30000025623', 'IF-10.80.16.120.30000000001-30000025624', 'IF-10.80.16.120.30000000001-30000025626']
      // this.handleData(interfaces[0], this.option1, this.myChart_1)
      // this.handleData(interfaces[1], this.option2, this.myChart_2)
      // this.handleData(interfaces[2], this.option3, this.myChart_3)
      // this.handleData(interfaces[3], this.option4, this.myChart_4)
      const parameters = {
        isFluidic: true,
        isWebclient: true,
        isNotes: true,
        rows: 30,
        page: 1,
        sortByColumn: 'modTime',
        sortByType: 'desc' }
      const r2 = api.getListAlarms('/62_op', { ...parameters })
      const r3 = api.getListAlarms('/63_op', { ...parameters })
      const r4 = api.getListAlarms('/64_op', { ...parameters })
      Promise.all([r2, r3, r4]).then(res => {
        // console.log(res, 'alarms')
        var data = []
        res.forEach(value => {
          if (value.data.hasOwnProperty('rows')) {
            var origin = ''
            if (value.config.aim === '/62_op') {
              origin = '南望山探针'
            }
            if (value.config.aim === '/63_op') {
              origin = '未来城探针'
            }
            if (value.config.aim === '/64_op') {
              origin = '数据中心探针'
            }
            value.data.rows.forEach(item => {
              data.push([origin, item.message, item.displayName, item.category, item.statusStr, item.modTime, item.prettyTime])
            })
          }
        })
        this.config.data = data
        this.config = { ...this.config }
      })
    },
    /**
     * interfaceName 接口名称
     * config echarts配置对象
     * target echarts操作对象
     */
    handleData (interfaceName, option, target) {
      let optionTemp = { ...option }
      api.getInterfaceGraphs('/64_op', {
        interfaceName,
        isFluidic: true,
        graphName: 'traffic',
        period: 'twfourhours'
      }).then(res => {
        var resData = res.data
        for (var i = 0; i < resData.graphData.length; i++) {
          var data2 = []
          data2 = resData.graphData[i].data
          optionTemp.series[i].name = resData.graphData[i].seriesname
          optionTemp.series[i].data = data2
        }
        target.setOption(optionTemp)
      })
    }
  }
}
</script>

<style lang="less">
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .bc-chart-item {
    width: 25%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .bcci-header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }

  .dv-active-ring-chart {
    height: calc(~"100% - 80px");
  }

  .label-tag {
    height: 30px;
  }

  .active-ring-name {
    font-size: 18px !important;
  }

  .decoration-1, .decoration-2, .decoration-3 {
    display: absolute;
    left: 0%;
  }
  /**轮播 */
  .scroll-board{
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    .bottom-title{
      font-size: 1.2rem;
      font-weight: bold;
      padding:5px;
      width:2rem;
    }
  }
}
</style>
