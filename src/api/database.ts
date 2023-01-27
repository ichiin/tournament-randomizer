import axios from 'axios';
import { CSVGameResultType } from 'types';

const BASE_ENDPOINT = 'http://localhost:5000';

export const getTournament = async ({ id }: { id: number }) => {
  const tournament = await axios.get(`${BASE_ENDPOINT}/tournament/${id}`);
  return tournament.data;
};

export const getTournaments = async () => {
  const tournaments = await axios.get(`${BASE_ENDPOINT}/tournaments`);
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
    `${BASE_ENDPOINT}/gameresult`,
    {
      gameResult,
      gameId,
      groupId,
    },
    { headers: { 'Content-Type': 'application/json' } }
  );
};
