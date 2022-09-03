import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

//we are reusing the ChannelNameInput component we create in order to create a channel.
const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault(); //it pervents the page reolads.
        //setChannelName() will re-set the state of ChannelName equals to the string introduced into the input.
        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

const EditChannel = ({ setIsEditing }) => {
    //we are calling information from the Stream(API), channel(activeChannel);
    const { channel } = useChatContext();
    //setting the state channelName equal to current channel also the function setChannelName.
    //logic: is there a channel(actualChannel)? - is there information(data) about this channel- give me the name.
    const [channelName, setChannelName] = useState(channel?.data?.name);
    //setting the state selectedUsers equals to an empty array [], also the function setSelectedUsers
    const [selectedUsers, setSelectedUsers] = useState([])

    //UpdateChannel is an Async function that will save all the changes we have done with the channel.
    const updateChannel = async (event) => {
        event.preventDefault(); //it prevents the page reloads.

        //nameChange variable checks if the user change the channelName through the input.
        //it compares the new channel name with the current channel name.
        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        /* Logic: if nameChanged is true -> use the method update from (useChatContext) on channel
        -> set the name to the new channelName -> return message Chanel name changed to.... */
        if(nameChanged) {
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`});
        }
        /* Logic: if SelectedUsers lenght is true (there are members selected) -> use the method addMembers from (useChatContext) on channel
        -> add the members to the channel */
        if(selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        // after that just reset the states to the deafult values.
        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    /* EditChannel component will render:
      - a <p> tag with the string Edit Channel as a title. 
      - a <CloseCreateChannel> component that works as a close button.
      - a <ChannelNAmeInput> componentes that works as an input. we will pass the properties channelName and setChannelName.
      - a <UserList> component that displays the users list. we pass through the property setSelectedUsers.
      - a <p> tag with the string Save changes, it works as a button, and it calls back the updateChannel function.
    */
    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default EditChannel;