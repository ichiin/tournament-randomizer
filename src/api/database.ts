import axios from 'axios';

export const getTournament = async ({ id }: { id: number }) => {
  const tournament = await axios.get(`http://localhost:5000/tournament/${id}`);
  return tournament.data;
};

export const getTournaments = async () => {
  const tournaments = await axios.get('http://localhost:5000/tournaments');
  return tournaments.data;
};
