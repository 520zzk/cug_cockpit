<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <!-- <div class="mh-left">技术支持:<a href="https://github.com/jiaming743/DataV">https://github.com/jiaming743/DataV</a></div> -->
        <div class="mh-left"></div>
        <div class="mh-middle">中国地质大学网管平台监测</div>
        <div class="mh-right">
          <dv-border-box-2
            style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;"
          >
            {{refreshTime}}
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

    </dv-full-screen-container>
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
      refreshTime: 60
    }
  },
  created () {
    this.countdown()
  },
  methods: {
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
      setInterval(() => {
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
          this.refreshTime = 60
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
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
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
      font-size: 30px;
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
}
</style>
