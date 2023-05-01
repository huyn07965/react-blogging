import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { Layout } from "../components";
const ContactPageStyles = styled.div`
  padding: 10px 20px;
  .content-center {
    max-width: 820px;
    margin: 20px auto;
  }
  @media screen and (max-width: 600px) {
    padding: 0 20px;
  }
`;
const ContactPage = () => {
  const [contact, setContact] = useState({});
  useEffect(() => {
    async function fetchData() {
      const colRef = query(collection(db, "contact"));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setContact({
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, []);
  useEffect(() => {
    document.title = "Contact Page";
  });
  return (
    <Layout>
      <ContactPageStyles>
        <div className="content-center">
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{
              __html: contact?.content || "",
            }}
          ></div>
        </div>
      </ContactPageStyles>
    </Layout>
  );
};

export default ContactPage;
