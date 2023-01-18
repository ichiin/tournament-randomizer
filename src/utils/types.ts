export interface PlayerApiType {
  avatar: string;
  isSeeded: boolean;
  name: string;
}

export interface PlayerType extends PlayerApiType {
  isSeeded: boolean;
}
