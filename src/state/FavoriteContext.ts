import { createContext } from 'react';

export interface IPokeState {
  name: string,
  picture: string
}

export const FavContext = createContext({
  favPoke: [] as IPokeState[],
  setFavePoke: ([]) => {}
});