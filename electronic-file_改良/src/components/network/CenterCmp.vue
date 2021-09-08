<template>
  <div class="center-cmp" id="centerCmp">
    <!-- <iframe src='http://202.114.205.64:8060/embedView.do?type=widget&widgetID=30000000639&authKey=f97583b4-4a1c-4e44-8aff-956704ac55fd' frameborder='0' scrolling='no' class="center-cmp"/> -->
  </div>

</template>

<script>
import * as echarts from 'echarts'
import * as api from '@/api/api.js'
export default {
  name: 'CenterCmp',
  components: {
  },
  data () {
    return {
      option: {
        title: {
          text: '核心区域拓扑结构',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 14
            },
            data: [],
            links: [],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            },
            tooltip: {
              formatter: tooltip => {
                var str = `<div class="tooltip">
                              
                              <div class="tooltip-content">
                                <div><span class="tooltip-title-left">接口名称: </span> <sapn class="tooltip-title-right" style="color:#666;font-weight:900">${tooltip.data.intfDisplayName}</sapn></div>
                                <div><span class="tooltip-title-left">接口规格: </span> <sapn class="tooltip-title-right" style="color:#666;font-weight:900"> ${tooltip.data.ifspeed}</sapn></div>
                                <div><span class="tooltip-title-left">流入流量: </span> <sapn class="tooltip-title-right" style="color:#666;font-weight:900"> ${tooltip.data.InTraffic}</sapn></div>
                                <div><span class="tooltip-title-left">流出流量: </span> <sapn class="tooltip-title-right" style="color:#666;font-weight:900"> ${tooltip.data.OutTraffic}</sapn></div>
                            
                              </div>
                            </div>`
                return str
              }
            }
          }
        ]
      }
    }
  },
  created () {
    api.getBVDetails('/64_op', { bvName: '核心区域拓扑结构' }).then(res => {
      this.init(res.data)
    })

  },
  mounted () {
    this.myChart_1 = echarts.init(document.getElementById('centerCmp'))
    // this.init()
  },
  methods: {
    init (res) {
      var data = []
      var links = []
      var option = { ...this.option }

      if (res.hasOwnProperty('deviceProperties')) {
        res.deviceProperties.forEach((value, index) => {
          var item = {}
          var itemColor = ''
          item.name = value.label
          item.value = value.name
          item.x = value.x
          item.y = value.y
          item.label = {
            show: true,
            fontSize: 10,
            width: 120,
            overflow: 'break',
            position: 'bottom',
            color: '#fff'
          }
          
          // item.symbol = 'roundRect'
          switch (value.statusStr) {
            case '注意': {
              itemColor = '#dcd173'
              item.symbol = 'image://' + require(`@/assets/Attention${value.iconName}`)
              break
            }
            case '问题': {
              itemColor = '#f4b169'
              item.symbol = 'image://' + require(`@/assets/Trouble${value.iconName}`)
              break
            }
            case '取消管理': {
              itemColor = '#7F7F7F'
              item.symbol = 'image://' + require(`@/assets/cancel${value.iconName}`)
              break
            }
            case '严重': {
              itemColor = '#FB5B5A'
              item.symbol = 'image://' + require(`@/assets/Critical${value.iconName}`)
              break
            }
            default: itemColor = '#91CC75'
              item.symbol = 'image://' + require(`@/assets/clear${value.iconName}`)
          }
          item.itemStyle = {
            color: itemColor
          }
          item.tooltip = {
            formatter: (data) => {
              var str = `<div class="tooltip">
                              <div class="tooltip-title note-circle-blue"> ${data.marker} ${data.data.name} </div>
                              <div class="tooltip-content">
                                <div>${data.marker}<span class="tooltip-title-left">设备状态: </span> <sapn class="tooltip-title-right" style="color:#666;font-weight:900"> ${data.data.statusStr} </sapn></div>
                                <div>${data.marker}<span class="tooltip-title-left">类型: </span> <sapn class="tooltip-title-right" style="color:#666;font-weight:900"> ${data.data.type} </sapn></div>
                            
                              </div>
                            </div>`
              // console.log(data, 'ddsd')
              return str
            }
          }
          item.statusStr = value.statusStr
          item.type = value.type
          item.ipaddress = value.objName.slice(0, -12)
          data.push(item)

          // 连接关系处置
          if (res.hasOwnProperty('linkProperties')) {
            if (res.linkProperties.length > 0) {
              var link = {}
              var linkTemp = res.linkProperties.filter(itemlink => {
                return itemlink.source == value.name
              })
              if (linkTemp.length > 0) {
                linkTemp.forEach(lineTempItem => {
                  res.deviceProperties.forEach((dev, devIndex) => {
                    if (lineTempItem.dest == dev.name) {
                      link = { ...lineTempItem }
                      link.source = index
                      link.target = devIndex
                      links.push(link)
                    }
                  })
                })
              }
            }
          }
        })
        // 处置连接线有多条的情况

        for (var i = 0; i < links.length; i++) {
          var a = 1
          // 处理每条线的显示
          links[i].label = {
            show: true,
            // position: 'middle',
            formatter: links[i].label,
            color: '#fff',
            fontSize: 10

          }
          for (var k = 0; k < links.length; k++) {
            if (links[i].source == links[k].source && links[i].target == links[k].target) {
              if (links[k].flag == undefined) {
                if (a % 2 == 1) {
                  links[k].lineStyle = {
                    curveness: a * -0.1
                  }
                } else {
                  links[k].lineStyle = {
                    curveness: a * 0.1
                  }
                }
                a += 1
                links[k].flag = 1
              }
            }
          }
          switch (links[i].status) {
            case '2': {
              links[i].lineStyle.color = '#f4b169'
              break
            }
            case '1': {
              links[i].lineStyle.color = '#FB5B5A'
              break
            }
            default: links[i].lineStyle.color = '#91CC75'
          }
        }
        // console.log(links)
        option.series[0].data = data
        option.series[0].links = links
        // console.log(option)
        this.option = { ...option }
        this.myChart_1.setOption(this.option)
      }
    }
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
  background: rgba(13, 33, 98, 0.3);
  flex-direction: column;

}
</style>
