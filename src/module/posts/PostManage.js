import React, { useState } from "react";
import styled from "styled-components";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Table,
} from "../../components";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useAuth } from "../../contexts/auth-context";
import { roleStatus } from "../../utils/constants";

const PostManageStyles = styled.div`
  .search-post {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }
  .search {
    max-width: 300px;
    padding: 16px;
    border: 1px solid ${(props) => props.theme.greyLight};
    border-radius: 5px;
  }
  .header-button {
    padding: 10px;
    max-width: 230px;
    min-width: 120px;
    flex-wrap: nowrap;
  }
  .item-post {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .img-post {
    width: 66px;
    height: 55px;
    border-radius: 4px;
    object-fit: cover;
  }
  .item-post-info {
    max-width: 400px;
    white-space: pre-wrap;
  }
  .item-post-name {
    font-weight: 500;
  }
  .item-post-description {
    color: ${(props) => props.theme.greyDark};
    font-size: 14px;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${(props) => props.theme.greyDark};
  }
  .load-more-button {
    margin: 40px auto;
    max-width: 250px;
  }
`;

const PostManage = () => {
  const { userInfo } = useAuth();
  const [postList, setPostList] = useState();
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState();
  const [lastDoc, setLastDoc] = useState();
  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(4)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newSearch = search
        ? query(
            colRef,
            where("title", ">=", search),
            where("title", "<=", search + "utf8")
          )
        : query(colRef, limit(4));
      const documentSnapshots = await getDocs(newSearch);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newSearch, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [search]);
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
  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 500);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Post Manage Page";
  });
  if (userInfo?.role !== roleStatus.Admin) return null;
  return (
    <PostManageStyles>
      <DashboardHeading title="Post" desc="Manage your post">
        <div className="search-post">
          <input
            type="text"
            className="search"
            placeholder="Search post..."
            onChange={handleSearch}
          />
          <Button to="/manage/add-post" className="header-button" height="52px">
            Add New
          </Button>
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList?.map((post) => {
            const date = post?.createdAt?.seconds
              ? new Date(post?.createdAt?.seconds * 1000)
              : new Date();
            const formatDate = new Date(date).toLocaleDateString("vi-VI");
            return (
              <tr key={post.id}>
                <td title={post?.id}>{post.id?.slice(0, 5) + "..."}</td>
                <td>
                  <div className="item-post">
                    <img src={post.image} alt="" className="img-post" />
                    <div className="item-post-info">
                      <h3 className="item-post-name" title={post?.title}>
                        {post.title?.slice(0, 30) + "..."}
                      </h3>
                      <time className="item-post-description">
                        Date: {formatDate}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="item-post-description">
                    {post?.category?.name}
                  </span>
                </td>
                <td>
                  <span className="item-post-description">
                    {post?.user?.userName}
                  </span>
                </td>
                <td>{renderStatus(Number(post?.status))}</td>
                <td>
                  <div className="actions">
                    <ActionView
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post?id=${post.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDelete(post.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="load-more-button">
        {total > postList?.length && (
          <Button onClick={handleLoadMore}>Load More</Button>
        )}
      </div>
    </PostManageStyles>
  );
};

export default PostManage;
