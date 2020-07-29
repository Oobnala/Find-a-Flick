import React, { useState } from 'react';
import { Divider, Typography } from 'antd';
import './Details.css';
import { Card, Button } from 'antd';

const { Meta } = Card;

const { Title } = Typography;

const renderCast = (cast, viewAll) => {
  let viewTotal = 6;

  if (viewAll) {
    viewTotal = cast.length;
  }

  return cast.slice(0, viewTotal).map((member, index) => {
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
  const [viewAll, setViewAll] = useState(false);
  return (
    <div className='actors-container'>
      <Divider>
        <Title style={{ margin: 0 }}>Cast</Title>
      </Divider>
      <Button
        type='primary'
        style={{ float: 'right' }}
        onClick={() => setViewAll(!viewAll)}
      >
        View All Actors
      </Button>
      <div className='container-actorlist'>
        {renderCast(castDetails, viewAll)}
      </div>
    </div>
  );
};

export default Actors;
