import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import { Doughnut } from 'react-chartjs-2';
import {appStoreContext} from "../store/context.store";
import {Chart,ArcElement} from 'chart.js';
import "../css/StatisticPage.css"


const StatisticPage: React.FC = () => {
    const { statisticStore } = useContext(appStoreContext);
    const { totalCount, totalSoldPrice, totalBoughtPrice, profit } = statisticStore.statistics;
    const [timePeriod, setTimePeriod] = useState('all');
    Chart.register(ArcElement)

    useEffect(()=>{
        statisticStore.fetchStatistics()
        statisticStore.fetchHistoryStatistics(timePeriod)
    },[statisticStore, timePeriod])

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
            <div>
                <div className="chart-container">
                    <Doughnut data={chartData} />
                </div>
                <div className="statistics-summary">
                    <h2>In stock</h2>
                    <div>
                        <div className="color-square" style={{ backgroundColor: chartData.datasets[0].backgroundColor[0] }}></div>
                        <h3>Total Sold Price</h3>
                        <p>{totalCount}</p>
                    </div>
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
            <div>
                <div className="chart-container">
                    <Doughnut data={chartData} />
                </div>
                <div className="statistics-summary">
                    <h2>Sold out</h2>
                    <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
                        <option value="all">All Time</option>
                        <option value="day">Day</option>
                        <option value="month">Month</option>
                    </select>
                    <div>
                        <div className="color-square" style={{ backgroundColor: chartData.datasets[0].backgroundColor[0] }}></div>
                        <h3>Total Sold Price</h3>
                        <p>{statisticStore.history.totalCount}</p>
                    </div>
                    <div>
                        <div className="color-square" style={{ backgroundColor: chartData.datasets[0].backgroundColor[0] }}></div>
                        <h3>Total Sold Price</h3>
                        <p>{statisticStore.history.totalSoldPrice}</p>
                    </div>
                    <div>
                        <div className="color-square" style={{ backgroundColor: chartData.datasets[0].backgroundColor[1] }}></div>
                        <h3>Total Bought Price</h3>
                        <p>{statisticStore.history.totalBoughtPrice}</p>
                    </div>
                    <div>
                        <div className="color-square" style={{ backgroundColor: chartData.datasets[0].backgroundColor[2] }}></div>
                        <h3>Income</h3>
                        <p>{statisticStore.history.income}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(StatisticPage);
