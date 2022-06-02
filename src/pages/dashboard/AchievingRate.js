import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { Box, Card, CardContent, CardHeader, Divider } from '@material-ui/core';

const AchievingRate = (props) => {


    useEffect(() => {
        let myChart;

        if (myChart != null && myChart !== '' && myChart !== undefined) {
            myChart.dispose();
        }
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('achievingRate'));
        const optionAP = {};
        myChart.setOption(optionAP);

        // 绘制图表
        myChart.setOption({
            legend: {},
            tooltip: { top: '5%' },
            //   dataset: {
            //     source: 
            //   },
            xAxis: {
                type: 'category',
                axisLabel: {
                    interval: 0
                },
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {},
            series: [
                {
                    name: '手机',
                    type: 'line',
                    data: [10, 3, 9, 27, 12, 9, 21, 30, 21, 14, 15, 20]
                },
                {
                    name: '电脑',
                    type: 'line',
                    data: [3, 8, 4, 8, 16, 6, 7, 20, 10, 11, 22, 13]
                },
                {
                    name: '电视',
                    type: 'line',
                    data: [23, 20, 30, 24, 23, 24, 21, 32, 12, 9, 6, 11]
                },
                {
                    name: '洗衣机',
                    type: 'line',
                    data: [1, 24, 31, 14, 26, 15, 8, 14, 30, 4, 16, 24]
                },
                {
                    name: '空调',
                    type: 'line',
                    data: [21, 14, 7, 4, 14, 25, 14, 25, 35, 4, 16, 20]
                },
                {
                    name: '床',
                    type: 'line',
                    data: [6, 4, 5, 9, 12, 7, 2, 20, 25, 6, 3, 18]
                },
                {
                    name: '红酒',
                    type: 'line',
                    data: [35, 45, 26, 30, 8, 25, 35, 21, 6, 18, 35, 24]
                },
                {
                    name: '白酒',
                    type: 'line',
                    data: [24, 13, 18, 16, 18, 24, 28, 30, 14, 18, 4, 34]
                },
            ]
        });

        window.onresize = () => myChart.resize();
        return () => {
            myChart.dispose();
        };
    }, []);

    return (
        <Card>
            <CardHeader title="商品销售统计" />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                    <div id="achievingRate" style={{ width: '100%', height: '100%' }} />
                </Box>
            </CardContent>
        </Card>
    );
};
export default AchievingRate;
