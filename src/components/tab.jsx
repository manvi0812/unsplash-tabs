/* eslint-disable react/prop-types */
import { useState } from 'react';
import { InputAdornment, TextField, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import TabPopover from './tabPopover';

const Tab = ({
  tab,
  handleCloseTab,
  isActive,
  setIsActive,
  handleFocus,
  allTabs,
  setAllTabs,
  tabItemDragOver,
  tabItemDrag,
  handleAddTab,
  index,
}) => {
  const [isTabNameSaved, setIsTabNameSaved] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (e, tabId) => {
    let newAllTabs = [...allTabs];
    let activeTab = newAllTabs.filter((t) => t.id === tabId);
    activeTab[0].name = e.target.value;
    setIsTabNameSaved(false);
    setAllTabs([...newAllTabs]);
  };

  const handleTabContent = (id) => {
    if (tab.name !== '') {
      let newAllTabs = [...allTabs];
      let newTabObj = newAllTabs.filter((t) => t.id === id);
      newTabObj[0].content = tab.name;
      setAllTabs([...newAllTabs]);

      setIsTabNameSaved(true);
    }
  };

  const handleOnDrag = (e, id) => {
    tabItemDrag.current = id;
  };

  const handleOnDragEnter = (e, id) => {
    tabItemDragOver.current = id;

    let newAllTabs = [...allTabs];
    let finalTabsArr = [];

    newAllTabs.forEach((newTab) => {
      finalTabsArr.push({
        name: newTab.name,
        id: newTab.id,
        content: newTab.content,
        isDragging: false,
      });
    });

    finalTabsArr[id].isDragging = true;
    setAllTabs([...finalTabsArr]);
  };

  const handleOnDragEnd = () => {
    let newAllTabs = [...allTabs];
    let mainTab = newAllTabs[tabItemDrag.current];
    newAllTabs.splice(tabItemDrag.current, 1);
    newAllTabs.splice(tabItemDragOver.current, 0, mainTab);

    let finalTabs = [];
    newAllTabs.forEach((newTab) => {
      finalTabs.push({
        name: newTab.name,
        id: newTab.id,
        content: newTab.content,
        isDragging: false,
      });
    });

    tabItemDrag = null;
    tabItemDragOver = null;

    setAllTabs([...newAllTabs]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div
      className='tab'
      key={tab.id}
      draggable
      onDragStart={(e) => handleOnDrag(e, index)}
      onDragEnter={(e) => handleOnDragEnter(e, index)}
      onDragEnd={handleOnDragEnd}
    >
      <TextField
        onContextMenu={(e) => {
          e.preventDefault();
          handleClick(e);
          return false;
        }}
        id='input-with-icon-textfield'
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position='end'>
                {!isTabNameSaved && isActive === tab.id && tab.name !== '' && (
                  <Tooltip title='Save Tab Name'>
                    <DoneIcon
                      sx={{ color: '#fff' }}
                      fontSize='10px'
                      className='addbutton'
                      onClick={() => {
                        handleTabContent(tab.id);
                      }}
                    />
                  </Tooltip>
                )}
                {isActive === tab.id && (
                  <Tooltip title='Close Tab'>
                    <CloseIcon
                      onClick={() => {
                        handleCloseTab(tab.id);
                        setIsActive(0);
                      }}
                      fontSize='10px'
                      className='addbutton'
                      sx={{ color: '#fff' }}
                    />
                  </Tooltip>
                )}
              </InputAdornment>
            </>
          ),
        }}
        value={tab.name}
        autoComplete='off'
        placeholder='New Tab'
        variant='standard'
        onChange={(e) => handleChange(e, tab.id)}
        sx={{
          cursor: isTabNameSaved || tab.id !== isActive ? 'pointer' : 'inherit',
          borderRadius: '8px 8px 2px 2px',
          background: isActive === tab.id ? '#616577' : '#303443',
          padding: '5px 15px',
          color: '#fff',
          input: {
            color: '#fff',
            fontSize: '12px',
            cursor:
              isTabNameSaved || tab.id !== isActive ? 'pointer' : 'inherit',
            borderBottom: 0,
          },
        }}
        onFocus={() => handleFocus(tab.id)}
        className='tabInput'
      />
      {tab.isDragging ? <div className='dragIndicator'></div> : null}
      {anchorEl && (
        <TabPopover
          handleCloseTab={handleCloseTab}
          tab={tab}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleAddTab={handleAddTab}
          allTabs={allTabs}
        />
      )}
    </div>
  );
};
export default Tab;
