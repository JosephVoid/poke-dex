import React, { useState, Suspense } from 'react';
import './App.css';
import PokiLogo from './pokidexlogo.png';
import {Badge, Button, Card, Col, Dropdown, Form, Offcanvas, OverlayTrigger, Pagination, Row, Tooltip} from 'react-bootstrap';
import { faSortDesc, faSortAsc, faStar, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pokemon from './components/Pokemon';
import ControlledPages from './helpers/Pagination';
import useGetPokemons, {useGetPokemonTypes} from './helpers/Hooks';
import { FavContext, IPokeState } from './state/FavoriteContext';
import Favorites from './components/Favorites';

function App() {
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [favPoke, setFavePoke] = useState<IPokeState[]>([]);
  const { pokemons, isLoading } = useGetPokemons(currentPage);
  const { pokemonTypes, isLoadingTypes } = useGetPokemonTypes();

  return (
    <>
      <FavContext.Provider value={{favPoke, setFavePoke}}>
        <div>
          {
            isLoading ? 
            <> Loading </> :
            <>
              <Row>
                <Col className='title-img'>
                  <img src={PokiLogo} />
                </Col>
              </Row>
              <Row className='header-text'>
                <p>List of {pokemons.count} Available Pokemons</p>
              </Row>
              <Row>
                <Col>
                  <Row className='control-bar'>
                    <Col md="2">
                      <Button variant='dark' size='sm' onClick={() => setShow(true)}>View Favorites ({favPoke.length})</Button>
                    </Col>
                    <Col md="2">
                      <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" size='sm'>
                          Filter Pokemon Type
                        </Dropdown.Toggle>
                        <p style={{'textTransform':'capitalize', 'textAlign':'center'}}>{filter}</p>
                        <Dropdown.Menu>
                          {
                            !isLoadingTypes && pokemonTypes.results.map((pT:any) => (
                              <Dropdown.Item style={{'textTransform':'capitalize'}} onClick={() => setFilter(pT.name)}>{pT.name}</Dropdown.Item>
                            ))
                          }                      
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col md="2">
                      <Button variant='light' size='sm' onClick={() => setSortAsc(!sortAsc)}>
                        {
                          sortAsc ? <>Name Asc. <FontAwesomeIcon icon={faSortAsc}/></> : <>Name Desc. <FontAwesomeIcon icon={faSortAsc} style={{'transform':'rotate(180deg)'}}/></>
                        }
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Row>
                            <Col className='poki-grid'>
                            {
                              pokemons.results
                              .sort( sortAsc ? ((a:any, b:any) => a.name.localeCompare(b.name)) : ((a:any, b:any) => b.name.localeCompare(a.name)))
                              .map((poke_data:any, index: number) => (
                                <Pokemon key={index} id={poke_data.name+'_'+index} name={poke_data.name} filter={filter}/>
                              ))
                            }
                            </Col>
                          </Row>
                          <Row>
                            <Col className='pag-control'>
                              <ControlledPages totalPages={Math.ceil(pokemons.count/20)} currentPage={currentPage} onPageChange={(num) => setCurrentPage(num)}/>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              
              <Offcanvas show={show} onHide={() => setShow(false)}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Favorites</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {
                    favPoke.map(fP => (
                      <Favorites name={fP.name} picture={fP.picture}/>
                    ))
                  }
                </Offcanvas.Body>
              </Offcanvas>
            </>
          }
        </div>
      </FavContext.Provider>
    </>
  );
}

export default App;
