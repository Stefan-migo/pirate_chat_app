import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import piratesIcon from '../assets/piratesIcon.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

//Side Bar Component
const SideBar = ({ logout }) => {
  return (
    <div className='channel-list__sidebar'>
      <div className='channel-list__sidebar__icon1'>
        <div className='icon1__inner'>
          <img src={piratesIcon} alt="Hospital" width="30" />
        </div>
      </div>
      <div className='channel-list__sidebar__icon2'>
        <div className='icon1__inner' onClick={ logout }>
          <img src={LogoutIcon} alt="logout" width="30" />
        </div>
      </div>
    </div>
  )
}

// header of the container of channel lists.
const CompanyHeader = () => {
  return (
    <div className='channel-list__header'>
      <p className='channel-list__header__text'>Pirates' Chat</p>
    </div>
  )
}

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}


// Container of the Channel Lists
const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
  const { client } = useChatContext();

  const logout = () => { //we want to clear the cookies and reload the window.
    cookies.remove('token');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('userId');
    cookies.remove('phoneNumber');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } };

  return (
    <> {/*this is a simple react fragment*/}
      <SideBar logout= {logout}/>
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList //stream component allows us to create a custom channelList. (group messages) that's why the type is team.
          filters={filters} //Object that allows us to filter some messages
          channelRenderFilterFn={customChannelTeamFilter} //function we can call and pass some filters and render the messages
          List={(listProps) => ( //it allows to render a custom list doing it with a callback function
            <TeamChannelList //this callback function will have as parameters listProps
              {...listProps}  //also it renders the TeamChannelList component with the listProps that are the props for the custom list.
              type='team'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type='team'
            />
          )}
        />
        <ChannelList //this channel list will be for direct messages
          filters={filters} 
          channelRenderFilterFn={customChannelMessagingFilter} 
          List={(listProps) => ( 
            <TeamChannelList 
              {...listProps}  
              type='messaging'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type='messaging'
            />
          )}
        />
      </div>
    </>
  );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
      <>
          <div className="channel-list__container">
            <ChannelListContent 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing} 
            />
          </div>
          <div className="channel-list__container-responsive"
              style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#b1a938"}}
          >
              <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
              </div>
              <ChannelListContent 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          </div>
      </>
  )

}

export default ChannelListContainer;
