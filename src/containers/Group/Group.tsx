import * as htmlToImage from 'html-to-image';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from '@mui/material';

import { Button } from 'components';
import { TournamentType } from 'types';
import { colors } from 'utils/colors';
import styled from '@emotion/styled';
import useGroup from './hook/useGroup';
import { useNavigate } from 'react-router-dom';
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
  const { group, parseFile, results } = useGroup({ tournament });
  const { t } = useTranslation();
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
                    {group.games.map((game) => (
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
                      {group.games.map((game) => (
                        <TableCell
                          key={`score-game-${game.id}-player-${player.name}`}
                        >
                          {game.standings.find(
                            (gamePlayer) =>
                              gamePlayer.playerName === player.name
                          )
                            ? game.standings.find(
                                (gamePlayer) =>
                                  gamePlayer.playerName === player.name
                              )?.score
                            : t('Group.playerMissing')}
                        </TableCell>
                      ))}
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
