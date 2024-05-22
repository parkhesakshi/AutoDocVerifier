import React, { useEffect, useState } from "react";
import "./index.scss";
import Verified from "./Verified";
import Unverified from "./Unverified";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDocuments } from "../../functions/doc";

const Verify = () => {
  const { authenticated, userid } = useSelector((state) => state.user);

  const [userDocInfo, setUserDocInfo] = useState({});
  const [userDocs, setUserDocs] = useState([]);
  const [docLoading, setDocLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setDocLoading(true);
    getDocumentsFun();
  }, []);

  const getDocumentsFun = () => {
    setDocLoading(true);
    getDocuments(userid)
      .then((res) => {
        setUserDocInfo(res.data.doc_info);
        setUserDocs(res.data.docs);
        setTimeout(() => {
          setDocLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <div className="doc_verifier">
      <Unverified
        userDocInfo={userDocInfo}
        userDocs={userDocs}
        getDocumentsFun={getDocumentsFun}
        docLoading={docLoading}
      />
      <Verified
        userDocInfo={userDocInfo}
        userDocs={userDocs}
        getDocumentsFun={getDocumentsFun}
        docLoading={docLoading}
      />
    </div>
  );
};

export default Verify;
