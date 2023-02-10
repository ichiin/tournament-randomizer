import axios from 'axios'
import { BACK_ENDPOINT } from 'utils/config'

export const getRegistratedPlayers = async () => {
    try {
        const players = await axios.get(`${BACK_ENDPOINT}/registrations`)
        return players.data
    } catch (error) {
        console.log('Error retrieving players from the backend : ', error)
    }
}
