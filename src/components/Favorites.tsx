import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FavContext } from "../state/FavoriteContext";

interface IFavorite {
  picture: string,
  name: string
}

export default function Favorites (props: IFavorite) {
  
  const [isOnEdit, setIsOnEdit] = useState(false)
  const {favPoke, setFavePoke} = useContext(FavContext)
  const [name, setName] = useState(props.name)
  /*
    handleChange
    ---------
    Handles when the favorite is being edited.
    Once doen it will handle saving the name
  */
  const handleChange = () => {
    if (isOnEdit) {
      let copyFav = [...favPoke]
      let objIndex = copyFav.findIndex((fP => fP.name === props.name))
      copyFav[objIndex].name = name
      setFavePoke(copyFav)
    }
    setIsOnEdit(!isOnEdit)
  }

  return (
    <div className='sidebar-control'>
      <Card.Img variant="top" src={props.picture} />
      <Card.Body>
        {
          isOnEdit 
          ? <Form.Control type="text" id={props.name} value={name} size='sm' onChange={(e) => setName(e.target.value)}/> 
          : <Card.Title>{props.name}</Card.Title>
        }
        <Button size='sm' variant="dark" onClick={() => handleChange()} style={{'marginTop':'0.25em'}}> 
          <FontAwesomeIcon icon={isOnEdit ? faSave : faEdit}/> {isOnEdit ? 'Save' : 'Edit Name'}
        </Button>
      </Card.Body>
    </div>
  )  
}