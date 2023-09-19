import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import { Layout } from "../components";
import axios from "axios";
import { baseUrl } from "../utils/constants";

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
    async function getData() {
      await axios
        .get(baseUrl.getContact + "64e193ea5ca8feebbb89fa8c")
        .then((result) => setContact(result.data.content))
        .catch((err) => console.log(err));
    }
    getData();
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
              __html: contact || "",
            }}
          ></div>
        </div>
      </ContactPageStyles>
    </Layout>
  );
};

export default ContactPage;
