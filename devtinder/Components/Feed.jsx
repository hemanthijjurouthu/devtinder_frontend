import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import {BASE_URL} from '../utils/Constants';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  console.log(feed?.[0]);

  const fetchFeed = async () => {
    try{
        const res = await axios.get(BASE_URL + "/feed",
            {withCredentials : true});
        console.log(res.data);
        dispatch(addFeed(res.data));
    }
    catch(err)
    {
        console.log("ERROR :",err.message);
    }
  }
  useEffect(() => {
    fetchFeed();
  },[]);

  if(!feed)
  {
    return;
  }
  if(feed.length <= 0)
  {
    return(
      <div className="flex justify-center my-10">
        <h1>No Users Found</h1>
      </div>
    );
  }

  return (
    feed && (
        <div className="flex justify-center my-10">
            <UserCard user={feed[0]}/>
        </div>
    )
  );
}

export default Feed

