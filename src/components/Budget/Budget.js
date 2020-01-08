import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import {connect} from 'react-redux';
import {requestUserData} from '../../redux/userReducer';
import {requestBudgetData, addPurchase, removePurchase} from '../../redux/budgetReducer';
import './Budget.css';


class Budget extends Component {

  componentDidMount() {
    //dispatachable copy of requestUserData() and requestBudgetData is placed on props
    //IF YOU DO NOT USE this.props, THERE WILL BE NO ERROR, AS IT IS THE UNCONNECTED FUNCTION.
    //THIS IS A PAIN IN THE ASS TO DEBUG, SO USE IT!
    this.props.requestUserData();
    this.props.requestBudgetData();
    
  }

  render() {
    //the function mapStateToProps allows us to access the initialState of budgetReducer.js as this.props, as well as any other global initialState we imported
    // console.log(this.props);
    //console.log this.props resulted in an object with various shit such as user, match, location, history, budget, etc. Access these key-value pairs properly!
    const {loading, purchases, budgetLimit} = this.props.budget;
    const {firstName, lastName} = this.props.user;
    return (
      <Background>
        {/* now we can use those props to set the loading condition, which is false by default */}
        {/* {true ? <Loading /> : null} */}
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName}
          lastName={lastName}/>
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.addPurchase}/>
              <DisplayPurchases purchases={purchases}
              removePurchase={this.props.removePurchase}/>
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases}
              budgetLimit={budgetLimit}/>
              <Chart2 purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

/*All redux store state values managed by the budgetReducer are now on this.props.budget of the props object of your Budget component, including the loading property in the redux store. 
This is becaused we have mapped the redux store state to the props object of your component through the mapStateToProps function we just created after connecting our component to the redux store with the connect method. */
function mapStateToProps(state) {
  return({
    budget: state.budget,
    user: state.user
  })
}

/*The second argument to the connect method at the bottom of your file should be an object that takes in all of the action creators from your reducers and provides access to these actions in this.props. 
In your component itself, you will want to invoke the version of the requestUserData function that is now on this.props, not the one directly from the userReducer.js file. 
this.props.requestUserData(), NOT NOT NOT request.UserData() OH GOD DO NOT DO THIS! */
export default connect(mapStateToProps, {requestUserData, requestBudgetData, addPurchase, removePurchase})(Budget);
