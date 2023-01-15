import { useState } from "react";

const shuffleArray = <T,>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

const useGroupRandomizer = () => {
    const [playerInput, setPlayerInput] = useState('');
    const [playerList, setPlayerList] = useState<string[]>([]);
    const [playersGeneratedGroup, setPlayersGeneratedGroup] = useState<string[][]>([]);
    const [playerNumberPerGroup, setPlayerNumberPerGroup] = useState<number>();

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

    const generateGroups = () => {
        const shuffledPlayersList = shuffleArray(playerList);
        let generatedGroups: string[][] = [];
        if(playerNumberPerGroup){
         for (let i = 0; i < shuffledPlayersList.length; i += playerNumberPerGroup) {
            const group = shuffledPlayersList.slice(i, i + playerNumberPerGroup);
            generatedGroups.push(group)
            }   
        }
        console.log(generatedGroups)
        setPlayersGeneratedGroup(generatedGroups)
    }

    return {
        addPlayersToList,
        generateGroups,
        playersGeneratedGroup,
        playerInput,
        playerList,
        playerNumberPerGroup,
        setPlayerInput,
        setPlayerNumberPerGroup
    }
}

export default useGroupRandomizer;