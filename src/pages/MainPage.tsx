import React, {useState} from 'react';
import '../css/MainPage.css';

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
                </div>
            </div>
            <div className="content">
                {/* Render content based on the active tab */}
                {activeTab === 'Home' && <h1>Home Content</h1>}
                {activeTab === 'Products' && <h1>Products Content</h1>}
                {activeTab === 'History' && <h1>History Content</h1>}
            </div>
        </div>
    );
};

export default MainPage;