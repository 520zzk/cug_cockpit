<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div>网络设备总数</div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>

    <div class="cc-details">
      <div>设备总数</div>
      <div v-for="item in allDevice" class="card" >{{ item }}</div>
    </div>

    <div class="cc-main-container" id="echarts">
      <!-- <div class="ccmc-left">
        <div class="station-info">
          收费站<span>1315</span>
        </div>
        <div class="station-info">
          监控中心<span>415</span>
        </div>
      </div>

      <dv-active-ring-chart class="ccmc-middle" :config="config" />

      <div class="ccmc-right">
        <div class="station-info">
          <span>90</span>道路外场
        </div>
        <div class="station-info">
          <span>317</span>其他
        </div>
      </div>

      <LabelTag :config="labelConfig" /> -->

    </div>
  </div>
</template>

<script>
// import LabelTag from './LabelTag'
import * as echarts from 'echarts'
export default {
  name: 'CenterCmp',
  // components: {
  //   LabelTag
  // },
  data () {
    return {
      config: {
        data: [
          {
            name: '收费站',
            value: 1315
          },
          {
            name: '监控中心',
            value: 415
          },
          {
            name: '道路外场',
            value: 90
          },
          {
            name: '其他',
            value: 317
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        lineWidth: 30,
        radius: '55%',
        activeRadius: '60%'
      },

      labelConfig: {
        data: ['收费站', '监控中心', '道路外场', '其他']
      },
      allNum: 0,
      allDeviceData: {},
      option: {
        title: {
          text: '设备具体分布',
          textStyle: {
            color: '#fff'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        textStyle: {
          textBorderColor: 'red'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'bottom',
        // },
        series: [
          {
            type: 'pie',
            radius: '50%',
            label: {
              position: 'outside',
              show: true,
              formatter: '{b}: {d}%',
              color: '#fff'

            },
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(255, 255, 255, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    allDevice () {
      return String(this.allNum).split('')
    }
  },
  watch: {
    '$store.state.data62' (val) {
      // console.log('62')
      this.handleData(val)

    },
    '$store.state.data63' (val) {
      // console.log('63')
      this.handleData(val)
    },
    '$store.state.data64' (val) {
      // console.log('64')
      this.handleData(val)
    }
  },
  methods: {
    handleData (obj) {
      // console.log(obj, 'chuanru')
      obj.forEach(element => {
        if (element.name in this.allDeviceData) {
          this.allDeviceData[element.name].push(...element.data)
        } else {
          this.allDeviceData[element.name] = [...element.data]
        }
        this.allNum += element.value
      })  
      // console.log(this.allDeviceData, this.allNum, 'chulihou')
      let temp = []
      // var flag = 0
      // var color: ['#5470c6', '#91cc75', '#fac858', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
      for (var key in this.allDeviceData) {
        temp.push({
          value: this.allDeviceData[key].length,
          name: key
        })
      }
      this.option.series[0].data = temp
      this.myChart.setOption(this.option)

      // console.log(Object.entries(this.allDeviceData), 'dd')
    }
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('echarts'))
    this.myChart = myChart
  }
}
</script>

<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;

  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
  }

  .cc-details {
    height: 120px;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;

    .card {
      background-color: rgba(4,49,128,.6);
      color: #08e5ff;
      height: 70px;
      width: 70px;
      font-size: 45px;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      margin: 10px;
    }
  }

  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;

    .ccmc-middle {
      width: 50%;
      height: 90%;

      .active-ring-name {
        font-size: 20px !important;
      }
    }

    .ccmc-left, .ccmc-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;

      span {
        font-size: 40px;
        font-weight: bold;
      }

      .station-info {
        height: 80px;
        display: flex;
        align-items: center;
      }
    }

    .ccmc-left {
      align-items: flex-end;

      span {
        margin-left: 20px;
      }
    }

    .ccmc-right {
      align-items: flex-start;

      span {
        margin-right: 20px;
      }
    }
  }

  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
