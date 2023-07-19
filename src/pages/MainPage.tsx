import React, {useState} from 'react';
import '../css/MainPage.css';
import ProductsListPage from "./ProductsPage";
import StatisticPage from "./StatisticPage";
import HistoryPage from "./HistoryPage";

const MainPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'Home' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Home')}
                    >
                        Home
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
                    <div
                        className={`tab ${activeTab === 'Clients' ? 'active' : ''}`}
                        onClick={() => handleTabClick('Clients')}
                    >
                        Clients
                    </div>
                </div>
            </div>
            <div className="content">
                {/* Render content based on the active tab */}
                {activeTab === 'Home' && <StatisticPage />}
                {activeTab === 'Products' && <ProductsListPage/>}
                {activeTab === 'History' && <HistoryPage />}
            </div>
        </div>
    );
};

export default MainPage;