/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import SearchResult from './searchResult';
import WebSearch from './webSearch';
import axios from 'axios';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { styles } from './tabPopover';
import shortcutIcon from '../../public/shortcuts.svg';
import shift from '../../public/shift.svg';
import tkey from '../../public/tkey.svg';
import leftArrow from '../../public/leftArrow.svg';
import rightArrow from '../../public/rightArrow.svg';
import { Popover } from '@mui/material';
import { withStyles } from '@mui/styles';

let newStyle = {
  paper: {
    ...styles.paper,
    color: '#fff !important',
    padding: '1rem',
    left: '4.5rem !important',
    width: '210px',
    boxShadow: 'none',
    backgroundColor: '#000000de',
  },
};

const CustomPopover = withStyles(newStyle)(Popover);

const DisplayTab = React.memo(
  ({
    tab,
    allTabs,
    setAllTabs,
    setLoading,
    hideAfterBlink,
    sethideAfterBlink,
    handleAddTab,
    setIsActive,
    isActive,
  }) => {
    const [orientation, setOrientation] = useState('all');
    const [sortBy, setsortBy] = useState('relevance');
    const [toggle, setToggle] = useState(false);
    const [toggleSnackbar, setToggleSnackbar] = useState(false);
    const [shortcutAnchorEl, setShortcutAnchorEl] = useState(null);

    const open = Boolean(shortcutAnchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
      setShortcutAnchorEl(null);
    };

    const handleClick = (data, or, type) => {
      let axiosParams = {};
      switch (type) {
        case 'or':
          if (or !== 'All' || orientation !== 'All')
            axiosParams.orientation = or;
          return axiosParams;
        case 'sort':
          axiosParams.order_by = or;
          return axiosParams;
      }
      // if (or !== 'All') axiosParams.orientation = or;

      const options = {
        method: 'GET',
        url: `https://api.unsplash.com/search/photos?page=1&query=${data}`,
        params: axiosParams,
        headers: {
          Authorization:
            'Client-ID z3DNUdVcDT7LpmGJFhOd7n7TxB-YdBxTqTpvOzjOvq8',
        },
      };
      setLoading(true);
      axios
        .request(options)
        .then((response) => {
          let newAllTabs = [...allTabs];
          let activeTab = newAllTabs.filter((newTab) => newTab.id === tab.id);
          if (activeTab[0].name !== activeTab[0].searchInput) setToggle(true);
          else activeTab[0].name = data;
          activeTab[0].searchInput = data;
          activeTab[0].searchResult = response.data.results;
          if (response.data.results.length === 0) setToggleSnackbar(true);
          setAllTabs([...newAllTabs]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      const options1 = {
        method: 'GET',
        url: `https://api.unsplash.com/search/photos?page=1&query=${data}&color=white`,
        params: axiosParams,
        headers: {
          Authorization:
            'Client-ID z3DNUdVcDT7LpmGJFhOd7n7TxB-YdBxTqTpvOzjOvq8',
        },
      };
      axios
        .request(options1)
        .then((response) => {
          let newAllTabs = [...allTabs];
          let activeTab = newAllTabs.filter((newTab) => newTab.id === tab.id);
          activeTab[0].coverPhoto = response.data.results[3]?.urls;
          setAllTabs([...newAllTabs]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const action = (
      <React.Fragment>
        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={() => setToggleSnackbar(false)}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </React.Fragment>
    );

    return (
      <>
        <p className='tabTitle'>{tab.content}</p>
        <div className='searchContainer'>
          <WebSearch
            allTabs={allTabs}
            setAllTabs={setAllTabs}
            tab={tab}
            handleClick={handleClick}
            toggle={toggle}
            setToggle={setToggle}
            hideAfterBlink={hideAfterBlink}
            sethideAfterBlink={sethideAfterBlink}
            handleAddTab={handleAddTab}
            setIsActive={setIsActive}
            isActive={isActive}
            shortcutAnchorEl={shortcutAnchorEl}
          />
          <div
            className='shortcut-wrapper'
            onClick={(event) => setShortcutAnchorEl(event.currentTarget)}
          >
            <img
              src={shortcutIcon}
              alt='shortcut icon'
              className='shortcutIcon'
            />
            <p className='shortcut-label'>Shortcuts</p>
          </div>
          {shortcutAnchorEl && (
            <CustomPopover
              hideBackdrop
              id={id}
              open={open}
              anchorEl={shortcutAnchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <div className='d-flex justify-content-between w-100'>
                <strong className='m-0'>Shortcuts</strong>
                <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
              </div>
              <div className='shortcut-popover-icons'>
                <div className='d-flex'>
                  <img className='s-icon' src={shift} />
                  <img className='s-icon' src={tkey} />
                </div>
                <p className='m-0'>Add new tab</p>
              </div>
              <div className='shortcut-popover-icons'>
                <div className='d-flex'>
                  <img className='s-icon' src={leftArrow} />
                </div>
                <p className='m-0'>Go to prev tab</p>
              </div>
              <div className='shortcut-popover-icons'>
                <div className='d-flex'>
                  <img className='s-icon' src={rightArrow} />
                </div>
                <p className='m-0'>Go to next tab</p>
              </div>
            </CustomPopover>
          )}

          {tab.searchResult?.length ? (
            <>
              <SearchResult
                orientation={orientation}
                setOrientation={setOrientation}
                sortBy={sortBy}
                setsortBy={setsortBy}
                data={tab.searchResult}
                handleClick={handleClick}
                tab={tab}
              />
            </>
          ) : null}

          {toggleSnackbar && (
            <Snackbar
              open={toggleSnackbar}
              autoHideDuration={6000}
              onClose={() => toggleSnackbar(false)}
              message='No results found'
              action={action}
            />
          )}
        </div>
      </>
    );
  }
);

export default DisplayTab;
