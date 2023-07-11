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

  const handleAddTab = (length) => {
    if (allTabs.length < 6) {
      let defaultTab = {
        name: '',
        id: !allTabs.length ? 0 : length + 1,
        content: '',
        isDragging: false,
        searchInput: '',
        searchResult: [],
      };
      console.log('alll', length);
      let newAllTabs = [...allTabs];
      newAllTabs.push(defaultTab);
      setAllTabs([...newAllTabs]);
      setIsActive(length + 1);
    }
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
              handleAddTab={handleAddTab}
            />
          </div>
        );
      })}

      <AddTab loading={loading} allTabs={allTabs} handleAddTab={handleAddTab} />
    </div>
  );
};

export default Tabs;
