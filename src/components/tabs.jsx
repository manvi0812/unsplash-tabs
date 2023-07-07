/* eslint-disable react/prop-types */
import { useRef } from 'react';
import Tab from './tab';
import AddTab from './addTab';

const Tabs = ({ allTabs, setAllTabs, isActive, setIsActive, loading }) => {
  const handleCloseTab = (id) => {
    let newAllTabs = [...allTabs];
    let filteredTabs = newAllTabs.filter((tab) => tab.id !== id);

    setAllTabs([...filteredTabs]);
  };

  const handleFocus = (id) => {
    setIsActive(id);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  let tabItemDrag = useRef();
  let tabItemDragOver = useRef();

  return (
    <div className='tabsContainer' onDragOver={handleOnDragOver}>
      {allTabs.map((tab, index) => {
        return (
          <div key={tab.id}>
            <Tab
              isActive={isActive}
              setIsActive={setIsActive}
              index={index}
              handleFocus={handleFocus}
              handleCloseTab={handleCloseTab}
              tab={tab}
              allTabs={allTabs}
              setAllTabs={setAllTabs}
              tabItemDrag={tabItemDrag}
              tabItemDragOver={tabItemDragOver}
            />
          </div>
        );
      })}

      <AddTab
        loading={loading}
        allTabs={allTabs}
        setAllTabs={setAllTabs}
        setIsActive={setIsActive}
      />
    </div>
  );
};

export default Tabs;
