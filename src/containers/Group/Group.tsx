import * as htmlToImage from 'html-to-image';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from '@mui/material';
import { GameType, TournamentType } from 'types';

import { Button } from 'components';
import { NUMBER_GROUPED_GAMES } from 'utils/config';
import { colors } from 'utils/colors';
import styled from '@emotion/styled';
import useGroup from './hook/useGroup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const download = require('downloadjs');

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: colors.lilyWhite,
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.dustyRed,
    color: colors.lilyWhite,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ResultContainer = styled.div`
  margin-top: 100px;
`;

interface GroupProps {
  setTournament: Function;
  tournament: TournamentType;
}

const Group = ({ setTournament, tournament }: GroupProps) => {
  const { group, groupedGames, parseFile, results } = useGroup({ tournament });
  const { t } = useTranslation();
  const [groupGames, setGroupGames] = useState(true);
  const navigate = useNavigate();

  const navigateToGameResult = ({ gameId }: { gameId: number }) => {
    if (tournament.id && group?.id && gameId) {
      navigate(
        t('GameResult.to', {
          tid: tournament.id,
          gid: group.id,
          rid: gameId,
        }) || ''
      );
    }
  };

  const getPlayerGameCell = (game: GameType, playerName: string) => {
    return (
      <TableCell key={`score-game-${game.id}-player-${playerName}`}>
        {game.standings.find(
          (gamePlayer) => gamePlayer.playerName === playerName
        )
          ? game.standings.find(
              (gamePlayer) => gamePlayer.playerName === playerName
            )?.score
          : t('Group.playerMissing')}
      </TableCell>
    );
  };

  const getStandingsHeaders = (games: GameType[]) => {
    let startId = 1;
    let endId = startId + (NUMBER_GROUPED_GAMES - 1);
    let headers = games
      .map((game) => {
        if (game.id === endId) {
          const header = (
            <StyledTableCell key={`header-game-${game.id}`}>
              {t('Group.game', { id: `${startId}-${endId}` })}
            </StyledTableCell>
          );
          startId = endId + 1;
          endId = startId + (NUMBER_GROUPED_GAMES - 1);
          return header;
        } else return null;
      })
      .filter((header) => header);
    const nbRemainingGames = games[games.length - 1]?.id % NUMBER_GROUPED_GAMES;
    if (nbRemainingGames > 0) {
      const remainingGames = games.slice(-nbRemainingGames);
      const remainingHeaders = remainingGames.map((game) => (
        <StyledTableCell key={`header-game-${game.id}`}>
          {t('Group.game', { id: `${game.id}` })}
        </StyledTableCell>
      ));
      headers = [...headers, ...remainingHeaders];
    }
    return headers;
  };

  return (
    <>
      {group && (
        <div>
          <h1>{group.name}</h1>
          <br />
          <h2>{t('Group.games')}</h2>
          {group.games.map((game) => (
            <Button
              key={game.id}
              onClick={() => navigateToGameResult({ gameId: game.id })}
            >
              {t('Group.game', { id: game.id })}
            </Button>
          ))}
          <input
            accept='.csv'
            onChange={(e) => {
              if (e.target.files)
                parseFile({
                  file: e.target.files[0],
                  gameId: group.games.length + 1,
                  groupId: group.id,
                  setTournament,
                  tournamentId: tournament.id!,
                });
            }}
            type='file'
          />
          <ResultContainer>
            <Button
              onClick={() => {
                htmlToImage
                  .toPng(document.getElementById('result-table')!)
                  .then(function (dataUrl) {
                    download(dataUrl, 'results.png');
                  });
              }}
            >
              {t('Group.downloadButton')}
            </Button>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onChange={(event) => setGroupGames(event.target.checked)}
                    sx={{ color: colors.lilyWhite }}
                    value={groupGames}
                  />
                }
                label={t('Group.groupGamesCheckbox')}
                sx={{ color: colors.lilyWhite }}
              />
            </FormGroup>
            <TableContainer id='result-table' style={{ overflow: 'hidden' }}>
              <Table
                size='small'
                sx={{ minWidth: 650 }}
                aria-label='simple table'
              >
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>{t('Group.tableRank')}</StyledTableCell>
                    <StyledTableCell>{t('Group.tableName')}</StyledTableCell>
                    {groupedGames && groupGames
                      ? getStandingsHeaders(group.games)
                      : group.games.map((game) => (
                          <StyledTableCell key={`header-game-${game.id}`}>
                            {t('Group.game', { id: game.id })}
                          </StyledTableCell>
                        ))}
                    <StyledTableCell>Score</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {results.map((player, index) => (
                    <StyledTableRow
                      key={player.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {`#${index + 1}`}
                      </TableCell>
                      <TableCell>{player.name}</TableCell>
                      {groupedGames &&
                        groupGames &&
                        groupedGames.map((group) => {
                          return (
                            <TableCell key={`score-game-player-${player.name}`}>
                              {
                                group.find(
                                  (gameStanding) =>
                                    gameStanding.playerName === player.name
                                )?.score
                              }
                            </TableCell>
                          );
                        })}
                      {group.games
                        .map((game) => {
                          const lastGameId =
                            group.games[group.games.length - 1]?.id;
                          const remainingGames =
                            groupedGames && lastGameId % NUMBER_GROUPED_GAMES;
                          if (
                            groupGames &&
                            groupedGames &&
                            remainingGames &&
                            remainingGames > 0
                          ) {
                            const startFromGameId = lastGameId - remainingGames;
                            if (game.id > startFromGameId) {
                              return getPlayerGameCell(game, player.name);
                            } else return undefined;
                          } else if (!groupedGames || !groupGames) {
                            return getPlayerGameCell(game, player.name);
                          }
                          return undefined;
                        })
                        .filter((game) => game)}
                      <TableCell>{player.score}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ResultContainer>
        </div>
      )}
    </>
  );
};

export default Group;
