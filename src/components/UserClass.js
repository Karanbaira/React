import React, { useImperativeHandle } from "react";

class UserClass extends React.Component {
   constructor(props) {
    super(props);
    
    this.state = {
      userInfo:{
        name: "Dummy",
        location: "Default",
      },
    };
   }

   async componentDidMount() {

    const data = await fetch(" https://api.github.com/users/karanbaira");
    const json =  await data.json();

    this.setState({
      userInfo: json,
    })
    console.log(json);
   }
   
    render () {
     const {login, location, } = this.state.userInfo;
        return (
          <div className="user-card">
            <h2 className="name">{login}</h2>
            <h3 className="location">{location}</h3>
           
          </div>  
        );
    }
}

export default UserClass;