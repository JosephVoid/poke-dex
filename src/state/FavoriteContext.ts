import { createContext } from 'react';

export interface IPokeState {
  id: string,
  name: string,
  picture: string
}

export const FavContext = createContext({
  favPoke: [] as IPokeState[],
  setFavePoke: (favList:IPokeState[]) => {}
});