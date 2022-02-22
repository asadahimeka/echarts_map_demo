<style lang="less">
* {
  box-sizing: border-box;
}
html,body {
  margin: 0;
  padding: 0;
}
.o-echarts {
  width: 900px;
  height: 560px;
}
</style>
<template>
  <div :id="id" class="o-echarts"></div>
</template>

<script>

import * as echarts from 'echarts';
import Geojson from './370000_full.json';

console.log('Geojson: ', Geojson);

export default {
  name: 'echart-map',
  data () {
    return {
      id: 'echarts_' + new Date().getTime() + Math.floor(Math.random() * 1000),
      echartObj: null,
      option: {
        geo: {
          map: '山东',
          label: {
            show: true
          },
          roam: false,
          itemStyle: {
            borderColor: '#6367ad',
            borderWidth: 1
          },
          regions: [{
            name: '济南市',
            selected: true,
            itemStyle: {
              areaColor: 'red'
            },
            select: {
              itemStyle: {
                areaColor: 'red'
              },
              label: {
                show: true,
                color: '#fff'
              }
            }
          }],
          emphasis: {
            disabled: true
          },
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%'
        },
        series: []
      }
    };
  },
  mounted () {
    this.echartObj = echarts.init(document.getElementById(this.id));
    echarts.registerMap('山东', Geojson);
    this.echartObj.setOption(this.option, true);
    window.addEventListener('resize', () => {
      if (this.echartObj && this.echartObj.resize) {
        this.echartObj.resize();
      }
    });
  }
};
</script>
