import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { localURL } from "../../api";
// Actions
import { setAuthorization } from "../redux/actions/user";

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    state = {
      checking: true
    };
    async componentDidMount() {
      const { setAuthorization } = this.props;
      try {
        const isValidated = await axios.get(`${localURL}api/user/current`);
        console.log("isvalidate:", isValidated.status);
        if (isValidated.status === 200) {
          await setAuthorization(true);
        }
      } catch (err) {
        console.log("error getting in:", err);
        await setAuthorization(false);
      }
      this.setState({ checking: false });
    }
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthorized === false) {
        this.props.history.push("/");
      }
    }

    render() {
      const { checking } = this.state;
      const { isAuthorized } = this.props;
      console.log("withA state:", this.state);
      console.log("withA props:", this.props);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("withAuth user:", user);
      return (
        <>
          {checking ? (
            <div>checking authorization</div>
          ) : (
            <>
              {isAuthorized ? (
                <ComponentToBeRendered {...this.props} />
              ) : (
                <Redirect to="/" />
              )}
              {/* {userKeys.length !== 0 ? <ComponentToBeRendered {...this.props} /> : <Redirect to='/' />} */}
            </>
          )}
        </>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthorized: state.User.isAuthorized
    };
  }

  return connect(
    mapStateToProps,
    { setAuthorization }
  )(Authenticate);
}
