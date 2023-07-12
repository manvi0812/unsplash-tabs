/* eslint-disable react/prop-types */
import { Divider, Popover, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = {
  paper: {
    width: '168px',
    fontSize: '12px',
    padding: '8px 0',
    borderRadius: '8px !important',
    backgroundColor: '#2A2A2A !important',
    boxShadow: '2px 3px 5px 0px #343a40 !important',
    '&.MuiTypography-root': {
      color: 'white',
    },
  },
};

const CustomPopover = withStyles(styles)(Popover);

const TabPopover = ({
  anchorEl,
  setAnchorEl,
  handleCloseTab,
  tab,
  handleAddTab,
  allTabs,
  setAllTabs,
}) => {
  const RIGHTCLICK_LIST = [
    {
      label: 'Add new tab to the right',
      yPadding: 5,
      hasDivider: true,
      onclick: () => handleAddTab(allTabs[allTabs.length - 1].id),
      disable: allTabs.length === 5,
    },
    {
      label: 'Close',
      yPadding: 5,
      hasDivider: false,
      onclick: () => handleCloseTab(tab.id),
    },
    {
      label: 'Close other tabs',
      yPadding: 0,
      hasDivider: false,
      onclick: () => handleCloseOtherTabs(tab.id),
      disable: allTabs.length === 1,
    },
    {
      label: 'Close tabs to the right',
      yPadding: 5,
      hasDivider: true,
      onclick: () => handleCloseTabsToTheRight(tab.id),
      disable: allTabs[allTabs.length - 1].id === tab.id,
    },
    {
      label: 'Pin',
      yPadding: 5,
      hasDivider: false,
      //   onclick: handleCloseTab(tab.id),
    },
    {
      label: 'Duplicate',
      yPadding: 0,
      hasDivider: false,
      //   onclick: handleCloseTab(tab.id),
    },
    {
      label: 'Change the color of tab',
      yPadding: 5,
      hasDivider: false,
      //   onclick: handleCloseTab(tab.id),
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseOtherTabs = (id) => {
    let newAllTabs = [...allTabs];
    let leftArray = newAllTabs.filter((t) => t.id === id);
    setAllTabs([...leftArray]);
  };

  const handleCloseTabsToTheRight = (id) => {
    let index = allTabs.map((tab) => tab.id).indexOf(id);
    let leftArray = allTabs.slice(0, index + 1);
    setAllTabs([...leftArray]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <CustomPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {RIGHTCLICK_LIST.map((item, index) => (
        <>
          <Typography
            className='rightClick-list'
            key={index}
            onClick={() => {
              item?.onclick();
              handleClose();
            }}
            sx={{
              padding: `${item.yPadding}px 8px`,
              cursor: item?.disable ? 'default' : 'pointer',
              color: item?.disable ? '#818181' : '#fff',
              ':hover': {
                backgroundColor: item?.disable
                  ? 'transparent'
                  : 'rgba(217, 217, 217, 0.31)',
              },
            }}
          >
            {item.label}
          </Typography>
          {item.hasDivider && <Divider sx={{ borderColor: '#fff' }} />}
        </>
      ))}
    </CustomPopover>
  );
};

export default TabPopover;
