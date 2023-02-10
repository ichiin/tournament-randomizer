import { useEffect, useState } from 'react'

import { getTournaments } from 'api/database'
import { useQuery } from 'react-query'

const useApp = () => {
    const [tournament, setTournament] = useState({})
    const [tournaments, setTournaments] = useState([])

    const tn = useQuery('getTournaments', getTournaments)

    console.log(tn)

    useEffect(() => {
        const fetchTournament = async () => {
            setTournaments(await getTournaments())
        }
        fetchTournament()
    }, [])

    return {
        setTournament,
        tournament,
        tournaments,
    }
}

export default useApp
