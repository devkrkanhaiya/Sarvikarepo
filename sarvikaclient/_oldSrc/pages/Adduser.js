
import React from 'react'
import  { post } from 'axios';
import { apiConfig } from '../config/apihelper'



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
        console.log(apiData, ">>>>>>", formData);

        return post(url, formData, config)
    }

    render() {
        console.log(this.state, 'state');
        return (
            <div>
                <form onSubmit={this.onFormSubmit} >
                    <div style={{}}>
                        <h1>Add User</h1>

                        <label>
                            Name:  <input
                                type="text"
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                        </label>

                        <label>
                            Email: <input type="text"
                                onChange={(e) => this.setState({ email: e.target.value })}


                            /> </label>
                        <label>
                            Profile Picture:  <input type="file"
                                onChange={this.onChange} />
                        </label>

                        <button type="submit">ADD</button>
                    </div>

                </form>



                {this.state.apiResponse}


            </div>
        )
    }
}

export default Adduser;


