import React, {useState} from 'react';
import '../css/MainPage.css';
import ProductsListPage from "./ProductsPage";
import StatisticPage from "./StatisticPage";
import HistoryPage from "./HistoryPage";

const MainPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Products');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'Statistics' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Statistics')}
                    >
                        Statistics
                    </div>
                    <div
                        className={`tab ${activeTab === 'Products' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Products')}
                    >
                        Products
                    </div>
                    <div
                        className={`tab ${activeTab === 'History' ? 'active' : ''}`}
                        onClick={() => handleTabClick('History')}
                    >
                        History
                    </div>
                </div>
            </div>
            <div className="content">
                {activeTab === 'Statistics' && <StatisticPage />}
                {activeTab === 'Products' && <ProductsListPage/>}
                {activeTab === 'History' && <HistoryPage />}
            </div>
        </div>
    );
};

export default MainPage;