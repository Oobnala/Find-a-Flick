import React from 'react';
import { isEmpty } from 'lodash';
import './Home.less';
import { connect } from 'react-redux';
import { fetchMovies } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import { Card, Pagination, Typography, Space, Spin } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

class MovieList extends React.Component {
  state = {
    loading: false
  };

  toMovieDetails = movieId => {
    this.props.history.push(`/listing/${movieId}`);
  };

  convertDate = d => {
    let date = new Date(d);
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate() + 1;
    let year = date.getFullYear();
    let releaseDate = month + ' ' + day + ', ' + year;
    return (
      <Paragraph style={{ fontSize: 14 }} className='info-text'>
        {releaseDate}
      </Paragraph>
    );
  };

  renderCircleRating = rating => {
    if (rating < 5.5) {
      return (
        <div className='circle-rating' style={{ backgroundColor: 'red' }}>
          {rating}
        </div>
      );
    } else if (rating >= 5.5 && rating < 7.5) {
      return (
        <div className='circle-rating' style={{ backgroundColor: '#fcd303' }}>
          {rating}
        </div>
      );
    } else if (rating >= 7.5 && rating <= 10.0) {
      return (
        <div className='circle-rating' style={{ backgroundColor: '#5efc03' }}>
          {rating}
        </div>
      );
    } else {
      return (
        <div className='circle-rating' style={{ backgroundColor: 'grey' }}>
          N/A
        </div>
      );
    }
  };

  getPoster = () => {
    if (isEmpty(this.props.movies)) {
      return (
        <Space>
          <Spin size='large' />
        </Space>
      );
    }

    let listedMovies = this.props.movies;

    return listedMovies.map((movie, index) => {
      let poster = movie.poster_path;
      let title = movie.title;
      let rating = movie.vote_average;
      let date = movie.release_date;
      let id = movie.id;
      return (
        <div key={index} className='movie-card-container'>
          <Card
            key={index}
            className='movie-card'
            hoverable
            loading={this.state.loading}
            bordered={false}
            onClick={() => this.toMovieDetails(id)}
            cover={
              poster ? (
                <div className='movie-poster-container'>
                  <img
                    className='poster'
                    alt=''
                    src={`https://image.tmdb.org/t/p/original/${poster}`}
                  />
                  {this.renderCircleRating(rating)}
                </div>
              ) : (
                <div className='blank-movie-poster'>
                  <CameraOutlined className='camera-icon' />
                  <Paragraph className='no-image'>No Image</Paragraph>
                  {this.renderCircleRating(rating)}
                </div>
              )
            }
          >
            <Meta
              className='meta'
              title={<Title level={4}>{title}</Title>}
              description={this.convertDate(date)}
            />
          </Card>
        </div>
      );
    });
  };

  changePage = page => {
    this.setState({
      loading: true
    });
    this.props.fetchMovies(this.props.term, page).then(() => {
      this.setState({
        loading: false
      });
      window.scrollTo(0, 400);
    });
  };

  render() {
    return (
      <div>
        <div className='container-flexbox-MovieList'>
          {this.state.loading ? (
            <div className='spin-container'>
              <Space>
                <Spin size='large' />
              </Space>
            </div>
          ) : (
            this.getPoster()
          )}
        </div>
        <div className='pagination'>
          <Pagination
            current={this.props.page}
            pageSize={20}
            total={this.props.totalResults}
            onChange={page => {
              this.changePage(page);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: Object.values(state.movies.movies),
    term: state.movies.term,
    totalResults: state.movies.totalResults,
    page: state.movies.page
  };
};

MovieList = connect(
  mapStateToProps,
  { fetchMovies }
)(MovieList);

export default withRouter(MovieList);
