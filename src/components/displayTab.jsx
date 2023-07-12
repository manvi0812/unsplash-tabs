/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import SearchResult from './searchResult';
import WebSearch from './webSearch';
import axios from 'axios';

// import axios from 'axios';

const DisplayTab = React.memo(({ tab, allTabs, setAllTabs, setLoading }) => {
  console.log(tab, 'tab search');
  const [orientation, setOrientation] = useState('all');
  const [sortBy, setsortBy] = useState('relevance');
  const [toggle, setToggle] = useState(false);

  const handleClick = (data, or, type) => {
    let axiosParams = {};
    switch (type) {
      case 'or':
        if (or !== 'All' || orientation !== 'All') axiosParams.orientation = or;
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
        Authorization: 'Client-ID z3DNUdVcDT7LpmGJFhOd7n7TxB-YdBxTqTpvOzjOvq8',
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
        setAllTabs([...newAllTabs]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        />

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
      </div>
    </>
  );
});

export default DisplayTab;
