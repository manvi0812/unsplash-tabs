/* eslint-disable react/prop-types */
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';

const AddTab = ({ allTabs, setAllTabs, setIsActive, loading }) => {
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
  console.log(allTabs.length, 'alll');
  return (
    <>
      {(allTabs.length < 6 || !loading) && (
        <Tooltip title='New Tab'>
          <AddIcon
            color='secondary'
            onClick={() => handleAddTab(allTabs[allTabs.length - 1].id)}
            className='addbutton'
            fontSize='12px'
            sx={{ color: '#fff' }}
          />
        </Tooltip>
      )}
    </>
  );
};

export default AddTab;
