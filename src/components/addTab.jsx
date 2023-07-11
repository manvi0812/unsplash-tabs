/* eslint-disable react/prop-types */
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';

const AddTab = ({ allTabs, loading, handleAddTab }) => {
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
