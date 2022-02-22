/* global echarts */
(function () {
  const myChart = echarts.init(document.getElementById('echarts-map'));
  fetch('./370000_full.json').then(res => res.json()).then(setChart);
  function setChart (geoJSON) {
    echarts.registerMap('山东', geoJSON);
    const colors = {
      mapBorderColor: '#0068b7',
      mapLineColor: '#1453b3',
      mapLineEffectColor: '#fff',
      mapEffectScatterColor1: '#1453b3',
      mapEffectScatterColor2: '#e10e0e'
    };
    const regionColors = ['#feebc0', '#fadce9', '#1453b3', '#e7deee', '#feebc0', '#e7deee', '#d3edfb', '#feebc0', '#e7deee', '#fffcdb', '#fffcdb', '#d5ead8', '#fadce9', '#d5ead8', '#d3edfb', '#d3edfb'];
    const actCity = '淄博市';
    const options = {
      backgroundColor: '#fefefe',
      geo: {
        map: '山东',
        label: {
          show: false
        },
        roam: false,
        itemStyle: {
          borderColor: colors.mapBorderColor,
          borderWidth: 1.2
        },
        regions: geoJSON.features.map((e, i) => ({
          name: e.properties.name,
          selected: e.properties.name === actCity,
          itemStyle: {
            areaColor: regionColors[i]
          },
          select: {
            itemStyle: {
              areaColor: regionColors[i]
            },
            label: {
              show: false
            }
          }
        })),
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
    const geoCoordMap = geoJSON.features.reduce((acc, cur) => {
      acc[cur.properties.name] = cur.properties.center;
      return acc;
    }, {});
    const convertData = data => {
      const res = [];
      data.forEach(dataItem => {
        const fromCoord = geoCoordMap[dataItem[0].name];
        const toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push([{ coord: fromCoord }, { coord: toCoord }]);
        }
      });
      return res;
    };
    const mapLines = geoJSON.features
      .filter(e => e.properties.name !== actCity)
      .map(e => [
        { name: actCity },
        { name: e.properties.name, value: 30 }
      ]);
    const linesData = convertData(mapLines);
    options.series.push({
      type: 'lines',
      zlevel: 1,
      effect: {
        show: true,
        period: 3,
        trailLength: 0.7,
        color: colors.mapLineEffectColor,
        symbolSize: 5
      },
      lineStyle: {
        normal: {
          color: colors.mapLineColor,
          width: 1,
          curveness: -0.2
        }
      },
      data: linesData
    }, {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 3,
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          color: colors.mapEffectScatterColor1
        }
      },
      data: mapLines.map(dataItem => ({
        name: dataItem[1].name,
        value: geoCoordMap[dataItem[1].name],
        symbolSize: dataItem[1].value / 8
      }))
    }, {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 3,
      showEffectOn: 'emphasis',
      rippleEffect: {
        number: 0
      },
      label: {
        normal: {
          show: true,
          position: 'bottom',
          offset: [0, 10],
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
          lineHeight: 18,
          formatter: params => params.name.split('').join('\n')
        }
      },
      symbol: 'path://M511.998465 1019.833097c0 0-380.87252-424.445922-380.87252-634.792651 0-210.328309 170.528861-380.874567 380.87252-380.874567 210.344682 0 380.87559 170.546258 380.87559 380.874567C892.874055 595.386152 511.998465 1019.833097 511.998465 1019.833097zM511.998465 131.12441c-140.223648 0-253.916037 113.692389-253.916037 253.91706 0 140.243091 113.692389 253.91706 253.916037 253.91706 140.224672 0 253.915014-113.673969 253.915014-253.91706C765.913479 244.814752 652.223137 131.12441 511.998465 131.12441zM511.998465 511.997953c-70.120011 0-126.956484-56.837496-126.956484-126.956484 0-70.121034 56.836473-126.95853 126.956484-126.95853 70.120011 0 126.959553 56.837496 126.959553 126.95853C638.958018 455.160457 582.118476 511.997953 511.998465 511.997953z',
      symbolKeepAspect: true,
      symbolOffset: [0, '-50%'],
      symbolSize: val => {
        return val[2] / 5;
      },
      itemStyle: {
        normal: {
          color: colors.mapEffectScatterColor2
        }
      },
      data: [{
        name: actCity,
        value: geoCoordMap[actCity].concat(120)
      }]
    });
    myChart.setOption(options);
    myChart.on('click', params => {
      alert(params.name);
    });
    // window.addEventListener('resize', () => {
    //   if (myChart && myChart.resize) myChart.resize();
    // });
  }
})();
