import React, { useState, Suspense } from 'react';
import './App.css';
import PokiLogo from './pokidexlogo.png';
import {Badge, Button, Card, Col, Dropdown, Offcanvas, OverlayTrigger, Pagination, Row, Tooltip} from 'react-bootstrap';
import { faSortDesc, faSortAsc, faStar, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pokemon from './components/Pokemon';
import ControlledPages from './helpers/Pagination';
import useGetPokemons from './helpers/Hooks';

function App() {
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { pokemons, isLoading } = useGetPokemons(currentPage);

  const handleCloseSideBar = () => setShow(false);
  const handleShowSideBar = () => setShow(true);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


  return (
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
                  <Button variant='dark' size='sm' onClick={() => handleShowSideBar()}>View Favorites</Button>
                </Col>
                <Col md="2">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" size='sm'>
                      Pokemon Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Action</Dropdown.Item>
                      <Dropdown.Item>Another action</Dropdown.Item>
                      <Dropdown.Item>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col md="2">
                  <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic" size='sm'>
                        Sort By
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Another action</Dropdown.Item>
                        <Dropdown.Item>Something else</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col md="2">
                  <Button variant='light' size='sm'>
                  Asc. <FontAwesomeIcon icon={faSortAsc}/>
                  {/* <FontAwesomeIcon icon={faSortDesc}/> */}
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
                          pokemons.results.map((poke_data:any, index: number) => (
                            <Pokemon key={index} id={poke_data.name+'_'+index} name={poke_data.name} picture={poke_data.url}/>
                          ))
                        }
                        </Col>
                      </Row>
                      <Row>
                        <Col className='pag-control'>
                          <ControlledPages totalPages={Math.ceil(pokemons.count/20)} currentPage={currentPage} onPageChange={(num) => handlePageChange(num)}/>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <Offcanvas show={show} onHide={handleCloseSideBar}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Favorites</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Card>
                <Card.Img variant="top" src={PokiLogo} />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Button size='sm' variant="dark"> <FontAwesomeIcon icon={faEdit}/> Edit Name</Button>
                </Card.Body>
              </Card>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      }
    </div>
  );
}

export default App;
