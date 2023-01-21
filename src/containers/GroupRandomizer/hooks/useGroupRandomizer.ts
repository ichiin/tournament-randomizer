import { PlayerApiType, PlayerType } from 'utils/types';
import { useEffect, useState } from 'react';

import { getRegistratedPlayers } from 'api';

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
  const [playerInput, setPlayerInput] = useState('');
  const [playerList, setPlayerList] = useState<PlayerType[]>([]);
  const [playersGeneratedGroup, setPlayersGeneratedGroup] = useState<
    PlayerType[][]
  >([]);
  const [groupSize, setGroupSize] = useState<number>(16);
  const [seededPlayersPerGroup, setSeededPlayersPerGroup] = useState(0);

  const addPlayersToList = () => {
    const playersNames = playerInput.split('\n');
    const players: PlayerType[] = playersNames.map((name) => {
      return { avatar: 'def', isSeeded: false, name };
    });
    setPlayerList([...playerList, ...players]);
    setPlayerInput('');
  };

  const deletePlayer = ({ avatarURL }: { avatarURL: string }) => {
    const clonedPlayerList = [...playerList];
    const newPlayerList = clonedPlayerList.filter((player) => {
      let currentPlayer = { ...player };
      if (currentPlayer.avatar === avatarURL) {
        return false;
      }
      return true;
    });
    setPlayerList(newPlayerList);
  };

  const generateGroups = () => {
    const seededPlayers = [...playerList].filter((player) => player.isSeeded);
    const shuffledPlayersList = shuffleArray(
      [...playerList].filter((player) => !player.isSeeded)
    );
    const shuffledSeededPlayersList = shuffleArray(seededPlayers);
    let generatedGroups: PlayerType[][] = [];
    let regularGeneratedGroups: PlayerType[][] = [];
    let seededGeneratedGroups: PlayerType[][] = [];
    if (seededPlayersPerGroup) {
      for (
        let i = 0;
        i < shuffledSeededPlayersList.length;
        i += seededPlayersPerGroup
      ) {
        const seededGroup = shuffledSeededPlayersList.slice(
          i,
          i + seededPlayersPerGroup
        );
        seededGeneratedGroups.push(seededGroup);
      }
    }
    if (groupSize) {
      let i = 0;
      let seededPlayersIndex = 0;
      while (i < shuffledPlayersList.length) {
        const nbSeeded = seededGeneratedGroups[seededPlayersIndex].length;
        const nbPlayersToFill = groupSize - nbSeeded;
        console.log(
          'nb seeded',
          nbSeeded,
          'seededIndex',
          seededPlayersIndex,
          'nbPlayersToFill',
          nbPlayersToFill,
          'shuffled list',
          shuffledPlayersList
        );
        const filledGroup = shuffledPlayersList.slice(i, i + nbPlayersToFill);
        console.log('filled group', filledGroup);
        i += nbPlayersToFill;
        seededPlayersIndex += 1;
        regularGeneratedGroups.push(filledGroup);
      }
      regularGeneratedGroups.forEach((regularGroup, index) => {
        const seededGroup = seededGeneratedGroups[index];
        if (seededGroup) {
          generatedGroups.push([...seededGroup, ...regularGroup]);
        } else {
          generatedGroups.push(regularGroup);
        }
      });
      /*
      for (
        let i = 0;
        i < shuffledPlayersList.length;
        i += groupSize - seededPlayersPerGroup
      ) {
        const group = shuffledPlayersList.slice(
          i,
          i + groupSize - seededPlayersPerGroup
        );
        regularGeneratedGroups.push(group);
      }*/
    }
    console.log(regularGeneratedGroups, seededGeneratedGroups);
    setPlayersGeneratedGroup(generatedGroups);
  };

  const toggleIsSeeded = ({ avatarURL }: { avatarURL: string }) => {
    const clonedPlayerList = [...playerList];
    const newPlayerList = clonedPlayerList.map((player) => {
      let currentPlayer = { ...player };
      if (currentPlayer.avatar === avatarURL) {
        currentPlayer.isSeeded = !currentPlayer.isSeeded;
      }
      return currentPlayer;
    });
    setPlayerList(newPlayerList);
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      console.log('getting the list of players from the provided channel...');
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
    deletePlayer,
    generateGroups,
    groupSize,
    playersGeneratedGroup,
    playerInput,
    playerList,
    seededPlayersPerGroup,
    setGroupSize,
    setPlayerInput,
    setSeededPlayersPerGroup,
    toggleIsSeeded,
  };
};

export default useGroupRandomizer;
