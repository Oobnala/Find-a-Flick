import React from 'react';
import { connect } from 'react-redux';
import { Typography, Tag } from 'antd';
import './Details.less';
import { addToWatchlist } from '../../redux/actions/userActions';
import StarRatings from 'react-star-ratings';
import { Button } from 'antd';
const { Title, Text } = Typography;

const numberWithCommas = value => {
  return value.toLocaleString();
};

const convertDate = d => {
  let date = new Date(d);
  let month = date.toLocaleString('default', { month: 'long' });
  let day = date.getDate() + 1;
  let year = date.getFullYear();
  let releaseDate = month + ' ' + day + ', ' + year;
  return <Text className='info-text'>{releaseDate} | </Text>;
};

const renderGenres = genres => {
  return genres.map((genre, index) => {
    return (
      <Tag className='genres' color='#1DA57A' key={index}>
        {genre.name}
      </Tag>
    );
  });
};

const getLanguages = languages => {
  let languageArray = languages
    .filter(language => language.name !== '')
    .map(language => {
      return language.name;
    });
  return languageArray.length > 1 ? (
    <Text className='info-text'>{languageArray.join(', ')}</Text>
  ) : (
    <Text className='info-text'>{languageArray}</Text>
  );
};

const Info = ({ movieDetails, addToWatchlist, isLoggedIn, directors }) => {
  return (
    <div className='movie-info-container'>
      <div>
        <img
          alt=''
          className='movie-poster'
          src={
            movieDetails.poster_path ? (
              `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`
            ) : (
              <Text>Loading...</Text>
            )
          }
        />
      </div>
      <div className='info-container'>
        {isLoggedIn && (
          <Button
            type='primary'
            className='wishlist-button'
            onClick={() => addToWatchlist(movieDetails.id)}
          >
            Add to Wishlist
          </Button>
        )}

        <Title style={{ margin: 0, color: 'white' }}>
          {movieDetails.title}
        </Title>
        <div>
          <Text className='info-text'>{movieDetails.runtime + ' mins | '}</Text>
          {convertDate(movieDetails.release_date)}
          {renderGenres(movieDetails.genres)}
        </div>
        <div className='rating-container'>
          <StarRatings
            style={{ marginRight: 10 }}
            rating={movieDetails.vote_average}
            numberOfStars={10}
            starRatedColor='#1DA57A'
            starDimension='20px'
            starSpacing='5px'
          />
          <Text className='rating-value'>({movieDetails.vote_average})</Text>
        </div>
        <Text className='info-text'>{movieDetails.overview}</Text>
        <div className='details-container'>
          <Title style={{ color: 'white', marginTop: 20 }} level={3}>
            Details
          </Title>
          <Text className='info-text'>Director(s): {directors.join(', ')}</Text>
          <div>
            <Text className='info-text'>
              Available Languages: {getLanguages(movieDetails.spoken_languages)}
            </Text>
          </div>
          <div>
            {movieDetails.revenue !== 0 ? (
              <Text className='info-text'>
                {'Revenue: $' + numberWithCommas(movieDetails.revenue)}
              </Text>
            ) : (
              <Text className='info-text'>Revenue: N/A </Text>
            )}
          </div>
          <div>
            {movieDetails.budget !== 0 ? (
              <Text className='info-text'>
                {'Budget: $' + numberWithCommas(movieDetails.budget)}
              </Text>
            ) : (
              <Text className='info-text'>Budget: N/A</Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(
  mapStateToProps,
  { addToWatchlist }
)(Info);
