import React from 'react'

import { AddChannel } from '../assets'

//TeamChannelList component.
//get the states we created on the root of the app (app.jsx)
//alse we are goona use children, error, loading and type properties that every custom component has.
const TeamChannelList = ({ children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    //if there is an error return. an error message.
    if(error) {
        return type === 'team' ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null;
    }

    //if it's loading return loading... message.
    if(loading) {
        return (
            <div className='team-channel-list'>
                <p className='team-channel-list__message loading'>
                    { type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }
  
    /* TeamChannelList is a component that is called by a propertie of ChannelList(Stream component to create channel lists)
    and it will render: 
        a <p> tag with a name of (Channels or Direct Messages, depending on the type of the TeamChannelList component)
        it will also render an <AddChannel /> component, which works as a button to create a new channel or a new direct message.
    */
    return (
        <div className="team-channel-list">
            <div className='team-channel-list__header'>
                <p className='team-channel-list__header__title'></p>
                { type === 'team'? 'Channels' : 'Direct Messages' }
                <AddChannel 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    type={type === 'team' ? 'team' : 'messaging'}
                    setToggleContainer={setToggleContainer}
                />
            </div>
            {children}
        </div>
  )
}

export default TeamChannelList
