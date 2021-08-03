import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink,Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import './style.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalOpen2:false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal2 = this.toggleModal2.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup=this.handleSignup.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    toggleModal2() {
        this.setState({
            isModalOpen2: !this.state.isModalOpen2
        });
    }

    handleSignup(event) {
        this.toggleModal2();
        this.props.signupUser(this.username.value,this.password.value,this.firstname.value,this.lastname.value);
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <NavbarBrand className="mr-auto img">
                        <img src={baseUrl+'images/logo3.png'} width="70"
                        alt="Space Geeks" />
                    </NavbarBrand>
                    <div  className="page">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                
                                <NavItem>
                                    <NavLink className="nav-link" to="/Space-Achievement">
                                        Space Achievement
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/Interesting-Fact">
                                        Interesting Facts
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/Facinating-Theory">
                                        Facinating Theories
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link dbtnH" to="/Favorites">
                                        Favorites
                                    </NavLink>
                                    <div className="dropdownH">
                                        <div className="dropdown-contentH">
                                            <Link to={'/Favourite-Achievements'} className="link">
                                                <span>Favourite SpaceAchievement</span>
                                            </Link>
                                            <Link to={'/Favourite-Facts'} className="link">
                                                <span>Favourite Facts</span>
                                            </Link>
                                            <Link to={'/Favourite-Theories'} className="link">
                                                <span>Favourite Theories</span>
                                            </Link>
                                        </div>
                                    </div>
                                </NavItem>
                                
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <div className="login" onClick={this.toggleModal}>
                                            Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </div>
                                        :
                                        <div>
                                            <span className="usname">{this.props.auth.user.username}</span>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                            <Nav className="ml-2" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <div className="signup" onClick={this.toggleModal2}>
                                            Sign Up
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </div>
                                        :
                                        <div>
                                            <div className="logout" onClick={this.handleLogout}>
                                               Logout
                                                {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isModalOpen2} toggle={this.toggleModal2}>
                    <ModalHeader toggle={this.toggleModal2}>Sign Up</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    innerRef={(input) => this.firstname = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">First Name</Label>
                                <Input type="text" id="lastname" name="lastname"
                                    innerRef={(input) => this.lastname = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="success">Sign Up</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;