import React from 'react';
import Avatar from '../Avatar/Avatar';
import { Icon } from 'antd';
import { Storage } from 'aws-amplify';
import moment from 'moment';
import PostOptions from '../PostOptions/PostOptions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSection = styled.section`
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  padding: 0;
  margin: 10px auto;
  max-width: 600px;
`;

const StyledDiv = styled.div`
  height: 60px;
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const StyledH3 = styled.h3`
  padding: 0 15px;
  margin: 0;
`;

const StyledTimestamp = styled.p`
  color: grey;
  font-size: 11px;
  margin: 12px 10px 6px;
`;

const StyledIcon = styled(Icon)`
  font-size: 24px;
  margin: 0 8px;
  color: #5c5c5c;
`;


function FoodCard({ id, imgUrl, likes, hearts, userData, createdAt, loggedInUserData}) {
  const [imgKey, changeImgKey] = React.useState('');
  
  React.useEffect(() => {
    Storage.get(imgUrl).then(d => changeImgKey(d)).catch(err => console.log(err));
  }, [imgUrl])
  
  const handleLike = e => {
    console.log(`Liking post ${id}`);
  }
  
  return (
    <StyledSection className="wrapper">
      <StyledDiv>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Avatar img={userData.photoUrl}  username={userData.username} />
          <Link to={`/user/${userData.username}`}>
            <StyledH3>{userData.username}</StyledH3>
          </Link>
        </div>
        <PostOptions 
          userData={userData} 
          id={id} imgKey={imgKey} 
          loggedInUserData={loggedInUserData}
        />
      </StyledDiv>
      <img src={imgKey} alt={imgUrl} style={{width: '100%'}} />
      <div style={{padding: '15px'}}>
        <button onClick={handleLike} style={{border: 0, padding: 0, outline: 0}}>
          <StyledIcon 
            type="heart" 
            theme={true ? null : "twoTone"} 
            twoToneColor="salmon" 
          />
        </button>
        <StyledIcon type="message" />
        <StyledIcon type="upload" />
        <StyledTimestamp>{moment(createdAt).fromNow().toUpperCase()}</StyledTimestamp>
      </div>
    </StyledSection>
  )
}


export default FoodCard;
