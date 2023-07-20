/* eslint-disable react/prop-types */
import { BlockPicker } from 'react-color';
import { useEffect, useState } from 'react';
import { InputAdornment, TextField, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import TabPopover from './tabPopover';

const Tab = ({
  tab,
  handleCloseTab,
  isActive,
  setIsActive,
  allTabs,
  setAllTabs,
  tabItemDragOver,
  tabItemDrag,
  handleAddTab,
  index,
  colorPicker,
  setColorPicker,
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
    if (!allTabs[id].isPinned) tabItemDrag.current = id;
  };

  const handleOnDragEnter = (e, id) => {
    if (!allTabs[id].isPinned) {
      tabItemDragOver.current = id;

      let newAllTabs = [...allTabs];
      let finalTabsArr = [];

      newAllTabs.forEach((newTab) => {
        finalTabsArr.push({
          name: newTab.name,
          id: newTab.id,
          content: newTab.content,
          isDragging: false,
          searchInput: newTab.searchInput,
          searchResult: newTab.searchResult,
          isPinned: newTab.isPinned,
          tabColor: newTab.tabColor,
        });
      });

      finalTabsArr[id].isDragging = true;
      setAllTabs([...finalTabsArr]);
    }
  };

  const handleOnDragEnd = (e, id) => {
    if (!allTabs[id].isPinned) {
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
          searchInput: newTab.searchInput,
          searchResult: newTab.searchResult,
          isPinned: newTab.isPinned,
          tabColor: newTab.tabColor,
        });
      });

      tabItemDrag = null;
      tabItemDragOver = null;

      setAllTabs([...newAllTabs]);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFocus = (id) => {
    setIsActive(id);
  };

  useEffect(() => {
    let newAllTabs = [...allTabs];
    let sortedTabs = newAllTabs.reduce((accumulator, currentValue) => {
      if (currentValue.isPinned) return [currentValue, ...accumulator];

      return [...accumulator, currentValue];
    }, []);

    setAllTabs([...sortedTabs]);
  }, [tab.isPinned]);

  const handleColorPicker = (color) => {
    let newAllTabs = [...allTabs];
    let filteredTab = newAllTabs.filter((t) => t.id === colorPicker.id);

    filteredTab[0].tabColor = color.hex;

    setAllTabs([...newAllTabs]);
    setColorPicker({ id: null, color: '' });
  };

  return (
    <div
      className='tab'
      key={tab.id}
      draggable
      onDragStart={(e) => handleOnDrag(e, index)}
      onDragEnter={(e) => handleOnDragEnter(e, index)}
      onDragEnd={(e) => handleOnDragEnd(e, index)}
    >
      {!tab.isPinned ? (
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
                  {!isTabNameSaved &&
                    isActive === tab.id &&
                    tab.name !== '' && (
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
            '& .MuiInput-root:after': {
              borderBottom: 0,
            },
            cursor:
              isTabNameSaved || tab.id !== isActive ? 'pointer' : 'inherit',
            borderRadius: '8px 8px 2px 2px',
            border: tab.tabColor !== '' ? `3px solid ${tab.tabColor}` : '',
            borderBottom: 0,
            background: isActive === tab.id ? '#616577' : '#303443',
            padding: '3px 15px',
            color: '#fff',
            input: {
              color: '#fff',
              fontSize: '12px',
              cursor:
                isTabNameSaved || tab.id !== isActive ? 'pointer' : 'inherit',
              borderBottom: 0,
              outline: 0,
            },
          }}
          onFocus={() => handleFocus(tab.id)}
          className='tabInput'
        />
      ) : (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            handleClick(e);
            return false;
          }}
          onClick={() => handleFocus(tab.id)}
          className={`pinned-tab ${isActive === tab.id ? 'active-pinned' : ''}`}
        >
          <div className='pinned-circle'>{tab.name[0] ?? 'N'}</div>
        </div>
      )}
      {tab.isDragging ? <div className='dragIndicator'></div> : null}
      {anchorEl && (
        <>
          <TabPopover
            handleCloseTab={handleCloseTab}
            tab={tab}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleAddTab={handleAddTab}
            allTabs={allTabs}
            setAllTabs={setAllTabs}
            setIsActive={setIsActive}
            colorPicker={colorPicker}
            setColorPicker={setColorPicker}
          />
        </>
      )}
      {colorPicker.id === tab.id && (
        <BlockPicker onChange={handleColorPicker} className='color-picker' />
      )}
    </div>
  );
};
export default Tab;
