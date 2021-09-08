<template>
  <div class="left-chart-1">
   <div class="bc-chart-item">
      <!-- <div class="bcci-header">联通出口流量</div> -->
      <div id="option_6" class="bottom-charts"></div>
       <dv-decoration-2 style="height:10px;" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import * as api from '@/api/api.js'
export default {
  name: 'LeftChart1',
  data () {
    return {
      option: {
        title: {
          text: '联通互联流量',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          },
          formatter: (data) => {
            var reg = RegExp(/[GMK]+$/)
            for (var i = 0; i < data.length; i++) {
              if (this.suffix == 'M' && !reg.test(data[i].value[2])) {
                data[i].value[2] = (data[i].value[1] * 1024).toFixed(3) + 'K'
              }
              if (this.suffix == 'G' && !reg.test(data[i].value[2])) {
                data[i].value[2] = (data[i].value[1] * 1024 * 1024).toFixed(3) + 'K'
              }
            }
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
          // left: 45,
          bottom: '30',
          top: '30'
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
              color: '#469f4b',
              borderWidth: 0
            },
            areaStyle: {
              color: '#469f4b'
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
    }
  },
  created () {

  },
  mounted () {
    this.myChart_1 = echarts.init(document.getElementById('option_6'))
    this.init()
  },
  methods: {
    init () {
      // IF-10.92.0.4.30000000001-30000019424 ae1-Backup-LianTong 10.92.0.4 联通互联流量
      this.handleData('IF-10.92.0.4.30000000001-30000019424', this.option, this.myChart_1)
    },
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
          this.suffix = resData.suffix
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
.left-chart-1 {
  width: 100%;
  height: 25%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

.bc-chart-item {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
 .bottom-charts {
  width: 100%;
  height: calc(100% - 20px);
   padding-top: 20px;
  position: relative;
  .bcci-header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }
 }
}
</style>
