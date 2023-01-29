import { useEffect, useState } from 'react';

import { getTournaments } from 'api/database';

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
