import { TournamentType } from 'types';
import { getTournaments } from 'api/database'
import {useQuery} from 'react-query';

const useTournaments = () => {
    const { data: tournaments } = useQuery<TournamentType[]>('getTournaments', getTournaments);
    return { tournaments }
};

export default useTournaments;