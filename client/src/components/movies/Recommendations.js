import React, { useState } from 'react';
import './Details.less';
import { List, Divider, Typography, Button } from 'antd';

const { Title, Text, Link } = Typography;

const Recommendations = ({ similarMovies }) => {
  const [movieCount, setMovieCount] = useState(5);

  const renderMovies = movie => {
    return (
      <div>
        <List.Item>
          <img
            alt=''
            className='list-poster'
            src={
              movie.poster_path ? (
                `https://image.tmdb.org/t/p/original/${movie.poster_path}`
              ) : (
                <Text>Loading...</Text>
              )
            }
          />
          <List.Item.Meta
            title={<Link href={`/listing/${movie.id}`}>{movie.title}</Link>}
            description={movie.overview}
          />
        </List.Item>
      </div>
    );
  };

  return (
    <div className='similar-movies-container'>
      <div className='divider-container'>
        <Divider>
          <Title>Recommendations</Title>
        </Divider>
      </div>
      <div>
        <List
          className='list'
          itemLayout='horizontal'
          dataSource={similarMovies.splice(0, movieCount)}
          renderItem={movie => renderMovies(movie)}
        />
      </div>
      <div className='show-all-button-container'>
        <Button
          className='show-all'
          type='primary'
          onClick={() => setMovieCount(similarMovies.length)}
        >
          Show All
        </Button>
      </div>
    </div>
  );
};

export default Recommendations;
