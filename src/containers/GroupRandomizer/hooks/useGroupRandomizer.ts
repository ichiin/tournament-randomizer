import { PlayerApiType, PlayerType } from "utils/types";
import { useEffect, useState } from "react";

import { getRegistratedPlayers } from "containers/api";

const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const useGroupRandomizer = () => {
  const [playerInput, setPlayerInput] = useState("");
  const [playerList, setPlayerList] = useState<PlayerType[]>([]);
  const [playersGeneratedGroup, setPlayersGeneratedGroup] = useState<
    PlayerType[][]
  >([]);
  const [groupSize, setGroupSize] = useState<number>(16);

  const addPlayersToList = () => {
    const playersNames = playerInput.split("\n");
    const players: PlayerType[] = playersNames.map((name) => {
      return { avatar: "def", isSeeded: false, name };
    });
    setPlayerList([...playerList, ...players]);
    setPlayerInput("");
  };

  const generateGroups = () => {
    const shuffledPlayersList = shuffleArray([...playerList]);
    let generatedGroups: PlayerType[][] = [];
    if (groupSize) {
      for (let i = 0; i < shuffledPlayersList.length; i += groupSize) {
        const group = shuffledPlayersList.slice(i, i + groupSize);
        generatedGroups.push(group);
      }
    }
    console.log(generatedGroups);
    setPlayersGeneratedGroup(generatedGroups);
  };

  const toggleIsSeeded = ({ avatarURL }: {avatarURL: string}) => {
    const clonedPlayerList = [...playerList];
    const newPlayerList = clonedPlayerList.map(player => {
      let currentPlayer = {...player}
      if(currentPlayer.avatar === avatarURL){
        currentPlayer.isSeeded = !currentPlayer.isSeeded;
      }
      return currentPlayer;
    })
    setPlayerList(newPlayerList)
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      console.log("getting the list of players from the provided channel...");
      const discordPlayers = await getRegistratedPlayers();
      const players = discordPlayers.map((player: PlayerApiType) => {
        return {
          avatar: player.avatar,
          isSeeded: false,
          name: player.name,
        };
      });
      setPlayerList(players);
    };
    fetchPlayers();
  }, []);

  return {
    addPlayersToList,
    generateGroups,
    groupSize,
    playersGeneratedGroup,
    playerInput,
    playerList,
    setGroupSize,
    setPlayerInput,
    toggleIsSeeded
  };
};

export default useGroupRandomizer;
