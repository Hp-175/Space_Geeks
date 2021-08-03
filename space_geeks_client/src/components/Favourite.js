import React, { Component } from 'react';
import { Modal,ModalBody,ModalHeader,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import './style.css';

function RenderItem({ info,name,deleteFavourite }) {
    return(
        <div className="card">
            <span className="fa fa-heart star corner" onClick={()=>deleteFavourite(info._id)}></span>
            <Link className="link" to={`/${name}/${info._id}`} >
                <img width="100%" src={baseUrl+'images/'+info.image} alt={info.image} />
                <div className="capt"><span className="bottom-center">{info.title}</span></div>
            </Link>
        </div>
    );
}

class Favourite extends Component{
    constructor(props) {
        super(props);
    }
    
    MainPage = this.props.favorite.map((info) => {
        return (
            <div  key={info._id}>
                <RenderItem info={info} name={this.props.name} deleteFavourite={this.props.deleteFavourite}/>
            </div>
        );
    });

    render(){
        
        if (this.props.favorite.isLoading) {
            return(
                
                <div className="container">
                    <div className="row">
                        
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.favorite.errMess) {
            return(
                <div>
                    <div>
                        
                        <h4>{this.props.data.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(this.props.favorite.length!=0)
        {
            return (
                    <div className="marg">
                        
                        <div className="alignment">
                            {this.MainPage}
                        </div>
                    </div>
            );
        }
        else{
            return(
                <div style={{margin:"20% 0 0 35%",fontWeight:"700",fontSize:"200%"}}>
                    No Favourite Post Added
                </div>
            );
        }
    } 
}

export default Favourite;