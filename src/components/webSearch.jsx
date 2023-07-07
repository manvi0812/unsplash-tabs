/* eslint-disable react/prop-types */
import SearchIcon from '@mui/icons-material/Search';

import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ConfirmationDialog from './confirmationDialog';

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

  // const [randomPhoto, setRandomPhoto] = useState({});
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
    console.log(activeTab);
  }, [activeTab, allTabs, setAllTabs, shouldChange, tab.id]);

  // const handleClick = (data) => {
  //   let axiosParams = {};
  //   if (orientation !== 'All') axiosParams.orientation = orientation;

  //   const options = {
  //     method: 'GET',
  //     url: `https://api.unsplash.com/search/photos?page=1&query=${data}`,
  //     params: axiosParams,
  //     headers: {
  //       Authorization: 'Client-ID z3DNUdVcDT7LpmGJFhOd7n7TxB-YdBxTqTpvOzjOvq8',
  //     },
  //   };
  //   setLoading(true);
  //   axios
  //     .request(options)
  //     .then((response) => {
  //       let newAllTabs = [...allTabs];
  //       let activeTab = newAllTabs.filter((newTab) => newTab.id === tab.id);
  //       if (activeTab[0].name !== '') setToggle(true);
  //       else activeTab[0].name = data;
  //       activeTab[0].searchInput = data;
  //       activeTab[0].searchResult = response.data.results;
  //       setAllTabs([...newAllTabs]);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className='websearch-container'>
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
          '& .MuiOutlinedInput-root:hover,.MuiOutlinedInput-root.Mui-focused': {
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
