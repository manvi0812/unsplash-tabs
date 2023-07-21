/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import Tab from './tab';
import AddTab from './addTab';

const Tabs = ({
  allTabs,
  setAllTabs,
  isActive,
  setIsActive,
  loading,
  handleAddTab,
}) => {
  const [colorPicker, setColorPicker] = useState({ id: null, color: '' });

  const handleCloseTab = (id) => {
    let newAllTabs = [...allTabs];
    let filteredTabs = newAllTabs.filter((tab) => tab.id !== id);

    setAllTabs([...filteredTabs]);
    setIsActive(allTabs[0].id);
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
              handleCloseTab={handleCloseTab}
              tab={tab}
              allTabs={allTabs}
              setAllTabs={setAllTabs}
              tabItemDrag={tabItemDrag}
              tabItemDragOver={tabItemDragOver}
              handleAddTab={handleAddTab}
              colorPicker={colorPicker}
              setColorPicker={setColorPicker}
            />
          </div>
        );
      })}

      <AddTab loading={loading} allTabs={allTabs} handleAddTab={handleAddTab} />
    </div>
  );
};

export default Tabs;
