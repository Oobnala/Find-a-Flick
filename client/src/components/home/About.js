import React from 'react';
import './Home.less';
import background from '../../images/jeremy-yap-J39X2xX_8CQ-unsplash.jpg';
import { Typography } from 'antd';

const { Title } = Typography;

const About = () => {
  return (
    <div className='about-container'>
      <div className='about-header'>
        <img className='background-photo' src={background} alt='' />
        <div className='title-container'>
          <div className='photo-attribution'>
            <span>
              Photo by &nbsp;
              <a href='https://unsplash.com/@jeremyyappy?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'>
                Jeremy Yap
              </a>
              &nbsp; &nbsp; on &nbsp;
              <a href='https://unsplash.com/s/photos/movie?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'>
                Unsplash
              </a>
            </span>
          </div>
          <Title className='about-title'>Find-a-Flick</Title>
          <div className='tmdb-attribution'>
            <img
              className=''
              alt=''
              src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
            />
          </div>
        </div>
      </div>
      <div className='about-body'>
        <Title>About</Title>
        Find-a-Flick is a React web application for users to search movies and
        create a watchlist. Individual movie information is available to users
        which includes movie details, cast information, and recommendations.
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </div>
    </div>
  );
};

export default About;
