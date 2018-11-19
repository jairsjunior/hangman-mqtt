import React, {Component} from 'react'
import { attachModelToView } from 'rhelena';
import NavBarModel from './NavBarModel';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Logo from '../../images/logo.jpg'


export default class NavBarPrincipal extends Component {

    componentWillMount(){
        attachModelToView(new NavBarModel(this.props), this);
    }

    render() {
        return (
            <Navbar style={{ backgroundColor: 'white'}}>
            <Navbar.Header>
                <Navbar.Brand style={{ padding: '0px' }}>
                    <span style={{ display: 'inline' }}>
                        <img src={Logo} alt="Logo"
                            style={{ 
                                height: '100%',
                                lineHeight: '50px',
                                objectFit: 'contain'
                        }}>
                        </img>
                    </span>
                    <span style={{ paddingLeft: '10px', color: 'black'}}>Forca do 5 S</span>
                </Navbar.Brand>
            </Navbar.Header>
            { this.state.type != 'player' && (
                <Nav pullRight>
                    <NavDropdown eventKey={3} title="Configurações" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} onClick={() => this.viewModel.startGame()}>Iniciar Jogo</MenuItem>
                        <MenuItem eventKey={3.2} onClick={() => this.viewModel.cleanGame()}>Limpar Jogo</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3} onClick={() => this.viewModel.setWord()}>Próxima Palavra</MenuItem>
                    </NavDropdown>
                </Nav>
            )}
            </Navbar>
        )        
    }
}
