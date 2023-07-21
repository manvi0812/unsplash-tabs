import { useState } from 'react';
import Tabs from './components/tabs';
import './index.css';
import DisplayTab from './components/displayTab';
import { v4 as uuidv4 } from 'uuid';

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
      coverPhoto: null,
    },
  ]);
  const [isActive, setIsActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hideAfterBlink, sethideAfterBlink] = useState(false);

  const handleAddTab = (length, type, data) => {
    if (allTabs.length < 20) {
      let defaultTab = {
        name: '',
        id: uuidv4(),
        content: '',
        isDragging: false,
        searchInput: '',
        searchResult: [],
        isPinned: false,
        tabColor: '',
        coverPhoto: null,
      };
      if (type === 'duplicate') {
        defaultTab = { ...data };
        defaultTab.id = uuidv4();
      }

      let newAllTabs = [...allTabs];
      newAllTabs.push(defaultTab);
      setAllTabs([...newAllTabs]);

      let newActiveTabIndex = defaultTab.id;
      type === 'rightClick'
        ? setTimeout(() => {
            setIsActive(newActiveTabIndex);
          }, 100)
        : setIsActive(newActiveTabIndex);
    }
  };

  const handleOnKeyDown = (e) => {
    switch (e.code) {
      case 'KeyT':
        e.shiftKey && handleAddTab(0, 'rightClick');
        break;
      case 'ArrowLeft':
        {
          let activeTabIndex = allTabs.findIndex((t) => t.id === isActive);
          activeTabIndex > 0 && setIsActive(allTabs[activeTabIndex - 1].id);
        }
        break;
      case 'ArrowRight':
        {
          let activeTabIndex = allTabs.findIndex((t) => t.id === isActive);
          activeTabIndex < 22 && setIsActive(allTabs[activeTabIndex + 1].id);
        }
        break;
    }
  };

  return (
    <div className='App' onKeyDown={handleOnKeyDown}>
      <Tabs
        allTabs={allTabs}
        setAllTabs={setAllTabs}
        isActive={isActive}
        setIsActive={setIsActive}
        loading={loading}
        handleAddTab={handleAddTab}
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
                    hideAfterBlink={hideAfterBlink}
                    sethideAfterBlink={sethideAfterBlink}
                    handleAddTab={handleAddTab}
                    setIsActive={setIsActive}
                  />
                </div>
              ) : tab.id === isActive && tab.content === '' ? (
                <div className='tabContent defaultContent'>Add Tab Name +</div>
              ) : null}
            </div>
          );
        })}
      </>
    </div>
  );
}
