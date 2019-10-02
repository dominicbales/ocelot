import * as React from "react";
import { Form } from "semantic-ui-react";
import { signin, signout } from "../../redux/actions/user";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Components
import Navbar from "../../components/navbar/Navbar";

interface SigninProps {
  children?: React.ReactNode;
  user: object | null;
  signin(user: object);
}

const Signin: React.FC = ({ user, signin }: SigninProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignin = () => {
    const user: object = {
      email,
      password
    };
    signin(user);
  };

  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      {user ? (
        <Redirect to="/dashboard" />
      ) : (
        <div
          style={{ height: "80%" }}
          className="flex flex-column flex-justify-center flex-align-items-center"
        >
          <Form style={{ width: "12%" }} onSubmit={handleSignin}>
            <Form.Input
              value={email}
              onChange={(
                event: React.SyntheticEvent<HTMLInputElement>,
                data: { value: string }
              ) => setEmail(data.value)}
              fluid
              type="email"
              label="Email"
              placeholder="Email"
            />
            <Form.Input
              value={password}
              onChange={(
                event: React.SyntheticEvent<HTMLInputElement>,
                data: { value: string }
              ) => setPassword(data.value)}
              fluid
              type="password"
              label="Password"
              placeholder="Password"
            />
            <Form.Button>Sign In</Form.Button>
          </Form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.User.currentUser
});

export default connect(
  mapStateToProps,
  { signin, signout }
)(Signin);
