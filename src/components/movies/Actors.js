import React from 'react';
import { Divider, Typography } from 'antd';
import './Details.css';
import { Card } from 'antd';

const { Meta } = Card;

const { Title } = Typography;

const renderCast = cast => {
  return cast.map((member, index) => {
    return (
      <div key={index} className='actor-card'>
        <Card
          cover={
            member.profile_path ? (
              <img
                alt=''
                src={`https://image.tmdb.org/t/p/original/${member.profile_path}`}
              />
            ) : (
              <div className='blank-poster'>Image Unavailable</div>
            )
          }
        >
          <Meta
            className='meta'
            title={member.name}
            description={member.character}
          />
        </Card>
      </div>
    );
  });
};

const Actors = ({ castDetails }) => {
  return (
    <div className='actors-container'>
      <Divider>
        <Title style={{ margin: 0 }}>Actors</Title>
      </Divider>
      <div className='container-actorlist'>{renderCast(castDetails)}</div>
    </div>
  );
};

export default Actors;
