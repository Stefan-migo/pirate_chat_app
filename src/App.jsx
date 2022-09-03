import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components' //clean method to import components from index.js in components folder.

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = 'bmca2yg7jxpu'; //apikey for the chat app
const authToken = cookies.get('token'); //token created by the API(stream) when a new user is signed up.

const client = StreamChat.getInstance(apiKey); //instance that connect with the stream(API), we need to pass our apikey.

//if a token exists. client will ask through the cookies for the user's data.
if(authToken) {
  //connect user it is the method we use to sign in. the api gets the cookies we ask into the object.
  client.connectUser(
    {
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}

const App = () => {
  //set some states we are gonna use inside the app
  const [ createType, setCreateType ] = useState('');
  const [ isCreating, setIsCreating ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);

  //if doesn't exist a token send the Auth (login/signup component)
  if (!authToken) return <Auth /> 

  return (
    <div className='app__wrapper'>
        <Chat client={client} theme='team light'>
            <ChannelListContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
            <ChannelContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
            />
        </Chat>
    </div>
  );
}

export default App;
