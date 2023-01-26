import { useLocation } from 'react-router-dom';
import { TournamentType } from 'types';

interface useGroupProps {
  tournament: TournamentType;
}

const useGameResult = ({ tournament }: useGroupProps) => {
  const { pathname } = useLocation();
  const splitPath = pathname.split('/');
  // Last element of the URL is the game id
  const gameId = Number.parseInt(splitPath[splitPath.length - 1]);
  // Before that we have the group id
  const groupId = Number.parseInt(splitPath[splitPath.length - 2]);
  const game = tournament.groups
    ?.find((group) => group.id === groupId)
    ?.games.find((game) => game.id === gameId);

  return {
    game,
  };
};

export default useGameResult;
