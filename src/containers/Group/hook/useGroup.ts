import { useLocation } from 'react-router-dom';
import { TournamentType, CSVGameResultType } from 'types';
import Papa from 'papaparse';
import { getTournament, uploadGameResult } from 'api/database';

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

  const parseFile = async ({
    file,
    gameId,
    groupId,
    setTournament,
    tournamentId,
  }: {
    file: File;
    gameId: number;
    groupId: number;
    setTournament: Function;
    tournamentId: number;
  }) => {
    Papa.parse(file, {
      header: true,
      complete: async function (results) {
        const gameResult: CSVGameResultType[] = results.data
          .map((row: any) => {
            console.log(row);
            return {
              KillCount: parseInt(row.KillCount),
              PlayerName: row.PlayerName,
              Rank: parseInt(row.Rank),
              TeamId: parseInt(row.TeamID),
              TotalHurt: parseInt(row.TotalHurt),
            };
          })
          .filter((row) => row.PlayerName);
        await uploadGameResult({ gameResult, gameId, groupId });
        const tournament = await getTournament({ id: tournamentId });
        setTournament(tournament);
      },
    });
  };

  return {
    group,
    parseFile,
    results,
  };
};

export default useGroup;
