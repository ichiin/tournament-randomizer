import axios from 'axios';
import { CSVGameResultType } from 'types';
import { BACK_ENDPOINT } from 'utils/config';

export const getTournament = async ({ id }: { id: number }) => {
  const tournament = await axios.get(`${BACK_ENDPOINT}/tournament/${id}`);
  return tournament.data;
};

export const getTournaments = async () => {
  const tournaments = await axios.get(`${BACK_ENDPOINT}/tournaments`);
  return tournaments.data;
};

export const uploadGameResult = async ({
  gameResult,
  gameId,
  groupId,
}: {
  gameResult: CSVGameResultType[];
  gameId: number;
  groupId: number;
}) => {
  console.log(gameResult);
  await axios.post(
    `${BACK_ENDPOINT}/gameresult`,
    {
      gameResult,
      gameId,
      groupId,
    },
    { headers: { 'Content-Type': 'application/json' } }
  );
};
