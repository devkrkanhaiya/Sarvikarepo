import React from 'react'
import  { post } from 'axios';
import { apiConfig } from '../config/apihelper'
import { Button, Form, FormGroup, Label, Input, Container,Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Adduser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            name: '',
            email: '',
            apiResponse: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        const data = {
            name: this.state.name,
            email: this.state.email,
            profilepicture: this.state.file
        }

        this.fileUpload(data)
            .then((response) => {
                this.setState({ apiResponse: response.data.message })
                console.log(response, "ressss");
            })
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    fileUpload(apiData) {
        const url = apiConfig.URL + 'adduser';
        const formData = new FormData();
        formData.append('name', apiData.name)
        formData.append('email', apiData.email)
        formData.append('profile_picture', apiData.profilepicture)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {
        return (
            <div className='mt-3 add_user_form'>
               <Container>
                   <Row>
                      <Col md={2}></Col>
                      <Col md={8}>
                        <Form onSubmit={() => this.onFormSubmit()}>
                            <FormGroup className='mt-3'>
                                <Label>Name</Label>
                                <Input
                                  style={{
                                     width:'50%'
                                  }}
                                  onChange={(e) => this.setState({ name: e.target.value })}
                                  type="text"
                                  name="name"
                                  placeholder="Enter name" />
                            </FormGroup>
                            <FormGroup className='mt-3'>
                                <Label>Email</Label>
                                <Input
                                    style={{
                                        width:'50%'
                                    }}
                                     onChange={(e) => this.setState({ email: e.target.value })}
                                    type="email"
                                    name="email"
                                    placeholder="Enter email" />
                            </FormGroup>
                            <FormGroup className='mt-3'>
                                <Label>Image</Label>
                                <Input
                                    onChange={this.onChange}
                                    type="file"
                                    name="file"
                                    placeholder="file placeholder" />
                            </FormGroup>
                            <Button type='submit' className='mt-3'>
                               Submit
                            </Button>
                        </Form>
                          </Col>
                   </Row>
                {this.state.apiResponse}
            </Container>
        </div>
        )
    }
}

export default Adduser;


