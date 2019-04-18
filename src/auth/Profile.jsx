import React from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';

class Profile extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        <h4><img src={profile.picture} alt="profile" style={{ maxWidth: '45px', marginRight: '15px' }} /> {profile.displayedName}</h4>
      </div>
    );
  }
}

export default Profile;

/*
        <pre>{JSON.stringify(profile, null, 2)}</pre>

*/
/*
Common info to store in local User DB
{
  "sub": "auth0|5a200dc1a916760a80b8be6d",   <--- should be an ID in local User db
  "nickname": "vetterh1",
  "name": "vetterh1@yahoo.fr",
  "picture": "https://s.gravatar.com/avatar/ae1a01ebb669225dbade03d3234eb815?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fve.png",
  "updated_at": "2018-01-26T13:15:32.748Z"   <--- need to save?
}
Info to add (not present everywhere):
{
  "given_name": "Laurent",
  "gender": "male",
  "locale": "en",
}




Info from fb:
{
  "sub": "facebook|10155770786904774",
  "given_name": "Laurent",
  "family_name": "Vetterhoeffer",
  "nickname": "vetterh1",
  "name": "Laurent Vetterhoeffer",
  "picture": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15665734_10154749404379774_965795616063638131_n.jpg?oh=345a2a75f1a27a3e7f3712be76bd147b&oe=5AE7CEC1",
  "gender": "male",
  "locale": "en-US",
  "updated_at": "2018-01-26T13:12:03.179Z"
}


Info from google:
{
  "sub": "google-oauth2|110112201362378115234",
  "given_name": "Laurent",
  "family_name": "Vetterhoeffer",
  "nickname": "lvetterhoeffer",
  "name": "Laurent Vetterhoeffer",
  "picture": "https://lh4.googleusercontent.com/-TgcVDrX_Y3A/AAAAAAAAAAI/AAAAAAABX-o/-ndVeNaFNXc/photo.jpg",
  "gender": "male",
  "locale": "en",
  "updated_at": "2018-01-26T13:13:33.805Z"
}


Info from linkedin:
{
  "sub": "linkedin|AT8i_jRSFK",
  "given_name": "Laurent",
  "family_name": "Vetterhoeffer",
  "nickname": "lvetterhoeffer",
  "name": "Laurent Vetterhoeffer",
  "picture": "https://media.licdn.com/mpr/mprx/0_PI61Fpx3Bm7rI7OxhcVK6HC3BhavITPMBTVzcC_36CaKsSPy-GRqlL0F9CGyj7rplVRK6WYC5BmKZKP-r8ByrFO3-BmrZKCPX8By_6x3-BCKZKgqnvsBA-1IXutpd61NGUwp5j7e-h0JRqtPkYV6q_",
  "updated_at": "2018-01-26T13:14:23.579Z"
}

Info from twitter:
{
  "sub": "twitter|144895965",
  "nickname": "LaurentVetterhoeffer",
  "name": "LaurentVetterhoeffer",
  "picture": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
  "updated_at": "2018-01-26T13:15:06.461Z"
}

Info from Auth0:
{
  "sub": "auth0|5a200dc1a916760a80b8be6d",
  "nickname": "vetterh1",
  "name": "vetterh1@yahoo.fr",
  "picture": "https://s.gravatar.com/avatar/ae1a01ebb669225dbade03d3234eb815?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fve.png",
  "updated_at": "2018-01-26T13:15:32.748Z"
}

*/