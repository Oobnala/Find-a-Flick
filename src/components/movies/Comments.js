import React from 'react';
import { Divider, Typography } from 'antd';

const { Title } = Typography;

const Comments = () => {
  return (
    <div className='comments-container'>
      <Divider>
        <Title style={{ margin: 0 }}>Comments</Title>
      </Divider>
    </div>
  );
};

export default Comments;
