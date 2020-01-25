import React from "react";
import moment from "moment";
import {
  Header,
  Button,
  Card,
  Icon,
  Divider,
  Comment,
  Form,
  Select,
  TextArea
} from "semantic-ui-react";

export default function ShowCommentReplies({ data }) {
  const showReplies = data.replies.map(val => {
    return (
      <Comment.Group key={val._id}>
        <Comment>
          <Comment.Avatar as="a" src={val.avatar} />
          <Comment.Content>
            <Comment.Author className="issue-header-color" as="a">
              {val.author}
            </Comment.Author>
            <Comment.Metadata>
              <span className="issue-date-color">
                {moment(val.createdAt)
                  .startOf()
                  .fromNow()}
              </span>
            </Comment.Metadata>
            <Comment.Text className="issue-sub-color">{val.reply}</Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    );
  });
  return <>{showReplies}</>;
}
