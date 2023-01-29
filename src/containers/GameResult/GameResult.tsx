import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from '@mui/material';

import { TournamentType } from 'types';
import { colors } from 'utils/colors';
import styled from '@emotion/styled';
import useGameResult from './hooks/useGameResult';
import { useTranslation } from 'react-i18next';

const ResultContainer = styled.div`
  margin-top: 100px;
`;

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.dustyRed,
    color: colors.darkJungleGreen,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: colors.lilyWhite,
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface GameResultProps {
  tournament: TournamentType;
}

const GameResult = ({ tournament }: GameResultProps) => {
  const { game, results } = useGameResult({ tournament });
  const { t } = useTranslation();
  return (
    <>
      {game && (
        <>
          <h1>{t('GameResult.title', { id: game.id })}</h1>
          <ResultContainer>
            <TableContainer>
              <Table
                size='small'
                sx={{ minWidth: 650 }}
                aria-label='simple table'
              >
                <TableHead>
                  <StyledTableRow>
                    <TableCell>{t('GameResult.tableRank')}</TableCell>
                    <TableCell>{t('GameResult.tableName')}</TableCell>
                    <TableCell>{t('GameResult.tablePlacement')}</TableCell>
                    <TableCell>{t('GameResult.tableKills')}</TableCell>
                    <TableCell>{t('GameResult.tableDamage')}</TableCell>
                    <TableCell>{t('GameResult.tableScore')}</TableCell>
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
                      <StyledTableCell>{player.rank}</StyledTableCell>
                      <StyledTableCell>{player.kills}</StyledTableCell>
                      <StyledTableCell>{player.damage}</StyledTableCell>
                      <StyledTableCell>{player.score}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ResultContainer>
        </>
      )}
    </>
  );
};

export default GameResult;
