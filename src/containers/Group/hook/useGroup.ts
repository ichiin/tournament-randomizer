import { useLocation } from 'react-router-dom';
import { TournamentType } from 'types';

interface useGroupProps {
  tournament: TournamentType;
}

const useGroup = ({ tournament }: useGroupProps) => {
  const { pathname } = useLocation();
  const splitPath = pathname.split('/');
  // Last element of the URL is the group id
  const groupId = Number.parseInt(splitPath[splitPath.length - 1]);
  const group = tournament.groups?.find((group) => group.id === groupId);
  const results =
    group?.standings.map((player) => {
      return {
        name: player.playerName,
        score: player.score,
      };
    }) || [];

  return {
    group,
    results,
  };
};

export default useGroup;
