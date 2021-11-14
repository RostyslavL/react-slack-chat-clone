import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import{ Grid, Form, Segment, Button, Header, Message, Icon  } from 'semantic-ui-react'

export default class Register extends Component {

    state = {
        username:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        errors:[]
    }

    isFormValid = () => {
        let errors = []
        let error

        if (this.isFormEmpty(this.state)){
           error = {message: 'Plese Fill All Fields'}
           this.setState({errors: errors.concat(error)})
           return false
        } else if (!this.isPasswordValid(this.state)) {
            error = {message: 'Password is invalid'}
            this.setState({errors: errors.concat(error)})
            return false
        } else {
            // form valid
            return true
        }
    }

    isFormEmpty = ({ username, email, password, passwordConfirmation}) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    }
    isPasswordValid = ({password, passwordConfirmation}) => {
        if(password.length < 6 || passwordConfirmation.length < 6){
            return false
        }else if(password.length !== passwordConfirmation.length){
            return false
        }else{
            return true
        }
    }
    isPasswordValid = ({password, passwordConfirmation}) => {
        return (password.length < 6 || passwordConfirmation.length < 6) ? false : (password.length !== passwordConfirmation.length) ? false : true        
    }
    displayErrors = (errors) => errors.map((error, index) => <p key={index}>{error.message}</p>) 
    
    handleChange = (event) =>{
        this.setState({ [event.target.name]: event.target.value})
    }
    handleSubmit = (event) =>{
        if(this.isFormValid()){
            event.preventDefault()
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createUser =>{
                console.log(createUser);
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }

    render() {

        const {
            username,
            email,
            password,
            passwordConfirmation,
            errors
        } = this.state

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header 
                        as="h2" 
                        icon 
                        color="orange"
                        textAlign="center"
                    >
                       <Icon name="puzzle piece" color="orange">
                            Register for Chat
                        </Icon>   
                    </Header>       
                        <Form size="large" onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input 
                                    fluid 
                                    name="username" 
                                    icon="user" 
                                    iconPosition="left" 
                                    placeholder="User Name" 
                                    onChange={this.handleChange} type="text"
                                    value={username}
                                />
                                <Form.Input 
                                    fluid 
                                    name="email" 
                                    icon="mail" 
                                    iconPosition="left" 
                                    placeholder="Email Address" 
                                    onChange={this.handleChange} type="email"
                                    value={email}
                                />
                                <Form.Input 
                                    fluid 
                                    name="password" 
                                    icon="lock" 
                                    iconPosition="left" 
                                    placeholder="Password" 
                                    onChange={this.handleChange} type="password"
                                    value={password}
                                />
                                <Form.Input 
                                    fluid 
                                    name="passwordConfirmation" 
                                    icon="repeat" 
                                    iconPosition="left" 
                                    placeholder="Password Confirmation" 
                                    onChange={this.handleChange} type="password"
                                    value={passwordConfirmation}
                                />
                                <Button 
                                    color="orange" 
                                    fluid 
                                    size="large">
                                    Submit
                                </Button>
                            </Segment>
                        </Form>
                        {errors.length > 0 && (
                            <Message error> 
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                            )
                        }
                    <Message>Already a User ?  &nbsp;
                        <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>    
            </Grid>
        )
    }
}
