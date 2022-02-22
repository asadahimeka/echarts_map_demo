import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import geoJSON from '@/components/map-chart/370000_full.json';

const chartOptions = {
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
      name: '青岛市',
      selected: true,
      itemStyle: {
        areaColor: 'pink'
      },
      select: {
        itemStyle: {
          areaColor: 'pink'
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
};

let myChart = null;

export default defineComponent({
  setup () {
    const chartEl = ref(null);
    onMounted(() => {
      myChart = echarts.init(chartEl.value);
      echarts.registerMap('山东', geoJSON);
      myChart.setOption(chartOptions);
    });
    return () => (
      <div ref={chartEl} style='width: 900px;height: 560px' />
    );
  }
});
