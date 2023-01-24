import { getTournaments } from 'api/database';
import { useEffect, useState } from 'react';

const useApp = () => {
  const [tournament, setTournament] = useState({});
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournament = async () => {
      setTournaments(await getTournaments());
    };
    fetchTournament();
  }, []);

  return {
    setTournament,
    tournament,
    tournaments,
  };
};

export default useApp;
