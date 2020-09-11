import React, { useState } from 'react';
import './Details.less';
import { List, Divider, Typography, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const Recommendations = ({ similarMovies }) => {
  const [viewAll, setViewAll] = useState(false);

  const setRecommendations = () => {
    if (viewAll) {
      return similarMovies.slice(0, similarMovies.length);
    } else {
      return similarMovies.slice(0, 5);
    }
  };

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
      <div className='view-all-button-container'>
        {similarMovies.length !== 0 && (
          <Button
            className='view-all-recommendations-button'
            type='primary'
            onClick={() => setViewAll(!viewAll)}
          >
            View All Recommendations
            {viewAll ? <UpOutlined /> : <DownOutlined />}
          </Button>
        )}
      </div>
      <div className='recommendation-list'>
        <List
          className='list'
          itemLayout='horizontal'
          dataSource={setRecommendations()}
          renderItem={movie => renderMovies(movie)}
        />
      </div>
    </div>
  );
};

export default Recommendations;
