import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
} from '@material-ui/core';

const ChannelAnalysis = (props) => {

  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('channel'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        below: '5%',
        left: '5%',
        data: ['手机', '电脑', '电视', '洗衣机', '空调', '床', '红酒', '白酒']
      },
      series: [
        {
          name: '商品库存统计',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 56, name: '手机' },
            { value: 14, name: '电脑' },
            { value: 21, name: '电视' },
            { value: 23, name: '洗衣机' },
            { value: 12, name: '空调' },
            { value: 42, name: '床' },
            { value: 235, name: '红酒' },
            { value: 155, name: '白酒' }
          ]
        }
      ]
    });
    window.onresize = () => myChart.resize();
    return () => {
      myChart.dispose();
    };
  }, []);
  return (
    <Card>
      <CardHeader
        title="商品库存"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <div id="channel" style={{ height: 400, width: 400}} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChannelAnalysis;
