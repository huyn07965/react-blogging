import React, { useState } from "react";
import ActionEdit from "../action/ActionEdit";
import ActionDelete from "../action/ActionDelete";
import ActionView from "../action/ActionView";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase-app/firebase-config";
import LabelStatus from "../label/LabelStatus";
import useGetCategory from "../../hooks/useGetCategory";
import useGetUserPost from "../../hooks/useGetUserPost";
import { useAuth } from "../../contexts/auth-context";
import { roleStatus } from "../../utils/constants";

const PostList = ({ post, admin = false }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { category } = useGetCategory(post?.category?.id);
  const { user } = useGetUserPost(post?.user?.id);
  const date = post?.createdAt?.seconds
    ? new Date(post?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  const handleDelete = async (docId) => {
    const colRef = doc(db, "posts", docId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case 2:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case 3:
        return <LabelStatus type="danger">Reject</LabelStatus>;
      default:
        break;
    }
  };
  return (
    <tr key={post?.id}>
      <td title={post?.id}>{post.id?.slice(0, 5) + "..."}</td>
      <td>
        <div className="item-post">
          <img src={post?.image} alt="" className="img-post" />
          <div className="item-post-info">
            <h3 className="item-post-name" title={post?.title}>
              {post?.title?.slice(0, 30) + "..."}
            </h3>
            <time className="item-post-description">Date: {formatDate}</time>
          </div>
        </div>
      </td>
      <td>
        <span className="item-post-description">{category?.name}</span>
      </td>
      <td>
        <span className="item-post-description">{user?.userName}</span>
      </td>
      <td>{renderStatus(Number(post?.status))}</td>
      <td>
        <div className="actions">
          <ActionView
            onClick={() => navigate(`/post/${post.slug}`)}
          ></ActionView>
          {userInfo?.role == roleStatus.Admin ? (
            <ActionEdit
              onClick={() => navigate(`/manage/update-post?id=${post.id}`)}
            ></ActionEdit>
          ) : (
            <ActionEdit
              onClick={() => navigate(`/user/update-post?id=${post.id}`)}
            ></ActionEdit>
          )}

          <ActionDelete onClick={() => handleDelete(post.id)}></ActionDelete>
        </div>
      </td>
    </tr>
  );
};

export default PostList;
