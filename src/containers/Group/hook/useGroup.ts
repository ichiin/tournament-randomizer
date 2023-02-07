import { CSVGameResultType, TournamentType } from 'types';
import type { GroupType, StandingType } from 'types';
import { getTournament, uploadGameResult } from 'api/database';

import { NUMBER_GROUPED_GAMES } from 'utils/config';
import Papa from 'papaparse';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

//Function to filter games by id, startId and endId are inclusive
function filterGamesById(array: any[], startId: number, endId: number) {
  return array.filter((item) => item.id >= startId && item.id <= endId);
}

//Function to calculate total score for each player in the filtered games
function getGroupedGamesScore(group: GroupType[]) {
  let playerScores: StandingType[] = [];

  group.forEach((group) => {
    group.standings.forEach((player) => {
      let existingPlayer = playerScores.find(
        (p) => p.playerName === player.playerName
      );
      if (existingPlayer) {
        existingPlayer.score += player.score;
      } else {
        playerScores.push({
          playerName: player.playerName,
          score: player.score,
        });
      }
    });
  });

  return playerScores
    .map((player) => {
      return {
        playerName: player.playerName,
        score: Number(player.score.toFixed(1)),
      };
    })
    .sort((a, b) => b.score - a.score);
}

const getGroupedGames = ({
  group,
  nbGroupedGames,
}: {
  group: GroupType | undefined;
  nbGroupedGames: number;
}) => {
  if (group) {
    const { games } = group;
    if (games.length > nbGroupedGames) {
      let groupedGamesScores = [];
      /* Game numbers starts at 1 */
      let startGameId = 1;
      let endGameId = startGameId + (nbGroupedGames - 1);
      for (let i = 0; i < games.length + 1; i++) {
        if (i === endGameId) {
          const gamesGroup = filterGamesById(games, startGameId, endGameId);
          groupedGamesScores.push(getGroupedGamesScore(gamesGroup));
          startGameId = endGameId + 1;
          endGameId = startGameId + (nbGroupedGames - 1);
        }
      }
      return groupedGamesScores;
    }
  }
  return undefined;
};

interface useGroupProps {
  tournament: TournamentType;
}

const useGroup = () => {
  const { pathname } = useLocation();
  const splitPath = pathname.split('/');
  const tournamentId =  Number.parseInt(pathname.split('/')[pathname.split('/').length - 2]);
  const { data: tournament } = useQuery<TournamentType>('getTournament', () => getTournament({ id: tournamentId}));
  // Last element of the URL is the group id
  const groupId = Number.parseInt(splitPath[splitPath.length - 1]);

  const group = tournament.groups?.find((group) => group.id === groupId);
  const groupedGames = getGroupedGames({
    group,
    nbGroupedGames: NUMBER_GROUPED_GAMES,
  });
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
    groupedGames,
    parseFile,
    results,
  };
};

export default useGroup;
