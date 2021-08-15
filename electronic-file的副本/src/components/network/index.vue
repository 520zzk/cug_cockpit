<template>
  <div id="data-view">
    <div class="tips" :class=" {'tips_animation': changeTimeStatus == false  }">设置时间不低于5分钟，不超过60分钟</div>
    <dv-full-screen-container>
      <div class="main-header">
        <div class="mh-left"></div>
        <div class="mh-middle">中国地质大学 校园网运行监控</div>
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
        <dv-border-box-12 class="left-chart-container">

          <Left-Chart-1 :key="key.LeftChart1"/>
          <Left-Chart-2 :key="key.LeftChart2"/>
          <Left-Chart-3 :key="key.LeftChart3"/>
          <Left-Chart-4 :key="key.LeftChart4"/>

        </dv-border-box-12>

        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-10 class="rmctc-left-container">

              <Center-Cmp :key="key.CenterCmp"/>

            </dv-border-box-10>

            <div class="rmctc-right-container">
              <dv-border-box-10 class="rmctc-chart-1">

                <Center-Bottom-1 :key="key.CenterBottom1"/>

              </dv-border-box-10>

              <dv-border-box-10 class="rmctc-chart-2" :reverse="true">

                <Center-Bottom-2 :key="key.CenterBottom2"/>

              </dv-border-box-10>
            </div>
          </div>
        </div>
         <dv-border-box-12 class="rmc-bottom-container">

             <Right-Chart-1 :key="key.RightChart1"/>
             <Right-Chart-2 :key="key.RightChart2"/>
             <Right-Chart-3 :key="key.RightChart3"/>
             <Right-Chart-4 :key="key.RightChart4"/>

          </dv-border-box-12>
      </dv-border-box-1>

    </dv-full-screen-container>
  </div>
</template>

<script>
import LeftChart1 from './LeftChart1'
import LeftChart2 from './LeftChart2'
import LeftChart3 from './LeftChart3'
import LeftChart4 from './LeftChart4'

import CenterCmp from './CenterCmp'

import CenterBottom1 from './CenterBottom1'
import CenterBottom2 from './CenterBottom2'

import RightChart1 from './RightChart1'
import RightChart2 from './RightChart2'
import RightChart3 from './RightChart3'
import RightChart4 from './RightChart4'

export default {
  name: 'DataView',
  components: {
    LeftChart1,
    LeftChart2,
    LeftChart3,
    LeftChart4,
    CenterCmp,
    CenterBottom1,
    CenterBottom2,
    RightChart1,
    RightChart2,
    RightChart3,
    RightChart4
  },
  data () {
    return {
      key: {
        LeftChart1: this.timestamp(),
        LeftChart2: this.timestamp(),
        LeftChart3: this.timestamp(),
        LeftChart4: this.timestamp(),
        CenterCmp: this.timestamp(),
        CenterBottom1: this.timestamp(),
        CenterBottom2: this.timestamp(),
        RightChart1: this.timestamp(),
        RightChart2: this.timestamp(),
        RightChart3: this.timestamp(),
        RightChart4: this.timestamp()
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
      for (let i = 0; i < 15; i++) {
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
            LeftChart4: this.timestamp(),
            CenterCmp: this.timestamp(),
            CenterBottom1: this.timestamp(),
            CenterBottom2: this.timestamp(),
            RightChart1: this.timestamp(),
            RightChart2: this.timestamp(),
            RightChart3: this.timestamp(),
            RightChart4: this.timestamp()
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
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }
//**头部 */
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
      font-size: 30px;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
  }

  .main-container {
    height: calc(~"100% - 80px");

    .border-box-content {
      padding: 10px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-chart-container {
    width: 22%;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 56%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .rmctc-left-container {
    width: 100%;
    height:65%;
  }

  .rmctc-right-container {
    width: 100%;
    height:35%;
    display: flex;
  }
   .rmctc-chart-1, .rmctc-chart-2 {
    width:50%;
  }
  .rmc-bottom-container {
    width:22%;
    .border-box-content {
      flex-direction: column;
    }
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
