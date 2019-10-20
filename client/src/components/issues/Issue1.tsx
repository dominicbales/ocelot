// import * as React from "react";
// import axios from "axios";
// import { connect } from "react-redux";
// import { match } from "react-router-dom";
// import moment from "moment";
// import { localURL } from "../../../api";
// import {
//   Header,
//   Button,
//   Card,
//   Icon,
//   Divider,
//   Comment,
//   Form,
//   Select,
//   TextArea
// } from "semantic-ui-react";
// // Action
// import { fetchIssue, fetchIssueComments } from "../../redux/actions/issue";
// // Components
// import ShowCommentReplies from "./ShowCommentReplies";

// interface IssueProps {
//   children?: React.ReactNode;
//   issue: Array<any>;
//   user: {
//     email: string;
//     iat: number;
//     password: string;
//     profileImageUrl: string;
//     username: string;
//     _id: string;
//   };
//   issueComments: Array<any>;
//   fetchIssue(_Id: string);
//   fetchIssueComments(_id: string);
// }

// interface MatchIdType {
//   id: string;
// }

// const Issue: React.FC = (
//   { issue, user, issueComments, fetchIssue, fetchIssueComments }: IssueProps,
//   matchId: match<MatchIdType>
// ) => {
//   const [textFieldValue, setTextField] = React.useState("");
//   const [replyInput, setreplyInput] = React.useState("");
//   const [open, setOpen] = React.useState(false);
//   const [replyTo, setReplyTo] = React.useState({});
//   const [option, setOption] = React.useState([
//     { value: "active", text: "Open" },
//     { value: "closed", text: "Closed" }
//   ]);

//   // async componentDidMount() {
//   //     console.log("issueData:", matchId.params.id);
//   //     await fetchIssue(matchId.params.id);
//   //     await fetchIssueComments(matchId.params.id);
//   //   }

//   //   componentDidUpdate(prevProps) {
//   //     if (prevProps.issue !== issue) {
//   //       return true;
//   //     }
//   //   }

//   const handleActiveChange = async (e, data) => {
//     const activeTemp = {
//       active: data.value
//     };
//     await axios.post(
//       `${localURL}api/issues/${matchId.params.id}/active`,
//       activeTemp
//     );
//     fetchIssue(matchId.params.id);
//   };

//   const handleTextField = async (e, data) => {
//     setTextField(data.value);
//   };

//   const handleSubmit = async () => {
//     const submitData = {
//       comment: textFieldValue,
//       userId: user._id,
//       ownerName: user.username,
//       ownerImage: user.profileImageUrl
//     };
//     await axios.post(
//       `${localURL}api/issues/comment/${matchId.params.id}`,
//       submitData
//     );
//     await setTextField("");
//     await fetchIssueComments(matchId.params.id);
//   };

//   const handleReplyClick = data => {
//     setOpen(!open);
//     setReplyTo(data);
//   };

//   //   handleReplyInputChange = (e, data) => {
//   //     this.setState({ replyInput: data.value });
//   //   };

//   const handleReplySubmit = async () => {
//     const submitData = {
//       reply: replyInput,
//       userId: user._id,
//       author: user.username,
//       avatar: user.profileImageUrl
//     };
//     await axios.post(`${localURL}api/issues/reply/${replyTo._id}`, submitData);
//     await fetchIssueComments(matchId.params.id);
//     setOpen(false);
//     setreplyInput("");
//   };

//   const issueIcon = issue.active === "active" ? "check circle outline" : "ban";
//   const issueColor = issue.active === "active" ? "rgb(0, 192, 57)" : "red";

//   const commentList = issueComments.map(data => {
//     return (
//       <Comment key={data._id}>
//         <Comment.Avatar as="a" src={data.ownerImage} />
//         <Comment.Content>
//           <Comment.Author as="a">{data.ownerName}</Comment.Author>
//           <Comment.Metadata>
//             <span>
//               {moment(data.createdAt)
//                 .startOf()
//                 .fromNow()}
//             </span>
//           </Comment.Metadata>
//           <Comment.Text>{data.comment}</Comment.Text>
//           <Comment.Actions>
//             <a onClick={() => handleReplyClick(data)}>Reply</a>
//           </Comment.Actions>
//         </Comment.Content>
//         {data.replies.length ? <ShowCommentReplies data={data} /> : null}
//       </Comment>
//     );
//   });

//   return (
//     <div style={{ padding: "50px", overflowY: "auto" }}>
//       <div>
//         <Header as="h1">{issue.issueName}</Header>
//         <Card
//           className="flex flex-row"
//           style={{
//             width: "80px",
//             padding: "5px",
//             backgroundColor: issueColor,
//             color: "white"
//           }}
//         >
//           <Icon name={issueIcon} />
//           {issue.active === "active" ? <p>Open</p> : <p>Closed</p>}
//         </Card>
//       </div>
//       <Divider />
//       <div className="flex flex-justify-between">
//         <div className="flex">
//           <img src={issue.ownerImage} />
//           <div style={{ marginLeft: "40px" }}>{issue.description}</div>
//         </div>
//         <div>
//           <h5>Active</h5>
//           <Select
//             onClick={handleClick}
//             value={issue.active}
//             onChange={handleActiveChange}
//             placeholder="Select status"
//             options={state.option}
//           />
//           <h5>Assigned</h5>
//         </div>
//       </div>
//       <Comment.Group threaded>
//         <Header as="h3" dividing>
//           Comments
//         </Header>
//         {commentList}
//         <Form reply>
//           <Form.TextArea
//             value={textFieldValue}
//             onChange={handleTextField}
//             disabled={issue.active === "closed"}
//           />
//           <Button
//             onClick={handleSubmit}
//             disabled={issue.active === "closed"}
//             content="Add Comment"
//             labelPosition="left"
//             icon="edit"
//             primary
//           />
//         </Form>
//       </Comment.Group>
//       {open && (
//         <div className="add-project-modal-container">
//           <Card
//             style={{ padding: "10px" }}
//             className="add-project-modal-style flex-justify-center flex-align-items-center"
//           >
//             <Header style={{ paddingBottom: "5px" }} size="medium">
//               Replying To {replyTo.ownerName}
//             </Header>
//             <TextArea
//               style={{
//                 width: "60%",
//                 maxWidth: "90%",
//                 minWidth: "60%",
//                 minHeight: "15%"
//               }}
//               value={replyInput}
//               onChange={(event, data: { value }) => setreplyInput(data.value)}
//               placeholder="Description..."
//             />
//             <div style={{ marginTop: "20px" }}>
//               <Button onClick={handleReplySubmit}>Submit</Button>
//               <Button onClick={handleReplyClick}>Close</Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// const mapStateToProps = state => ({
//   issue: state.Issue.issue,
//   user: state.User.currentUser,
//   issueComments: state.Issue.issueComments
// });

// export default connect(
//   mapStateToProps,
//   { fetchIssue, fetchIssueComments }
// )(Issue);
