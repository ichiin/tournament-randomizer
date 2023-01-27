import { useNavigate } from 'react-router-dom';
import { TournamentType } from 'types';
import { Button } from 'components';
import useGroup from './hook/useGroup';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  TableBody,
} from '@mui/material';

import styled from '@emotion/styled';
import { colors } from 'utils/colors';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: colors.lilyWhite,
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
  tournament: TournamentType;
}

const Group = ({ tournament }: GroupProps) => {
  const { group, parseFile, results } = useGroup({ tournament });
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {group ? (
        <div>
          <h1>{group.name}</h1>
          <br />
          <h2>Games</h2>
          {group.games.map((game) => (
            <Button
              key={game.id}
              onClick={() =>
                navigate(
                  t('GameResult.to', {
                    tid: tournament.id,
                    gid: group.id,
                    rid: game.id,
                  }) || ''
                )
              }
            >
              Game {game.id}
            </Button>
          ))}
          <label>Upload Game results below</label>
          <input
            accept='.csv'
            onChange={(e) => {
              if (e.target.files)
                parseFile({
                  file: e.target.files[0],
                  gameId: group.games.length + 1,
                  groupId: group.id,
                  tournamentId: tournament.id!,
                });
            }}
            type='file'
          />
          <ResultContainer>
            <TableContainer>
              <Table
                size='small'
                sx={{ minWidth: 650 }}
                aria-label='simple table'
              >
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Rank</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    {group.games.map((game) => (
                      <StyledTableCell>Game {game.id}</StyledTableCell>
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
                        <TableCell>
                          {game.standings.find(
                            (gamePlayer) =>
                              gamePlayer.playerName === player.name
                          )?.score || '-'}
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
      ) : (
        <p>Error fetching group</p>
      )}
    </>
  );
};

export default Group;
