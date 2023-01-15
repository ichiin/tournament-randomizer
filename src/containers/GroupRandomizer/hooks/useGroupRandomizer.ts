import { useState } from "react";

const useGroupRandomizer = () => {
    const [playerInput, setPlayerInput] = useState('');
    const [playerList, setPlayerList] = useState<string[]>([]);

    const addPlayersToList = () => {
        const playersArray = playerInput.split('\n');
        const hasMultiplePlayers = playersArray.length > 1;
        if(hasMultiplePlayers){
            setPlayerList([...playerList, ...playersArray]);
        }else{
            setPlayerList([...playerList, playerInput])
        }
        setPlayerInput('')
    }

    return {
        addPlayersToList,
        playerInput,
        playerList,
        setPlayerInput,
    }
}

export default useGroupRandomizer;