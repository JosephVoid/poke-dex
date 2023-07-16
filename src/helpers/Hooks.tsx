import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url:string) => axios.get(url).then(res => res.data)

function getOffsetLimt (page: number) {
  return '?offset='+(20*(page - 1))+'&limit=20'
}

export default function useGetPokemons (page: number) {
  const { data, error, isLoading } = useSWR(`https://pokeapi.co/api/v2/pokemon/${getOffsetLimt(page)}`, fetcher)
 
  return {
    pokemons: data,
    isLoading,
    isError: error
  }
}