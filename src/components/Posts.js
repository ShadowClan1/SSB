import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  AiFillLike,
  AiOutlineArrowUp,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineUp,
} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { client, urlFor } from "../client/client";
import ContextH from "../Contexthook/ContextH";

export default function Posts(props) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likee, setLikee] = useState(false);
  const [showMoreComment, setShowMoreComment] = useState(1);
  const context = useContext(ContextH);
  const token = localStorage.getItem("user");
  const { handleLike, cards, getNotes, setcards, findUser, user, anonymus } =
    context;
  const [likedBy, setlikedBy] = useState([]);
  useEffect(() => {
    findUser(token);
    console.log(user);
    setlikedBy(likedBy.concat(props.likedBy));
    const find = props.likedBy?.filter((value) => {
      return value?.postedBy?._id == token;
    });
    if (find?.length > 0) setLikee(true);
    setComments(props.comments);
    console.log(props.comments);
  }, []);

  const [like, setlike] = useState(props.likes ? props.likes : 0);
  const [comment, setComment] = useState("");
  const [commentNum, setCommentNum] = useState(
    props.comments ? props.comments.length : 0
  );
  const [showComments, setShowComments] = useState(false);
  const handleComment = () => {
    if (!showComments) setShowComments(true);
    else {
      setShowComments(false);
      setShowMoreComment(1);
    }
  };
  const onChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    setLoading(true);
    client
      .patch(props.id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          _key: uuid(),
          commentt: comment,
          postedBy: {
            _type: "postedBy",
            _ref: token,
          },
        },
      ])
      .commit()
      .then((data) => {
        setComments(
          comments.concat({
            commentt: comment,
            postedBy: {
              profilePic: user?.profilePic,
            },
          })
        );

        setComment("");
        setLoading(false);
      });
  };

  const del = (id) => {
    client.delete(id).then((data) => {
      console.log(data);
    });
  };

  const likeButton = (id) => {
    console.log(id);
    console.log(cards);
    const like = likedBy?.filter((v) => {
      return v?.postedBy?._id == token;
    });
    if (likee) {
      console.log("return");
      setLikee(false);
      client
        .patch(id)
        .unset([`likes[${likedBy.indexOf(like)}]`])
        .commit()
        .then((data) => {
          console.log(data);
          setlike(data.likes?.length);
          setlikedBy(data.likes);
        });
    } else {
      setLikee(true);
      client
        .patch(id)
        .setIfMissing({ likes: [] })
        .insert("after", "likes[-1]", [
          {
            _key: token,

            likedBy: props.postedBy?.userName,
            postedBy: {
              _type: "postedBy",
              _ref: token,
            },
          },
        ])
        .commit()
        .then((data) => {
          console.log(data);

          setlike(data.likes.length);
          setlikedBy(data.likes);
        });
    }
  };

  return (
    <div className="my-3  ">
      {" "}
      {console.log(cards)}{" "}
      <div className="flex flex-row gap-3">
        {" "}
        <Link
          to={`/user/${props.postedBy?._id}`}
          className="mb-2 flex items-center"
        >
          <img
            src={
              props.postedBy?.profilePic
                ? urlFor(props.postedBy?.profilePic)
                : anonymus
            }
            className="h-5 w-5 rounded-full outline-double outline-gray-500 inline mr-2"
          />{" "}
          {props.postedBy?.userName}
        </Link>{" "}
      </div>
      <div className="card hover:shadow-lg " style={{ width: "18rem" }}>
        {/* <img src={props.image} className="card-img-top" alt="..." /> */}
        <img
          src={props.image}
          className=" rounded-sm shadow-sm hover:shadow-lg  "
          alt="..."
        />
        {/* <div className="card-body "> */}

        <div className="mt-1 ml-1">
          <Link to={`post/${props.id}`}>
            <div className="flex flex-col ">
              <h5 className="card-title mr-1  text-center font-bold">
                {props.user}
              </h5>
              <h6 className="card-subtitle mb-2 text-center text-muted">
                {props.post}
              </h6>
            </div>
          </Link>

          <div className="flex flex-row ml-2 mb-2 relative ">
            {
              <button
                type="button"
                id={props.id}
                onClick={() => {
                  likeButton(props.id);
                }}
                className="card-link"
              >
                {likee ? (
                  <AiFillLike className="hover:text-xl hover:text-blue-900" />
                ) : (
                  <AiOutlineLike className="hover:text-xl hover:text-blue-900" />
                )}
              </button>
            }
            {like}
            <div
              type="button"
              onClick={handleComment}
              className="ml-3 justify-center z-40"
            >
              {" "}
              <AiOutlineComment
                fontSize={18}
                className="mt-1 hover:text-xl hover:text-yellow-900 "
              />
            </div>{" "}
            {commentNum}
            <div className="absolute right-1  flex flex-row justify-center items-center ">
              {" "}
              {props?.postedBy?._id == token && (
                <Link href="/" className="card-link  ">
                  Edit
                </Link>
              )}{" "}
              {props?.postedBy?._id == token && (
                <Link
                  to="/"
                  onClick={() => {
                    del(props.id);
                  }}
                  className="card-link"
                >
                  <MdDelete />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {showComments && (
        <>
          {" "}
          <div
            className="text-center items-center w-full flex-row "
            onClick={() => {
              setShowMoreComment((prev) => prev + 1);
            }}
          >
            <Link>
              {" "}
              <AiOutlineArrowUp className="inline" /> Show more comments{" "}
            </Link>
          </div>
          {comments.slice(-showMoreComment).map((value) => (
            <div className="bg-gray-300  mt-1  rounded-full  w-3/4 text-center flex flex-row">
              <div>
                <img
                  className="w-5 h-5 rounded-full my-1 mx-2 "
                  src={
                    value?.postedBy?.profilePic
                      ? urlFor(value?.postedBy?.profilePic)
                      : anonymus
                  }
                  alt=""
                />
              </div>{" "}
              {value.commentt}{" "}
            </div>
          ))}
          <div className="mt-1 flex flex-row-reverse">
            {" "}
            <button
              className="bg-blue-800 hover:bg-blue-600 text-white rounded-full px-2 items-center"
              onClick={addComment}
            >
              Post{" "}
            </button>
            <div className=" mr-1 bg-gray-200 rounded-full  items-center px-2">
              <input
                className=" bg-gray-200 focus-within: border-gray-200 outline-none"
                placeholder="Enter your comment"
                type="text"
                name="comment"
                value={comment}
                onChange={onChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
