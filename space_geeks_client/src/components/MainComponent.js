import React,{Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchAchievements,fetchFacts,fetchTheories,
    fetchFavouriteAchievements,fetchFavouriteFacts,
    fetchFavouriteTheories,postAchievement,postFact,
    postTheory,putAchievement,putFact,putTheory,
    deleteAchievement,deleteFact,deleteTheory,
    postFavouriteAchievement,postFavouriteFact,
    postFavouriteTheory,deleteFavouriteAchievement,
    deleteFavouriteFact,deleteFavouriteTheory,
    postAchievementComment,postFactComment,
    postTheoryComment,deleteFactComment,
    deleteAchievementComment,deleteTheoryComment,
    postChangeUsername,loginUser,logoutUser,
    signupUser,postImage,ErrorMess,Set_default} from '../redux/ActionCreators';

import { matchPath } from 'react-router'
import Header from './HeaderComponent';
import HomeComponent from './HomeComponent';
import DetailsComponent from './DetailsComponent';
import Favourite  from './Favourite';
import Footer from './FooterComponent';
const mapStateToProps = state => {
    return {
        achievements:state.achievements,
        facts: state.facts,
        theories:state.theories,
        favouriteAchievements: state.favouriteAchievements,
        favouriteFacts:state.favouriteFacts,
        favouriteTheories:state.favouriteTheories,
        errormess:state.errorMess,
        auth: state.auth,
        image:state.image
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchAchievements: () => {dispatch(fetchAchievements())},
    fetchFacts: () => {dispatch(fetchFacts())},
    fetchTheories: () => {dispatch(fetchTheories())},
    fetchFavouriteAchievements: () => {dispatch(fetchFavouriteAchievements())},
    fetchFavouriteFacts: () => {dispatch(fetchFavouriteFacts())},
    fetchFavouriteTheories: () => {dispatch(fetchFavouriteTheories())},
    postAchievement: (image, Information, credits,title) => dispatch(postAchievement(image, Information, credits,title)),
    postFact: (image, Information, credits,title) => dispatch(postFact(image, Information, credits,title)),
    postTheory: (image, Information, By,title) => dispatch(postTheory(image, Information, By,title)),
    putAchievement: (image, Information, credits,title,_ID) => dispatch(putAchievement(image, Information, credits,title,_ID)),
    putFact: (image, Information, credits,title,_ID) => dispatch(putFact(image, Information, credits,title,_ID)),
    putTheory: (image, Information, By,title,_ID) => dispatch(putTheory(image, Information, By,title,_ID)),
    deleteAchievement: (_ID) => dispatch(deleteAchievement(_ID)),
    deleteFact: (_ID) => dispatch(deleteFact(_ID)),
    deleteTheory: (_ID) => dispatch(deleteTheory(_ID)),
    deleteFavouriteAchievement: (_ID) => dispatch(deleteFavouriteAchievement(_ID)),
    deleteFavouriteFact: (_ID) => dispatch(deleteFavouriteFact(_ID)),
    deleteFavouriteTheory: (_ID) => dispatch(deleteFavouriteTheory(_ID)),
    postFavouriteAchievement: (_ID) => dispatch(postFavouriteAchievement(_ID)),
    postFavouriteFact: (_ID) => dispatch(postFavouriteFact(_ID)),
    postFavouriteTheory: (_ID) => dispatch(postFavouriteTheory(_ID)),
    postAchievementComment: (comment,PID,CID) => dispatch(postAchievementComment(comment,PID,CID)),
    postFactComment: (comment,PID,CID) => dispatch(postFactComment(comment,PID,CID)),
    postTheoryComment: (comment,PID,CID) => dispatch(postTheoryComment(comment,PID,CID)),
    deleteAchievementComment: (PID,CID) => dispatch(deleteAchievementComment(PID,CID)),
    deleteFactComment: (PID,CID) => dispatch(deleteFactComment(PID,CID)),
    deleteTheoryComment: (PID,CID) => dispatch(deleteTheoryComment(PID,CID)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    signupUser: (username,password,firstname,lastname) => dispatch(signupUser(username,password,firstname,lastname)),
    postChangeUsername: (newUsername) => dispatch(postChangeUsername(newUsername)),
    postImage: (formadata,func,info,cred,title) => dispatch(postImage(formadata,func,info,cred,title)),
    Set_default:()=>dispatch(Set_default()),
    ErrorMess:(message)=>dispatch(ErrorMess(message))
  });

  class Main extends Component {

    componentDidMount() {
      this.props.fetchAchievements();
      this.props.fetchFacts();
      this.props.fetchTheories();
      this.props.fetchFavouriteAchievements();
      this.props.fetchFavouriteFacts();
      this.props.fetchFavouriteTheories();
      document.title="Space Geeks";
    }
    
    render() {
      const AchievementWithId = () => {
        
        
        const match = matchPath(this.props.history.location.pathname, {
          path: '/Space-Achievement/:achievementId',
          exact: true,
          strict: false
        });
        return(
          <DetailsComponent data={this.props.achievements.achievements.filter((achievement) => achievement._id === match.params.achievementId)[0]}
            editData={this.props.putAchievement}
            deleteData={this.props.deleteAchievement}
            isLoading={this.props.achievements.isLoading}
            errMess={this.props.achievements.errMess}
            postComment={this.props.postAchievementComment}
            deleteComment={this.props.deleteAchievementComment}
            favorite={this.props.favouriteAchievements.favourite_achievements}
            postFavourite={this.props.postFavouriteAchievement}
            deleteFavourite={this.props.deleteFavouriteAchievement}
            errormess={this.props.errormess.errMess}
            cem={this.props.ErrorMess}
            place={'Space-Achievement'}
            />
        );
      }
      const FactWithId = () => {
        
        
        const match = matchPath(this.props.history.location.pathname, {
          path: '/Interesting-Fact/:factId',
          exact: true,
          strict: false
        });
        return(
          <DetailsComponent data={this.props.facts.facts.filter((fact) => fact._id === match.params.factId)[0]}
            editData={this.props.putFact}
            deleteData={this.props.deleteFact}
            isLoading={this.props.facts.isLoading}
            errMess={this.props.facts.errMess}
            errormess={this.props.errormess.errMess}
            cem={this.props.ErrorMess}
            postComment={this.props.postFactComment}
            deleteComment={this.props.deleteFactComment}
            favorite={this.props.favouriteFacts.favourite_facts}
            postFavourite={this.props.postFavouriteFact}
            deleteFavourite={this.props.deleteFavouriteFact}
            place={'Interesting-Fact'}
            />
        );
      }
      const TheoryWithId = () => {
        
        
        const match = matchPath(this.props.history.location.pathname, {
          path: '/Facinating-Theory/:theoryId',
          exact: true,
          strict: false
        });
        return(
          <DetailsComponent data={this.props.theories.theories.filter((theory) => theory._id === match.params.theoryId)[0]}
            editData={this.props.putTheory}
            deleteData={this.props.deleteTheory}
            isLoading={this.props.theories.isLoading}
            errMess={this.props.theories.errMess}
            errormess={this.props.errormess.errMess}
            cem={this.props.ErrorMess}
            postComment={this.props.postTheoryComment}
            deleteComment={this.props.deleteTheoryComment}
            favorite={this.props.favouriteTheories.favourite_theories}
            postFavourite={this.props.postFavouriteTheory}
            deleteFavourite={this.props.deleteFavouriteTheory}
            place={'Facinating-Theory'}
            />
        );
      }
      const FavAchievement = () => {
        return(
          <Favourite 
          favorite={this.props.favouriteAchievements.favourite_achievements}
          deleteFavourite={this.props.deleteFavouriteAchievement}
          name={"Space-Achievement"}
          />
        );
      }

      const FavFact = () => {
        return(
          <Favourite 
          favorite={this.props.favouriteFacts.favourite_facts}
          deleteFavourite={this.props.deleteFavouriteFact}
          name={"Favourite-Facts"}
          />
        );
      }

      const FavTheory = () => {
        return(
          <Favourite 
          favorite={this.props.favouriteTheories.favourite_theories}
          deleteFavourite={this.props.deleteFavouriteTheory}
          name={"Favourite-Theories"}
          />
        );
      }
      const HomeComponentAchievement = () => {
        return(
          <HomeComponent 
            data={this.props.achievements}
            specific={this.props.achievements.achievements}
            where={"Achievement"}
            what={"Post Space Achievement"}
            name={"Space-Achievement"}
            titl={"Space Achievement"}
            postImage={this.props.postImage} 
            image={this.props.image} 
            errormess={this.props.errormess.errMess}
            cem={this.props.ErrorMess}
            Set_default={this.props.Set_default}
            />
        );
      }
      const HomeComponentFact = () => {
        return(
          <HomeComponent 
            data={this.props.facts}
            specific={this.props.facts.facts}
            where={"Fact"}
            what={"Post Fact"}
            name={"Interesting-Fact"}
            titl={"Interesting Fact"}
            postImage={this.props.postImage} 
            image={this.props.image} 
            errormess={this.props.errormess.errMess}
            cem={this.props.ErrorMess}
            Set_default={this.props.Set_default}
            />
        );
      }
      const HomeComponentTheory = () => {
        return(
          <HomeComponent 
            data={this.props.theories}
            specific={this.props.theories.theories}
            where={"Theory"}
            what={"Post Facinating Theory"}
            name={"Facinating-Theory"}
            titl={"Facinating Theory"}
            postImage={this.props.postImage} 
            image={this.props.image} 
            errormess={this.props.errormess.errMess}
            cem={this.props.ErrorMess}
            Set_default={this.props.Set_default}
            />
        );
      }
      return (
        <div>
          <div className="out ">
            <div style={{position:"fixed",width:"100%",zIndex:"1"}}>
              <Header auth={this.props.auth} 
                loginUser={this.props.loginUser}
                signupUser={this.props.signupUser}
                logoutUser={this.props.logoutUser} 
                />
              </div>
              <br/><br/>
            <Switch>
                <Route exact path="/Space-Achievement" component={() => <HomeComponentAchievement/>} />
                <Route exact path="/Interesting-Fact" component={() => <HomeComponentFact/>} />
                <Route exact path="/Facinating-Theory" component={() => <HomeComponentTheory/>} />
                <Route exact path="/Space-Achievement/:achievementId" component={() => <AchievementWithId match={this.props.match}/>} />
                <Route exact path="/Interesting-Fact/:factId" component={() => <FactWithId match={this.props.match}/>} />
                <Route exact path="/Facinating-Theory/:theoryId" component={() => <TheoryWithId match={this.props.match}/>} />
                <Route exact path="/Favourite-Achievements" component={()=><FavAchievement/>}/>
                <Route exact path="/Favourite-Facts" component={()=><FavFact/>}/>
                <Route exact path="/Favourite-Theories" component={()=><FavTheory/>}/>
                <Redirect to="/Space-Achievement" />
            </Switch>
            </div>
          <br/>
          <div className="foot">
            <Footer/>
          </div>
        </div>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
  