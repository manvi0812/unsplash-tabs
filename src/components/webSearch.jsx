/* eslint-disable react/prop-types */
import SearchIcon from '@mui/icons-material/Search';

import { InputAdornment, Snackbar, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ConfirmationDialog from './confirmationDialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const WebSearch = ({
  setAllTabs,
  allTabs,
  tab,
  handleClick,
  toggle,
  setToggle,
  hideAfterBlink,
  sethideAfterBlink,
  shortcutAnchorEl,
}) => {
  const [search, setSearch] = useState('');
  const [shouldChange, setShouldChange] = useState(false);

  let activeTab = allTabs.filter((newTab) => newTab.id === tab.id);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (shouldChange) {
      let newAllTabs = [...allTabs];
      let activeTab = newAllTabs.filter((newTab) => newTab.id === tab.id);
      activeTab[0].name = activeTab[0]?.searchInput;
      setAllTabs([...newAllTabs]);
    }
  }, [activeTab, allTabs, setAllTabs, shouldChange, tab.id]);

  useEffect(() => {
    setTimeout(() => {
      sethideAfterBlink(true);
    }, 5000);
  }, []);

  const handleRightClickAddTab = (e) => {
    switch (e.code) {
      case 'Enter':
        handleClick(search);
        break;
      case 'default':
        return;
    }
  };

  useEffect(() => {
    if (!shortcutAnchorEl) {
      let el = document.getElementById('input-with-textfield');
      setTimeout(function () {
        el.focus();
      }, 0);
    }
  }, [shortcutAnchorEl]);

  return (
    <div
      className='websearch-container'
      style={
        tab?.searchResult?.length
          ? { backgroundImage: `url(${tab.coverPhoto?.full})` }
          : {}
      }
    >
      <div className='head-wrapper mb-3'>
        <h1 className='unsplash-head'>Tabs Project using Unsplash</h1>
        <p className='unsplash-head'>
          The internet’s source for visuals. <br></br> Powered by creators
          everywhere.
        </p>
      </div>

      <Snackbar
        open={true}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        className='snackbar blink-snackbar'
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#02bb63',
            display: hideAfterBlink ? 'none' : '',
          },
        }}
        message='Try right clicking the tabs'
      />

      <TextField
        id='input-with-textfield'
        placeholder='Search high-resolution images'
        value={search.length ? search : activeTab[0]?.searchInput}
        sx={{
          '& .MuiOutlinedInput-root:hover,.MuiOutlinedInput-root.Mui-focused,.MuiOutlinedInput-root':
            {
              '& > fieldset': {
                borderColor: 'transparent',
              },
            },
          color: '#101010',
          borderRadius: '30px',
          input: {
            backgroundColor: '#dee2e6',
            minWidth: '50vw',
            color: '#101010',
            fontSize: '14px',
            borderRadius: '30px',
            outline: 0,
          },
        }}
        autoFocus={!shortcutAnchorEl}
        onInput={handleChange}
        onKeyDown={handleRightClickAddTab}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon
                onClick={() => {
                  handleClick(search);
                  let scrollEl = document.getElementById('result');
                  scrollEl.scrollIntoView({ behavior: 'smooth' }, true);
                }}
                sx={{
                  color: '#000',
                  cursor: 'pointer',
                  ':hover': {
                    color: '#FF8989',
                  },
                }}
              />
            </InputAdornment>
          ),
        }}
        autoComplete='off'
        variant='outlined'
      />
      {tab.searchResult?.length ? (
        <ExpandMoreIcon
          className='scroll-arrow'
          onClick={() => {
            let scrollEl = document.getElementById('result');
            scrollEl.scrollIntoView({ behavior: 'smooth' }, true);
          }}
        />
      ) : null}
      {toggle && (
        <ConfirmationDialog
          toggle={toggle}
          setToggle={setToggle}
          setShouldChange={setShouldChange}
          data={{
            title: 'Want to change Tab name?',
            content:
              'Are you sure you want to change Tab name? This will discard current tab name and replace with the search term.',
          }}
        />
      )}
    </div>
  );
};

export default WebSearch;
