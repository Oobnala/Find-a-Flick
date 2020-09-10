import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './User.less';
import { deleteFromWatchlist } from '../../redux/actions/userActions';
import { Typography } from 'antd';
import { Table, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Link } = Typography;

class UserProfile extends React.Component {
  toMovieDetails = movie => {
    this.props.history.push(`/listing/${movie.key}`);
  };

  delete = movie => {
    this.props.deleteFromWatchlist(movie.key);
  };

  render() {
    const columns = [
      {
        title: 'Poster',
        dataIndex: 'poster_path',
        key: 'poster_path',
        render: (poster, movie) => (
          <img
            alt=''
            onClick={() => this.toMovieDetails(movie)}
            className='watchlist-poster'
            src={`https://image.tmdb.org/t/p/original${poster}`}
          />
        )
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, movie) => (
          <Link onClick={() => this.toMovieDetails(movie)}>{title}</Link>
        )
      },
      {
        title: 'Date Added',
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: 'Action',
        key: 'action',
        render: movie => (
          <Space size='middle'>
            <Button
              shape='circle'
              icon={<DeleteOutlined />}
              onClick={() => this.delete(movie)}
            ></Button>
          </Space>
        )
      }
    ];

    return (
      <div className='watchlist-container'>
        <Title>My Watchlist</Title>
        <div className='table'>
          <Table columns={columns} dataSource={this.props.watchlist}></Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  watchlist: state.user.watchlist
});

export default connect(
  mapStateToProps,
  { deleteFromWatchlist }
)(withRouter(UserProfile));
