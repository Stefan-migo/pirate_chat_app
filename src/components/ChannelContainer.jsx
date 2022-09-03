import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, createType, setIsEditing }) => {
  //getting the states we set up on app.jsx

  if (isCreating) { //if we are creating a channel return CreateChannel component
    return (
      <div className='channel__container'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }

  if (isEditing) { // if we are edditing a channel, return EditChannel component
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

const EmptyState = () => { //when the channel has just been created, will show this EmptyState
  return (
  <div className='channel-empty__container'>
    <p className='channel-empty__first'>This is the beginning of your chat history.</p>
    <p className='channel-empty__second'>Send messages, attachments, links, emojis, and more!</p>
  </div>
  )
}
/*Channel container will have a <Channel> tag(comes with stream) as a properties it has:
- EmptyStateIndicator which is equal to the EmptyState component we created
- <messageTeam/> component, this si the chat's format(default), we can modify it or create a new one. 
inside of the channel tag, will be the <ChannelInner> component, which sets all the functionality inside of the chat.
*/
  return (
    <div className='channel__container'>
      <Channel 
        EmptyStateIndicator={ EmptyState }
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />} 
        >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
}

export default ChannelContainer;
