/* eslint-disable react/prop-types */
import { FormControl, MenuItem, Select } from '@mui/material';

const SelectParams = ({ handleChange, value, label, options }) => {
  return (
    <div className='mx-2'>
      <p className='m-0 resultHead select-label'>{label}</p>
      <FormControl
        sx={{
          background: '#ffffffcf',
          width: '120px',
          borderRadius: '12px',
          marginBottom: '2rem',
          '& .MuiOutlinedInput-root:hover,.MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': {
              borderColor: 'transparent',
            },
          },
        }}
      >
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          defaultValue={value}
          onChange={handleChange}
        >
          <MenuItem disabled value=''>
            <em>Placeholder</em>
          </MenuItem>
          {options?.map((option) => (
            <MenuItem
              sx={{ fontSize: '12px' }}
              key={option.id}
              value={option.title.toLowerCase()}
            >
              {option.icon} {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectParams;
