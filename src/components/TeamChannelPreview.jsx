import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

// TeamChannelPreview will use as properties some states we created in the root of the app. 
// also it will use some state that have been created by stram(API) as, setActiveChannel, activeChannel and client.
// it also will use a type propertie of a custom react component. 
const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    
    //useChatContext is a sort of useState function, but this is made by Stream(API).
    //we set the activeChannel as channel.
    //client is the current active user.(yourself)
    const { channel: activeChannel, client } = useChatContext();

    //ChannelPreview is a component that will show the existing channels available.
    //they will be render in a <p> tag with a # sign.
    const ChannelPreview = () => (
        //logic(check documentation): is there a channel active? - is there data?- give me the name or the id.
        <p className='channel-preview__item'>
            # { channel?.data?.name || channel?.data?.id }
        </p>
    );

    //DirectPreview is a component that will show the existing direct messages available.
    const DirectPreview = () => {
        //logic(check documentation): within an object check the members from the active channel, 
        //filter them and return users id but, don't return the current active user(client)
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
        return (
            <div className='channel-preview__item single'>
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.users?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.users?.id}</p>
            </div>
        )
    }    


  return (
    <div 
    className={channel?.id === activeChannel?.id 
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
    }
    onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);

        if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState)
        }
    }}
    >
        {type === 'team' ? <ChannelPreview/> : <DirectPreview />}
    </div>
  )
}

export default TeamChannelPreview;
