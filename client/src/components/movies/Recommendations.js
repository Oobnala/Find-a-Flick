import React from 'react';
import './Details.less';
import { List, Divider, Typography } from 'antd';

const { Title, Text, Link } = Typography;

const Recommendations = ({ similarMovies }) => {
  return (
    <div className='similar-movies-container'>
      <div className='divider-container'>
        <Divider>
          <Title>Recommendations</Title>
        </Divider>
      </div>
      <List
        className='list'
        itemLayout='horizontal'
        dataSource={similarMovies}
        renderItem={movie => (
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
        )}
      />
    </div>
  );
};

export default Recommendations;
