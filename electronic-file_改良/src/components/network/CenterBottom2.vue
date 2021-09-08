<template>
  <div class="right-chart-1">
    <div class="rc1-header">关键设备</div>

    <!-- <div class="rc1-chart-container">
      <div class="left">
        <div class="number">262</div>
        <div>设备运行总数</div>
      </div> -->

      <!-- <dv-capsule-chart class="right" :config="config" /> -->
      <dv-scroll-board :config="config" class="right" @move="moveTable"
      @out="leaveTable"/>
      <div class="showItem" v-show="showItem" ref="showitem">
        <div class="showTitle">设备名称：<span class="showContent" v-html="showConten[0]"></span></div>
        <div class="showTitle">状态：<span class="showContent" v-html="showConten[1]"></span></div>
        <div class="showTitle">IP地址：<span class="showContent" v-html="showConten[2]"></span></div>
        <div class="showTitle">设备类型：<span class="showContent" v-html="showConten[3]"></span></div>
        <div class="showTitle">在线状况：<span class="showContent" v-html="showConten[4]"></span></div>
      </div>
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
        header: ['设备名', '状态', 'IP地址', '类型', '在线'],
        data: [],
        // index: true,
        // indexHeader: '序号',
        // columnWidth: [60],
        rowNum: 7,
        align: ['center'],
        headerBGC: 'rgba(17,35,93,1)',
        oddRowBGC: 'rgba(11,96,156,0.8)',
        evenRowBGC: 'rgba(30,122,169,0.8)'
      },
      showItem: false,
      showConten: []
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () {
      // getDeviceSummary
      /** 三个base
       * 10.80.16.102.30000000001
       * 10.80.16.103.30000000001
       * 10.80.16.105.30000000001
       * 两个防火墙
       * 10.80.16.7.30000000001
       * 10.80.16.9.30000000001
       */
      var devices = ['10.80.16.102.30000000001', '10.80.16.103.30000000001', '10.80.16.105.30000000001', '10.80.16.7.30000000001', '10.80.16.9.30000000001']
      var data = []
      for (var i = 0; i < devices.length; i++) {
        api.getDeviceSummary('/64_op', { name: devices[i] }).then(res => {
          var item = []
          if (res.hasOwnProperty('data')) {
            switch (res.data.status) {
              case '注意': {
                item.push(`<span style="color:#dcd173;">${res.data.displayName}</span>`)
                item.push(`<span style="color:#dcd173;">${res.data.status}</span>`)
                item.push(`<span style="color:#dcd173;">${res.data.ipAddress}</span>`)
                item.push(`<span style="color:#dcd173;">${res.data.type}</span>`)
                item.push(`<span style="color:#dcd173;">${res.data.isDevicePingable == 'true' ? '在线' : '未在线'}</span>`)
                break
              }
              case '问题': {
                item.push(`<span style="color:#f4b169;">${res.data.displayName}</span>`)
                item.push(`<span style="color:#f4b169;">${res.data.status}</span>`)
                item.push(`<span style="color:#f4b169;">${res.data.ipAddress}</span>`)
                item.push(`<span style="color:#f4b169;">${res.data.type}</span>`)
                item.push(`<span style="color:#f4b169;">${res.data.isDevicePingable == 'true' ? '在线' : '未在线'}</span>`)
                break
              }
              case '严重': {
                item.push(`<span style="color:#FB5B5A;">${res.data.displayName}</span>`)
                item.push(`<span style="color:#FB5B5A;">${res.data.status}</span>`)
                item.push(`<span style="color:#FB5B5A;">${res.data.ipAddress}</span>`)
                item.push(`<span style="color:#FB5B5A;">${res.data.type}</span>`)
                item.push(`<span style="color:#FB5B5A;">${res.data.isDevicePingable == 'true' ? '在线' : '未在线'}</span>`)
                break
              }
              case '未知': {
                item.push(`<span style="color:#999;">${res.data.displayName}</span>`)
                item.push(`<span style="color:#999;">取消管理</span>`)
                item.push(`<span style="color:#999;">${res.data.ipAddress}</span>`)
                item.push(`<span style="color:#999;">${res.data.type}</span>`)
                item.push(`<span style="color:#999;">${res.data.isDevicePingable == 'true' ? '在线' : '未在线'}</span>`)
                break
              }
              case '设备没有监视。': {
                item.push(`<span style="color:#999;">${res.data.displayName}</span>`)
                item.push(`<span style="color:#999;">${res.data.status}</span>`)
                item.push(`<span style="color:#999;">${res.data.ipAddress}</span>`)
                item.push(`<span style="color:#999;">${res.data.type}</span>`)
                item.push(`<span style="color:#999;">${res.data.isDevicePingable == 'true' ? '在线' : '未在线'}</span>`)
                break
              }
              default: {
                item.push(`<span style="color:#44BD7F;">${res.data.displayName}</span>`)
                item.push(`<span style="color:#44BD7F;">${res.data.status}</span>`)
                item.push(`<span style="color:#44BD7F;">${res.data.ipAddress}</span>`)
                item.push(`<span style="color:#44BD7F;">${res.data.type}</span>`)
                item.push(`<span style="color:#44BD7F;">${res.data.isDevicePingable == 'true' ? '在线' : '未在线'}</span>`)
                break
              }
            }
            data.push(item)
            this.config.data = data
            this.config = { ...this.config }
          }
        })
      }

      // api.listAllURLs('/64_op', {}).then(res => {
      //   if (res.data.length > 0) {
      //     var data = []
      //     for (var i = 0; i < res.data.length; i++) {
      //       var item = []
      //       switch (res.data[i].statusNum) {
      //         case '4': {
      //           item.push(`<span style="color:#FF4683;font-weight: bold;">${res.data[i].displayName}</span>`)
      //           item.push(`<span style="color:#FF4683;font-weight: bold;">未响应</span>`)
      //           item.push(`<span style="color:#FF4683;font-weight: bold;">${res.data[i].url}</span>`)
      //           item.push(`<span style="color:#FF4683;font-weight: bold;">${res.data[i].RESPONSETIME}</span>`)
      //           break
      //         }
      //         case '7': {
      //           item.push(`<span style="color:#999;">${res.data[i].displayName}</span>`)
      //           item.push(`<span style="color:#999;">未管理</span>`)
      //           item.push(`<span style="color:#999;">${res.data[i].url}</span>`)
      //           item.push(`<span style="color:#999;">${res.data[i].RESPONSETIME}</span>`)
      //           break
      //         }
      //         case '5': {
      //           item.push(`<span style="color:#44BD7F;">${res.data[i].displayName}</span>`)
      //           item.push(`<span style="color:#44BD7F;">正常</span>`)
      //           item.push(`<span style="color:#44BD7F;">${res.data[i].url}</span>`)
      //           item.push(`<span style="color:#44BD7F;">${res.data[i].RESPONSETIME}</span>`)
      //           break
      //         }
      //         default: {
      //           item.push(`<span style="color:#fff;">${res.data[i].displayName}</span>`)
      //           item.push(`<span style="color:#fff;">${res.data[i].stringstatus}</span>`)
      //           item.push(`<span style="color:#fff;">${res.data[i].url}</span>`)
      //           item.push(`<span style="color:#fff;">${res.data[i].RESPONSETIME}</span>`)
      //           break
      //         }
      //       }
      //       data.push(item)
      //     }
      //     this.config.data = data
      //     this.config = {... this.config}
      //   }
      // })
    },
    moveTable (e) {
      let { event, row } = e
      this.showItem = true
      this.showConten = row.ceils
      this.$refs.showitem.style.left = event.x + 5 + 'px'
      this.$refs.showitem.style.top = event.y + 5 + (-120) + 'px'
    },
    leaveTable (e) {
      setTimeout(() => {
        this.showItem = false
      }, 1000)
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
    font-size: 18px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
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
    padding-right: 20px;
    box-sizing: border-box;
  }
   .showItem{
    position: fixed;
    opacity: 1;
    border-radius: 5px;
    top:0px;
    left:0px;
    min-width: 200px;
    padding:10px;
    background: white;
    height: 100px;
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
