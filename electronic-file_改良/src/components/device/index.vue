<template>
  <div id="data-view">
    <div class="tips" :class=" {'tips_animation': changeTimeStatus == false  }">设置时间不低于5分钟，不超过60分钟</div>
    <!-- <dv-full-screen-container> -->
    <div id="dv-full-screen-container">
      <div class="main-header">
        <!-- <div class="mh-left">技术支持:<a href="https://github.com/jiaming743/DataV">https://github.com/jiaming743/DataV</a></div> -->
        <div class="mh-left"></div>
        <div class="mh-middle">中国地质大学 网络与IT设备运行监控</div>
        <div class="mh-right">
          <dv-border-box-2
            style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;"
          >
          <span @dblclick="dbTime(false)" v-show ="changeTimeStatus"> {{countTime}}</span>
          <input  v-if="!changeTimeStatus"
            ref="timevalue"
            @keyup.enter="changeTime"
            @blur="dbTime(true)"
            v-model="refreshMinute"
            class="inputTime"
            type="number"
            step="1"
            min="5"/>
            <!-- 综合管理台 -->
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <dv-border-box-3 class="left-chart-container">

          <Left-Chart-1 :key="key.LeftChart1"/>
          <Left-Chart-2 :key="key.LeftChart2"/>
          <Left-Chart-3 :key="key.LeftChart3"/>

        </dv-border-box-3>

        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-3 class="rmctc-left-container">

              <Center-Cmp :key="key.CenterCmp"/>

            </dv-border-box-3>

            <div class="rmctc-right-container">
              <dv-border-box-13 class="border-box-content">

                <Right-Chart-1 :key="key.RightChart1"/>

              </dv-border-box-13>

              <!-- <dv-border-box-4 class="rmctc-chart-2" :reverse="true">

                <Right-Chart-2 />

              </dv-border-box-4> -->
            </div>
          </div>

          <dv-border-box-10 class="rmc-bottom-container">

            <Bottom-Charts :key="key.BottomCharts"/>

          </dv-border-box-10>
        </div>
      </dv-border-box-1>
    </div>
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
import LeftChart1 from './LeftChart1'
import LeftChart2 from './LeftChart2'
import LeftChart3 from './LeftChart3'

import CenterCmp from './CenterCmp'

import RightChart1 from './RightChart1'
// import RightChart2 from './RightChart2'

import BottomCharts from './BottomCharts'

export default {
  name: 'DataView',
  components: {
    LeftChart1,
    LeftChart2,
    LeftChart3,
    CenterCmp,
    RightChart1,
    // RightChart2,
    BottomCharts
  },
  data () {
    return {
      key: {
        LeftChart1: this.timestamp(),
        LeftChart2: this.timestamp(),
        LeftChart3: this.timestamp(),
        CenterCmp: this.timestamp(),
        RightChart1: this.timestamp(),
        BottomCharts: this.timestamp()
      },
      refreshTime: 600,
      refreshMinute: 10,
      changeTimeStatus: true
    }
  },
  computed: {
    countTime () {
      var second = this.refreshTime % 60
      if (parseInt(this.refreshTime / 60) > 0) {
        if (second != 0) {
          return parseInt(this.refreshTime / 60) + '分' + second + '秒'
        } else {
          return parseInt(this.refreshTime / 60) + '分'
        }
      } else {
        return this.refreshTime + '秒'
      }
    }
  },
  created () {
    this.countdown()
  },
  methods: { 
    changeTime (e) {
      var { target } = e
      if (target.value != "") {
        var changTimeNum = parseInt(target.value)
        if (changTimeNum > 60) {
          alert('请设置在一小时以内')
          return
        }
        var r = confirm(`确认设置刷新时间为${parseInt(target.value)}分钟`)
        if (r) {
          clearInterval(this.setInterTime)
          this.refreshMinute = changTimeNum
          this.refreshTime = changTimeNum * 60
          this.countdown()
        } else {
          console.log('已取消设置')
        }
        this.changeTimeStatus = true
      } else {
        alert('请输入一个整数！！')
      }
    },
    dbTime (status) {
      this.changeTimeStatus = status
      this.$nextTick(() => {
        if (this.changeTimeStatus == false) {
          this.$refs.timevalue.focus()
        }
      })
    },
    timestamp () {
      var str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      var code = ''
      for (let i = 0; i < 8; i++) {
        var charIndex = Math.floor(Math.random() * str.length)
        code += str[charIndex]
      }
      return new Date().getTime() + code
    },
    countdown () {
      this.setInterTime = setInterval(() => {
        this.refreshTime -= 1
        if (this.refreshTime <= 0) {
          this.key = {
            LeftChart1: this.timestamp(),
            LeftChart2: this.timestamp(),
            LeftChart3: this.timestamp(),
            CenterCmp: this.timestamp(),
            RightChart1: this.timestamp(),
            BottomCharts: this.timestamp()
          }
          this.refreshTime = 600
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('../../assets/img/bg.png');
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: 1.5rem;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
  }

  .main-container {
    height: calc(~"100% - 80px");

    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-chart-container {
    width: 22%;
    padding: 10px;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 78%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 65%;
    display: flex;
  }

  .rmctc-left-container {
    width: 65%;
  }

  .rmctc-right-container {
    width: 35%;
  }

  .rmc-bottom-container {
    height: 35%;
  }

  .rmctc-chart-1, .rmctc-chart-2 {
    height: 50%;
  }
  .inputTime {
    width: 60%;
    height: 60%;
    font-size: 16px;
    box-sizing: border-box;
    font-weight: 600;
    text-align: center;
  }
  .tips{
        position: fixed;
    z-index: 1000;
    color: #999;
    width: 40%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #fff;
    border-radius: 10px;
    left: 30%;
    top: -60px;
  }
  .tips_animation{
    animation-name: top;
    animation-duration: 2s;
  }
  @keyframes top{
    0% {top: -60px}
    30%{top: 0px}
    100% {top: 0px}
  }
}
</style>
