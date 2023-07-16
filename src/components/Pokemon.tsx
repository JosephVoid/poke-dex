import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import useSWR from 'swr'

interface IPokemon {
  id: string,
  name: string,
  picture: string
}

const renderTooltip = (props:any) => (
  <Tooltip id="button-tooltip" {...props}>
    Add to Favorites
  </Tooltip>
);

export default function Pokemon (props:IPokemon) {
  const fetcher = (url:string) => axios.get(url).then(res => res.data)
  const { data, error, isLoading } = useSWR('https://pokeapi.co/api/v2/pokemon/'+props.name, fetcher)
  
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
              <FontAwesomeIcon icon={faStar}/>
            </OverlayTrigger>
          </div>
        </div>
      </>
    }
    </>
  )
}