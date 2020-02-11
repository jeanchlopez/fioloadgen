import React from 'react';
import '../app.scss';

export class Profiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: []
        };
    };

    componentDidMount() {
        fetch("http://localhost:8080/api/profile")
          .then((response) => {
              console.debug("Profile fetch : ", response.status);
              if (response.status == 200) {
                  return response.json();
              } else {}
                  throw Error(`Fetch failed with HTTP status: ${response.status}`);
              })
          .then((profiles) => {
              /* Happy path */
              let profileNames = [];
              profiles.data.forEach(profile => {
                profileNames.push(profile.name);
              });
              this.setState({
                profiles: profileNames
              });
              console.log(profiles);
          })
          .catch((error) => {
              console.error("Error:", error);
          });
    }

    render() {
        let profileSelector;
        if (this.state.profiles.length > 0) {
            let profileList = this.state.profiles.map((profile, i) => {
                return (<option key={i} value={profile}>{profile}</option>)
            });
            profileSelector = (
                <div className="profile-select">
                    {/* <label htmlFor="profiles">FIO Job profiles : </label> */}
                    <select id="profiles" size="10">
                        {profileList}
                    </select>
                    <button className="btn btn-default profile-reload" onClick={() => {alert('refresh profile list');}}>Reload</button><br />
                </div>
            );
        } 
        return (
            <div id="profiles" className={this.props.visibility}>
                <br />
                <div className="profile-container">
                    <div style={{ display: "flex"}}>
                        {profileSelector}
                        <div className="profile-info">
                            <textarea style={{resize: "none"}} rows="30" cols="60"/>

                        </div>
                    </div>
                    <button className="btn btn-primary profile-run" onClick={() => {alert('run a profile');}}>Run</button><br />
                </div>
            </div>
        );
    }
}

export default Profiles;
