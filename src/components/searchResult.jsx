/* eslint-disable react/prop-types */
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Skeleton,
  Tooltip,
  tooltipClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Charts from './charts';
import SelectParams from './select';

const orientationOptions = [
  {
    id: 1,
    title: 'All',
    icon: (
      <AutoAwesomeMosaicOutlinedIcon
        style={{ fontSize: '14px' }}
        className='mx-2'
      />
    ),
  },
  {
    id: 2,
    title: 'Landscape',
    icon: <CropLandscapeIcon style={{ fontSize: '14px' }} className='mx-2' />,
  },
  {
    id: 3,
    title: 'Portrait',
    icon: <CropPortraitIcon style={{ fontSize: '14px' }} className='mx-2' />,
  },
];

const sortOptions = [
  {
    id: 1,
    title: 'Relevance',
    icon: '',
  },
  {
    id: 2,
    title: 'Latest',
    icon: '',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const SearchResult = ({
  data,
  orientation,
  setOrientation,
  sortBy,
  setsortBy,
  handleClick,
  tab,
}) => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [photoStatistics, setPhotoStatistics] = useState({});

  const handleAgeChange = (event, type) => {
    type === 'or'
      ? setOrientation(event.target.value)
      : setsortBy(event.target.value);
    handleClick(tab?.searchInput, event.target.value, type);
  };

  const handleClickOpen = (data) => {
    setOpen(true);
    setDialogData(data);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogData({});
  };

  useEffect(() => {
    if (open) {
      axios
        .get(`https://api.unsplash.com/photos/${dialogData.id}/statistics`, {
          headers: {
            Authorization:
              'Client-ID z3DNUdVcDT7LpmGJFhOd7n7TxB-YdBxTqTpvOzjOvq8',
          },
        })
        .then((response) => {
          console.log(response);
          setPhotoStatistics(response.data);
        });
    }
  }, [open]);

  console.log(dialogData);

  return (
    <div className='searchItemsContainer row d-flex' id='result'>
      <div className='d-flex justify-content-between align-items-center'>
        <p className='resultHead'>
          Search Results <DynamicFeedIcon />
        </p>
        <div className='d-flex'>
          <SelectParams
            handleChange={(e) => handleAgeChange(e, 'or')}
            value={orientation}
            label='Orientation'
            options={orientationOptions}
          />
          <SelectParams
            handleChange={(e) => handleAgeChange(e, 'sort')}
            value={sortBy}
            label='Sort By'
            options={sortOptions}
          />
        </div>
      </div>

      {data.map((item) => {
        return (
          <LightTooltip
            title={item.alt_description}
            placement='top-start'
            key={item.id}
          >
            <div className='searchItems col-md-4'>
              <img
                className='searchImg'
                src={item.urls.small}
                height={100}
                width={200}
              />
              <div className='d-flex justify-content-between w-100 align-items-center'>
                <p className='m-0'>
                  <FavoriteIcon style={{ color: '#dc3545' }} /> {item.likes}
                </p>
                <button
                  className='itemLink'
                  onClick={() => handleClickOpen(item)}
                >
                  More Info <FullscreenIcon style={{ fontSize: '16px' }} />
                </button>
              </div>
            </div>
          </LightTooltip>
        );
      })}
      <Dialog
        open={open}
        PaperProps={{
          style: {
            backgroundColor: '#1c1f26',
            border: '1px solid #a8b3cf33',
            color: '#fff',
            borderRadius: '15px',
            maxWidth: '900px',
            minWidth: '90vw',
          },
        }}
        className='dialog'
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle style={{ fontWeight: '900', fontSize: '1.5rem' }}>
          {dialogData.description}
        </DialogTitle>
        <div className='d-flex'>
          <DialogContent
            style={{ borderRight: '1px solid', overflow: 'hidden' }}
          >
            <DialogContentText
              className='dialog-content pt-2'
              id='alert-dialog-slide-description'
            >
              {dialogData.alt_description}
            </DialogContentText>
            <DialogContentText className='dialog-content d-flex'>
              {dialogData.tags?.map((tag, index) => {
                return (
                  <div className='tags' key={index}>
                    #{tag.title}
                  </div>
                );
              })}
            </DialogContentText>
            <div className='dialogImg-wrapper'>
              {dialogData.urls?.regular ? (
                <img
                  className='searchImg dialogImg'
                  src={dialogData.urls?.regular}
                  // height={100}
                  // width={200}
                />
              ) : (
                <Skeleton
                  style={{ filter: 'invert(1)' }}
                  className='searchImg dialogImg'
                  variant='rect'
                />
              )}
              <a href={dialogData.links?.download} download>
                <DownloadIcon
                  style={{
                    position: 'absolute',
                    top: '40px',
                    right: '0',
                    color: 'red',
                    cursor: 'pointer',
                  }}
                />
              </a>
            </div>
            <p className='m-3'>
              <FavoriteIcon style={{ color: '#dc3545' }} /> {dialogData.likes}{' '}
              likes
            </p>
            <DialogContentText className='dialog-content d-flex mb-2 mt-5'>
              Photo Downloads Statistics
            </DialogContentText>
            <Charts
              data={photoStatistics.downloads?.historical.values}
              xLabel='date'
              yLabel='value'
            />
          </DialogContent>
          <div className='w-25 dialog-right-wrapper'>
            <p className='dialog-content pt-2'>User Details</p>
            <p className='d-flex justify-content-evenly align-items-center'>
              {dialogData.user?.profile_image.medium ? (
                <img
                  className='user-img'
                  src={dialogData.user?.profile_image.medium}
                />
              ) : (
                <Skeleton
                  style={{ filter: 'invert(1)' }}
                  className='user-img'
                  variant='circle'
                />
              )}
              <span className='w-50'>{dialogData.user?.name}</span>
            </p>
            {dialogData.user?.bio && <p>Bio: {dialogData.user?.bio}</p>}
            {dialogData.user?.location && (
              <p className='user-location'>{dialogData.user?.location}</p>
            )}
            {dialogData.user?.total_photos && (
              <p>
                Total Photos:{' '}
                <span className='user-photo-count'>
                  {dialogData.user?.total_photos}
                </span>
              </p>
            )}
            <TwitterIcon
              onClick={() =>
                window.open(dialogData.user?.social?.twitter_username)
              }
            />
            <InstagramIcon
              onClick={() =>
                window.open(
                  'https://www.instagram.com/' +
                    dialogData.user?.social?.instagram_username
                )
              }
            />
            <LanguageIcon
              onClick={() =>
                window.open(dialogData.user?.social?.portfolio_url)
              }
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SearchResult;
