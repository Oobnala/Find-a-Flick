import React, { useState } from 'react';
import { Divider, Typography } from 'antd';
import './Details.less';
import { Card, Button, BackTop } from 'antd';
import { DownOutlined, UserOutlined, UpOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const renderCast = (cast, viewAll) => {
  let viewTotal = 5;

  if (viewAll) {
    viewTotal = cast.length;
  }

  return cast.slice(0, viewTotal).map((member, index) => {
    return (
      <div key={index} className='actor-card'>
        <Card
          bordered={false}
          cover={
            member.profile_path ? (
              <img
                alt=''
                src={`https://image.tmdb.org/t/p/original/${member.profile_path}`}
              />
            ) : (
              <div className='blank-actor'>
                <UserOutlined className='blank-icon' />
              </div>
            )
          }
        >
          <Meta
            className='meta'
            title={
              <div className='title-container'>
                <Paragraph className='title' level={4}>
                  {member.name}
                </Paragraph>
              </div>
            }
            description={
              <div className='character-container'>
                <Paragraph className='character'>{member.character}</Paragraph>
              </div>
            }
          />
        </Card>
        <div className='back-top'>
          <BackTop visibilityHeight={600}>
            <UpOutlined className='up-button' />
          </BackTop>
        </div>
      </div>
    );
  });
};

const Actors = ({ castDetails }) => {
  const [viewAll, setViewAll] = useState(false);
  return (
    <div className='actors-container'>
      <div className='divider-container'>
        <Divider>
          <Title>Cast</Title>
        </Divider>
      </div>

      <Button
        type='primary'
        style={{ float: 'right' }}
        onClick={() => setViewAll(!viewAll)}
      >
        View All Actors
        {viewAll ? <UpOutlined /> : <DownOutlined />}
      </Button>
      <div className='container-actorlist'>
        {renderCast(castDetails, viewAll)}
      </div>
    </div>
  );
};

export default Actors;
