  import { Route, Link, Redirect} from 'react-router-dom';
  import React from 'react';
  // import MemberInfoList from './info/list.component'
  // import MemberInfoDetailForm from './info/detail.component'
  // import MemberContactList from './contact/list.component'  
  // import DeliveryAddressList from './deliveryAddress/list.component'
  // import DeliveryAddressDetailForm from './deliveryAddress/detail.component'
  // import ReportList from './report/list.component'
  // import ReportDetailForm from './report/detail.component'
  import Login from './login/login'

  class MemberCenterComponent extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      let {match, location, operate} = this.props;
      console.log(this.props,'---------------------')
      return (
        <div>
          {/* <Route exact path={`${match.url}`} render={() => {
            return <Redirect to={`${match.url}/login/index`}/>
          }}/> */}
          {/* <Route exact path={`/members/info/index`} render={(props) => <MemberInfoList {...props}/> }/> */}
          {/* <Route exact path={`/members/info/index`} render={(props) => <MemberInfoDetailForm {...props}/> }/>
          <Route exact path={`/members/info/index/add`} render={(props) => <MemberInfoDetailForm {...props}/> }/>
          <Route exact path={`/members/info/index/edit/:id`} render={(props) => <MemberInfoDetailForm {...props}/> }/>
  
          <Route exact path={`/members/deliverAddress/index`} render={(props) => <DeliveryAddressList {...props}/> }/>
          <Route exact path={`/members/deliverAddress/index/add`} render={(props) => <DeliveryAddressDetailForm {...props}/> }/>
          <Route exact path={`/members/deliverAddress/index/edit/:id`} render={(props) => <DeliveryAddressDetailForm {...props}/> }/>
  
          <Route exact path={`/members/report/index`} render={(props) => <ReportList {...props}/> }/>
          <Route exact path={`/members/report/index/edit/:id`} render={(props) => <ReportDetailForm {...props}/> }/>
  
          <Route exact path={`/members/contact/index`} render={(props) => <MemberContactList {...props}/> }/> */}
          
          {/* <Route exact path={`/member/login/index`} render={(props) => <Login {...props}/> }/> */}
        </div>
      )
    }
  }
  
  export default MemberCenterComponent;
  