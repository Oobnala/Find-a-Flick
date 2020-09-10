import React from 'react';
import { connect } from 'react-redux';
import {
  addToWatchlist,
  deleteFromWatchlist,
  loadWatchlist
} from '../../redux/actions/userActions';
import { Typography, Tag, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './Details.less';
import StarRatings from 'react-star-ratings';

const { Title, Text } = Typography;

class Info extends React.Component {
  state = {
    watchlist: false
  };

  componentDidMount() {
    this.load();
  }

  load = () => {
    if (this.props.isLoggedIn) {
      console.log('load');
      this.props.loadWatchlist().then(() => {
        this.checkWatchlist(this.props.movieDetails.id);
      });
    }
  };

  checkWatchlist = movieId => {
    if (this.props.watchlist) {
      let index = this.props.watchlist.findIndex(
        movie => movie.key === movieId,
        1
      );
      if (index > -1) {
        this.setState({
          watchlist: true
        });
      }
    }
  };

  numberWithCommas = value => {
    return value.toLocaleString();
  };

  convertDate = d => {
    let date = new Date(d);
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate() + 1;
    let year = date.getFullYear();
    let releaseDate = month + ' ' + day + ', ' + year;
    return <Text className='info-text'>{releaseDate} | </Text>;
  };

  renderGenres = genres => {
    return genres.map((genre, index) => {
      return (
        <Tag className='genres' color='#1DA57A' key={index}>
          {genre.name}
        </Tag>
      );
    });
  };

  getLanguages = languages => {
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

  addToList = (id, poster_path, title) => {
    this.props.addToWatchlist(id, poster_path, title);
    this.setState({
      watchlist: true
    });
  };

  deleteFromList = id => {
    this.props.deleteFromWatchlist(id);
    this.setState({
      watchlist: false
    });
  };

  render() {
    const {
      id,
      backdrop_path,
      poster_path,
      title,
      runtime,
      release_date,
      genres,
      vote_average,
      overview,
      spoken_languages,
      revenue,
      budget
    } = this.props.movieDetails;
    return (
      <div className='movie-info-container'>
        {backdrop_path && (
          <img
            alt=''
            className='movie-backdrop'
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          />
        )}
        <div className='movie-details'>
          <div>
            {poster_path && (
              <img
                alt=''
                className='movie-poster'
                src={
                  poster_path ? (
                    `https://image.tmdb.org/t/p/original/${poster_path}`
                  ) : (
                    <Text>Loading...</Text>
                  )
                }
              />
            )}
          </div>
          <div className='details-main-container'>
            {this.props.isLoggedIn && (
              <div>
                {this.state.watchlist ? (
                  <Button
                    type='primary'
                    className='watchlist-button'
                    icon={<MinusOutlined />}
                    onClick={() => this.deleteFromList(id)}
                  >
                    Watchlist
                  </Button>
                ) : (
                  <Button
                    type='primary'
                    className='watchlist-button'
                    icon={<PlusOutlined />}
                    onClick={() => this.addToList(id, poster_path, title)}
                  >
                    Watchlist
                  </Button>
                )}{' '}
              </div>
            )}

            <Title style={{ margin: 0, color: 'white' }}>{title}</Title>
            <div>
              <Text className='info-text'>{runtime + ' mins | '}</Text>
              {this.convertDate(release_date)}
              {this.renderGenres(genres)}
            </div>
            <div className='rating-container'>
              <StarRatings
                style={{ marginRight: 10 }}
                rating={vote_average}
                numberOfStars={10}
                starRatedColor='#1DA57A'
                starDimension='20px'
                starSpacing='5px'
              />
              <Text className='rating-value'>({vote_average})</Text>
            </div>
            <Text className='info-text'>{overview}</Text>
            <div className='details-container'>
              <Title style={{ color: 'white', marginTop: 20 }} level={3}>
                Details
              </Title>
              <Text className='info-text'>
                Director(s): {this.props.directors.join(', ')}
              </Text>
              <div>
                <Text className='info-text'>
                  Available Languages: {this.getLanguages(spoken_languages)}
                </Text>
              </div>
              <div>
                {revenue !== 0 ? (
                  <Text className='info-text'>
                    {'Revenue: $' + this.numberWithCommas(revenue)}
                  </Text>
                ) : (
                  <Text className='info-text'>Revenue: N/A </Text>
                )}
              </div>
              <div>
                {budget !== 0 ? (
                  <Text className='info-text'>
                    {'Budget: $' + this.numberWithCommas(budget)}
                  </Text>
                ) : (
                  <Text className='info-text'>Budget: N/A</Text>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  watchlist: state.user.watchlist
});

export default connect(
  mapStateToProps,
  { addToWatchlist, deleteFromWatchlist, loadWatchlist }
)(Info);
