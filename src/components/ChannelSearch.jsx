import React, {useState, useEffect } from 'react'; 
import { useChatContext } from 'stream-chat-react';
import { ResultsDropdown } from './';

import { SearchIcon } from '../assets';


//Channel Search Component
const ChannelSearch = ({ setToggleContainer }) => {
    const { client, setActiveChanel } = useChatContext();
    //set a state query as empty string, in order to get the information the user wants to search introducing a string into the input field.
    const [query, setQuery] = useState('');
    //set a state loading as false. it will change when the input field is active.
    const [loading, setLoading] = useState(false);
    //set a state TeamChannels as empty array, it will be reset when the channels have been query within the database.
    const [teamChannels, setTeamChannels] = useState([]);
    //set a state directChannels as empty array, it will be reset when the users have been query within the database.
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {
        //query is set with the onChange() called back in the input field.
        //logic: if the query doesn't exist, just set the states (of channels and direct messages) to the default value.
        if(!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
    }, [query])

    //getChannels function will get all the existing channels the user is looking for into the input field.
    //the text prop will be set with the onChange() that is called back with the search input
    const getChannels = async (text) => {
        try{
            //here we query the channels in the database. with the method queryChannels, which is part of the useContextChat(API)
            const channelResponse = client.queryChannels({
                //this are the options we are setting into the search.
                type: 'team', 
                name: { $autocomplete: text },
                members: { $in: [client.userID]}
            });
            // here we query the users within the database
            const userResponse = client.queryUsers({
                //the options we set to check in the query
                id: { $ne: client.userID }, //$ne exclude the current active user.
                name: { $autocomplete: text } // we want to get all the names.
            })

            //we want to fetch the users and the channels at the same time, so we put both querys into the same promise.
            //the promise.all lets to start the both querys at the same time, making it more effective and quicker
            const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

            //logic: if channels exist (channels.length) -> set the state TeamChannels equal to channels.
            //logic: if Users exist (users.length) -> set the state DirectChannels equal to users.
            if(channels.length) setTeamChannels(channels);
            if(users.length) setDirectChannels(users);
        } catch (error) {
            //if there is an error just reset the query state to the default value ('')
            setQuery('')
        }
    }

    //onSearch function will be called when the input field is modified.    
    const onSearch = (event) => {
        //it prevent the input format to pass the data in its default format.
        event.preventDefault();
        //it will change the loading state to true.
        setLoading(true);
        //it will set the query state to any input the user introduces
        setQuery(event.target.value);
        //it will passes the input data to the getChannels function.
        getChannels(event.target.value);
    }
    //setChannel is a function which takes a channel as property and reset query state as an empty string
    //it also set the channel as the active channel.
    const setChannel = (channel) => {
        setQuery('');
        setActiveChanel(channel);
    }


    /* it will render :
    - a <searchiIcon /> component, that works basically as an icon magnifying glass(lens). 
    - a <input> tag, it works as a text holder, and it calls back the onChange function, which 
        will restate the query and loading states and also will pass the string that will work as a property for the getChannels(text)
    - a <ResultsDropdown /> component, it displays the results from the search.
        logic: if query exists -> render the <ResultsDropdown /> component
        it takes (and passes) the following properties: teamChannels(state), directChannels(state)
        loading(state), setChannel(function), setQuery(function), setToogleContainer(function) 
    */
    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input
                className="channel-search__input__text"
                placeholder="Search"
                type="text"
                value={query}
                onChange={onSearch} />
            </div>
            { query && (
                <ResultsDropdown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer} 
                />
            )}
        </div>
    )
}

export default ChannelSearch;
