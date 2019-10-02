import * as React from "react";
import axios from "axios";
import { History } from "history";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

import { localURL } from "../../../api";

// Actions
import { signin } from "../../redux/actions/user";

// Components
import Navbar from "../../components/navbar/Navbar";

interface SignupProps {
  children?: React.ReactNode;
  history: History;
  signin(user: object): void;
}

const Signup: React.FC = ({ signin, history }: SignupProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleSignupSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    const user: object = {
      email,
      password,
      username
    };
    await axios.post(`${localURL}api/user/register`, user);
    await signin(user);
    history.push("/dashboard");
  };

  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <div
        style={{ height: "80%" }}
        className="flex flex-column flex-justify-center flex-align-items-center"
      >
        <Form onSubmit={handleSignupSubmit} style={{ width: "12%" }}>
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
            value={username}
            onChange={(
              event: React.SyntheticEvent<HTMLInputElement>,
              data: { value: string }
            ) => setUsername(data.value)}
            fluid
            label="Username"
            placeholder="Username"
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
          <Form.Button>Sign up</Form.Button>
        </Form>
      </div>
    </div>
  );
};

export default connect(
  null,
  { signin }
)(Signup);
