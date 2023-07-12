import React, {useContext, useEffect} from 'react';
import { observer } from 'mobx-react';
import { Doughnut } from 'react-chartjs-2';
import {appStoreContext} from "../store/context.store";
import {Chart,ArcElement} from 'chart.js';
import "../css/StatisticPage.css"


const StatisticPage: React.FC = () => {
    const { statisticStore } = useContext(appStoreContext);
    const { totalCount, totalSoldPrice, totalBoughtPrice, profit } = statisticStore.statistics;
    Chart.register(ArcElement)

    useEffect(()=>{
        statisticStore.fetchStatistics()
    },[statisticStore])

    const chartData = {
        labels: ['Total Sold Price', 'Total Bought Price', 'Profit'],
        datasets: [
            {
                data: [totalSoldPrice, totalBoughtPrice, profit],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="statistics-container">
            <h2 className="title">Statistics</h2>
            <div className="chart-container">
                <Doughnut data={chartData} />
            </div>
            <div className="statistics-summary">
                <div>
                    <div className="color-square" style={{ backgroundColor: chartData.datasets[0].backgroundColor[0] }}></div>
                    <h3>Total Sold Price</h3>
                    <p>{totalSoldPrice}</p>
                </div>
                <div>
                    <div className="color-square" style={{ backgroundColor: chartData.datasets[0].backgroundColor[1] }}></div>
                    <h3>Total Bought Price</h3>
                    <p>{totalBoughtPrice}</p>
                </div>
                <div>
                    <div className="color-square" style={{ backgroundColor: chartData.datasets[0].backgroundColor[2] }}></div>
                    <h3>Profit</h3>
                    <p>{profit}</p>
                </div>
            </div>
        </div>
    );
};

export default observer(StatisticPage);
