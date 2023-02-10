export interface PlayerApiType {
    avatar: string
    name: string
}

export interface PlayerType extends PlayerApiType {
    isSeeded: boolean
}
