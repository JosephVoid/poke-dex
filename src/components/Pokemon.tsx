import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import useSWR from 'swr'
import { useState, useContext } from 'react'
import { FavContext } from '../state/FavoriteContext'

interface IPokemon {
  id: string,
  name: string,
  filter: string
}

const renderTooltip = (props:any) => (
  <Tooltip id="button-tooltip" {...props}>
    Add to Favorites
  </Tooltip>
);

export default function Pokemon (props:IPokemon) {
  
  const fetcher = (url:string) => axios.get(url).then(res => res.data)
  const { data, error, isLoading } = useSWR('https://pokeapi.co/api/v2/pokemon/'+props.name, fetcher)
  const [ isfavorite, setFavorite ] = useState<boolean>(false)
  const favStyle:any = {opacity:'1',color:'gold'}
  const {favPoke, setFavePoke} = useContext(FavContext)
  
  const handleFav = () => {
    if (isfavorite) {
      let copyFav = [...favPoke].filter(pS => pS.name !== props.name)
      setFavePoke(copyFav)      
    } else {
      let copyFav = [...favPoke]
      copyFav.push({name: props.name, picture: data.sprites.front_default})
      setFavePoke(copyFav)
    }
    setFavorite(!isfavorite)
  }
  
  if (props.filter != '' && data.types.filter((t:any) => t.type.name === props.filter) == 0)
    return (<></>)
  else
    return (
      <>
      {
        isLoading ? <> LOADING... </> :
        <>
          <div className='pokemon'>
            <img src={data.sprites.front_default}/>
            <p>{props.name}</p>
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
            <p>Base Experiance: {data.base_experience}</p>
            <div className='bagde-star'>
              {data.types.map((poke_type:any, index:number) => (
                <Badge key={index} bg='dark'>{poke_type.type.name}</Badge>
              ))}
              <OverlayTrigger
                placement="right"
                delay={{ show: 150, hide: 200 }}
                overlay={renderTooltip}
              >
                <FontAwesomeIcon icon={faStar} style={isfavorite ? favStyle : {}} onClick={() => handleFav()}/>
              </OverlayTrigger>
            </div>
          </div>
        </>
      }
      </>
    )
}