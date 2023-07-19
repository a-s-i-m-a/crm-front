import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import {appStoreContext} from "../store/context.store";
import {ProductHistory} from "../store/historyStore";
import "../css/HistoryPage.css"
import Pagination from "../components/Pagination";

const HistoryPage: React.FC = observer(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const [timePeriod, setTimePeriod] = useState('all');
    const { historyStore } = useContext(appStoreContext);


    useEffect(() => {
        historyStore.fetchHistory(timePeriod, searchQuery);
    }, [timePeriod, searchQuery]);


    const handleTimePeriodChange = (value: string) => {
        setTimePeriod(value);
    };

    const handlePrevPage = () => {
        historyStore.setCurrentPage(historyStore.currentPage-1)
    };

    const handleNextPage = () => {
        historyStore.setCurrentPage(historyStore.currentPage+1)
    };

    const handleReturnProduct = (barcode: string, soldSize: string) => {
        historyStore.returnProduct(barcode, soldSize);
    };


    return (
        <div className="history-page">
            <h2>History</h2>
            <div>
                <input
                    type="text"
                    placeholder="Search by title or barcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={timePeriod} onChange={(e) => handleTimePeriodChange(e.target.value)}>
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="all">All</option>
                </select>
            </div>
            <div className="history-list">
                {historyStore.history?.map((product: ProductHistory) => (
                    <div key={product.id} className="product-item">
                        <h3>{product.title}</h3>
                        <p>Barcode: {product.barcode}</p>
                        <p>Sold Size: {product.soldSize}</p>
                        <p>Color: {product.color}</p>
                        <p>Sell Date: {new Date(product.sellDate).toLocaleDateString()}</p>
                        <button
                            onClick={()=>
                                handleReturnProduct(product.barcode, product.soldSize)}
                            className="product-item-return"
                        >Return
                        </button>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={historyStore.currentPage}
                isNextDisabled={historyStore.history.length < 10}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />
        </div>
    );
});

export default HistoryPage;
