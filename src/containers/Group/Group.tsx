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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.dustyRed,
    color: colors.darkJungleGreen,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: colors.lilyWhite,
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ResultContainer = styled.div`
  margin-top: 100px;
`;

interface GroupProps {
  tournament: TournamentType;
}

const Group = ({ tournament }: GroupProps) => {
  const { group, results } = useGroup({ tournament });
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
          <ResultContainer>
            <TableContainer>
              <Table
                size='small'
                sx={{ minWidth: 650 }}
                aria-label='simple table'
              >
                <TableHead>
                  <StyledTableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Score</TableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {results.map((player, index) => (
                    <StyledTableRow
                      key={player.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component='th' scope='row'>
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell>{player.name}</StyledTableCell>
                      <StyledTableCell>{player.score}</StyledTableCell>
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
