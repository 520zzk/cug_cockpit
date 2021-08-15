<template>
  <div class="right-chart-1">
    <div class="rc1-header">设备下线情况</div>
    <div class="lc1-details">下线数量<span>{{downDevices}}</span></div>
    <dv-scroll-board class="right" 
      :config="config" 
      @move="moveTable"
      @out="leaveTable"/>
    <div class="showItem" v-show="showItem" ref="showitem">
       <div class="showTitle">设备名称：<span class="showContent">E-JXZHL-JHJA0113-YX-10.80.41.50</span></div>
       <div class="showTitle">来源：<span class="showContent">南望山探针</span></div>
       <!-- <div>设备名称：<span></span></div> -->
    </div>
  </div>
</template>

<script>

import * as api from '@/api/api.js'
export default {
  name: 'RightChart1',
  data () {
    return {
      config: {
        header: ['设备名称', '设备分类', '来源'],
        data: [],
        // index: true,
        // indexHeader: '序号',
        columnWidth: [120],
        align: ['center']
      },
      downDevices: 0,
      showItem: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const p2 = api.getDownDevices('/62_op', {})
      const p3 = api.getDownDevices('/63_op', {})
      const p4 = api.getDownDevices('/64_op', {})
      Promise.all([p2, p3, p4]).then(values => {
        // console.log(values)
        var data = []
        values.forEach(value => {
          if (value.data.DownDevices.hasOwnProperty('Details')) {
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
            value.data.DownDevices.Details.forEach(item => {
              data.push([item.displayName, item.category, origin])
            })
          }
        })
        this.config.data = data
        this.downDevices = data.length
        this.config = { ...this.config }
      })
    },
    moveTable (e) {
      // console.log(e, 'move')
      let {event, row} = e
      this.showItem = true
      // console.log(event.x, event.y)
      this.$refs.showitem.style.left = event.x + 5  + 'px'
      this.$refs.showitem.style.top = event.y + 5 + 'px'
    },
    leaveTable (e) {
      // console.log('out')
      setTimeout( () => {
        this.showItem = false
      },1000)
    }
  }
}
</script>

<style lang="less">
.right-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rc1-header {
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }
  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-indent: 20px;
  }
  .lc1-details span {
    color: #096dd9;
    font-weight: bold;
    font-size: 35px;
    margin-left: 20px;
  }
  .rc1-chart-container {
    flex: 1;
    display: flex;
  }

  .left {
    width: 30%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number {
      font-size: 34px;
      color: #096dd9;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }

  .right {
    flex: 1;
    padding-bottom: 20px;
    box-sizing: border-box;
  }
  .showItem{
    position: fixed;
    opacity: 1;
    border-radius: 5px;
    top:0px;
    left:0px;
    width: 200px;
    padding:10px;
    background: white;
    height: 80px;
    color: black;
    z-index: 999;
    .showTitle{
      color: rgb(102, 102, 102);
      font: 14px / 21px sans-serif;
    }
    .showContent{
      font-size: 14px;
      color: #666;
      font-weight: 900;
    }
  }
}
</style>
