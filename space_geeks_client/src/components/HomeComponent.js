import React, { Component } from 'react';
import { Modal,ModalBody,ModalHeader,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import './style.css';

function RenderItem({ info,name }) {
    return(
        <div className="card">
            <Link className="link" to={`/${name}/${info._id}`} >
                <img width="100%" src={baseUrl+'images/'+info.image} alt={info.image} />
                <div className="capt"><span className="bottom-center">{info.title}</span></div>
            </Link>
        </div>
    );
}

class SpaceGeeks extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            selectedFile: null
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handlePost=this.handlePost.bind(this);
        this.postContent=this.postContent.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handlePost(event){
        this.toggleModal();
        const formData = new FormData();
        formData.append(
            "imageFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        this.props.postImage(formData,this.props.where,this.information.value,this.credits.value,this.title.value);
        event.preventDefault();
    }

    onFileChange = event => {
            this.setState({ selectedFile: event.target.files[0] });
        };

    postContent=()=>{
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                   {this.props.what}
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.titl}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handlePost}>
                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input type="text" id="title" name="title"
                                    innerRef={(input) => this.title = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="information">Information</Label>
                                <Input type="text" id="information" name="information"
                                    innerRef={(input) => this.information = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="credits">Credits</Label>
                                <Input type="text" id="credits" name="credits"
                                    innerRef={(input) => this.credits = input}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="image">Upload image</Label>
                                <Input type="file" id="image" name="image"
                                    onChange={this.onFileChange}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Post</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
    MainPage = this.props.specific.map((info) => {
        return (
            <div  key={info._id}>
                <RenderItem info={info} name={this.props.name} />
            </div>
        );
    });

    render(){
        
        if (this.props.data.isLoading||this.props.specific==null||this.props.specific.length==0) {
            return(
                
                <div className="container">
                    <div className="row">
                        <this.postContent/>
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.data.errMess) {
            return(
                <div>
                    <div>
                        <this.postContent/>
                        <h4>{this.props.data.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(this.props.specific)
        {
            return (
                    <div className="marg">
                        <this.postContent/>
                        <div className="alignment">
                            {this.MainPage}
                        </div>
                    </div>
            );
        }
    } 
}

export default SpaceGeeks;