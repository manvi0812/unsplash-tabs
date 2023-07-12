/* eslint-disable react/prop-types */
import SearchIcon from '@mui/icons-material/Search';

import { InputAdornment, TextField } from '@mui/material';
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
}) => {
  const [search, setSearch] = useState('');
  const [shouldChange, setShouldChange] = useState(false);

  let activeTab = allTabs.filter((newTab) => newTab.id === tab.id);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log(shouldChange);
    if (shouldChange) {
      let newAllTabs = [...allTabs];
      let activeTab = newAllTabs.filter((newTab) => newTab.id === tab.id);
      activeTab[0].name = activeTab[0]?.searchInput;
      setAllTabs([...newAllTabs]);
    }
  }, [activeTab, allTabs, setAllTabs, shouldChange, tab.id]);

  return (
    <div
      className='websearch-container'
      style={
        tab?.searchResult.length
          ? { backgroundImage: `url(${tab?.searchResult[0].urls?.full})` }
          : {}
      }
    >
      <div className='mb-5'>
        <h1 className='unsplash-head'>Unsplash Clone</h1>
        <p className='unsplash-head'>
          The internet’s source for visuals. <br></br> Powered by creators
          everywhere.
        </p>
      </div>

      <TextField
        id='input-with-icon-textfield'
        placeholder='Search high-resolution images'
        value={search !== '' ? search : activeTab[0]?.searchInput}
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
            width: '40vw',
            color: '#101010',
            fontSize: '14px',
            borderRadius: '30px',
            outline: 0,
          },
        }}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon
                onClick={() => {
                  handleClick(search);
                  let scrollEl = document.getElementById('result');
                  console.log(scrollEl);
                  scrollEl.scrollIntoView({ behavior: 'smooth' }, true);
                }}
                sx={{
                  color: '#fff',
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
      {tab.searchResult.length ? (
        <ExpandMoreIcon
          // sx={{ color: '#fff', fontSize: '2rem' }}
          className='scroll-arrow'
          onClick={() => {
            let scrollEl = document.getElementById('result');
            console.log(scrollEl);
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
