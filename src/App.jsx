import { useState } from 'react';
import Tabs from './components/tabs';
import './index.css';
import DisplayTab from './components/displayTab';

export default function App() {
  const [allTabs, setAllTabs] = useState([
    {
      name: '',
      id: 0,
      content: '',
      isDragging: false,
      searchInput: '',
      searchResult: [],
      isPinned: false,
      tabColor: '',
    },
  ]);
  const [isActive, setIsActive] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <div className='App'>
      <Tabs
        allTabs={allTabs}
        setAllTabs={setAllTabs}
        isActive={isActive}
        setIsActive={setIsActive}
        loading={loading}
      />
      <>
        {allTabs.map((tab) => {
          return (
            <div key={tab.id} className='tabContentContainer'>
              {tab.id === isActive ? (
                <div className='tabContent'>
                  <DisplayTab
                    setLoading={setLoading}
                    loading={loading}
                    tab={tab}
                    isActive={isActive}
                    allTabs={allTabs}
                    setAllTabs={setAllTabs}
                  />
                </div>
              ) : tab.id === isActive && tab.content === '' ? (
                <div className='tabContent defaultContent'>Add Tab Name +</div>
              ) : null}
            </div>
          );
        })}
      </>
      <div className='tabContent defaultContent'></div>
    </div>
  );
}
