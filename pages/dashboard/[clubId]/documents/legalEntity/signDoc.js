import React, { useEffect, useState } from "react";
import Layout1 from "../../../../../src/components/layouts/layout1";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import { makeStyles } from "@mui/styles";
import Web3 from "web3";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import LegalEntityModal from "../../../../../src/components/modals/LegalEntityModal";
import { useDispatch, useSelector } from "react-redux";
import { createDocument } from "../../../../../src/api/document";
import { MAIN_API_URL } from "../../../../../src/api";
import { addAdminFormData, addMembersData } from "../../../../../src/redux/reducers/legal";
const DocumentPDF = dynamic(() => import("../pdfGenerator"), {
  ssr: false,
});

const useStyles = makeStyles({
  btn: {
    width: "150px",
    fontFamily: "sans-serif",
    fontSize: "18px",
    border: "none",
    padding: "12px 20px",
    color: "white",
    background: "#3B7AFD",
    borderRadius: "6px",
    cursor: "pointer",
  },
  title: {
    fontSize: "28px",
  },
  container: {
    height: "90vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "60px",
  },
  signDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "65%",
  },
});

// const htmltoImage = () => {
//   // const domElement1 = document.getElementById("result1");
//   // console.log(domElement1);
//   const domElement = document.getElementsByClassName("comments-result");
//   const arr = [...domElement];
//   const generateImage = (domElement) => {
//     return html2canvas(domElement, {
//       onclone: (document) => {
//         document.getElementById("innerDiv").style.display = "block";
//       },
//       windowWidth: 1600,
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/jpeg", 1.0);
//       return imgData;
//     });
//   };

//   return Promise.all(arr.map((element) => generateImage(element)));
// };

const SignDoc = () => {
  const classes = useStyles();
  const [signedAcc, setSignedAcc] = useState("");
  const [signDoc, setSignDoc] = useState(false);
  const [signedHash, setSignedHash] = useState("");
  const [encryptedString, setEncryptedString] = useState("");
  const [decryptedDataObj, setDecryptedDataObj] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { clubId, isAdmin } = router.query;
  const dispatch = useDispatch()

  const adminFormData = useSelector((state) => {
    return state.legal.adminFormData;
  });

  const membersData = useSelector((state) => {
    return state.legal.membersData;
  });

  const encryptedData = useSelector((state) => {
    return state.legal.encryptedLink;
  });

  // signDocument
  const signDocumentHandler = async () => {
    try {
      const web3 = new Web3(window.ethereum);

      // current account
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];

      // console.log(currentAccount);
      const originalMessage = "YOUR_MESSAGE";

      // Signed message
      const signedMessage = await web3.eth.personal.sign(
        originalMessage,
        currentAccount,
        "test password!", // configure your own password here.
      );

      setSignedAcc(currentAccount);
      setSignDoc(true);
      setSignedHash(signedMessage);

      

    } catch (error) {
      console.log(error);
    }
  };

  // Encrypting admin's data and converting into URL
  const finishHandler = async () => {
    // Convert data into a JSON string
    const data = JSON.stringify({
      LLC_name: adminFormData.LLC_name,
      admin_name: adminFormData.admin_name,
      email: adminFormData.email,
      location: adminFormData.location,
      general_purpose: adminFormData.general_purpose,
      signedAcc: signedAcc,
      signedMessage: signedHash,
    });


    // Encrypt it using crypto-JS
    const encryptUserData = CryptoJS.AES.encrypt(data, "").toString();
    const replacedEncrytedLink = encryptUserData.replaceAll("/", "STATION");
    setEncryptedString(replacedEncrytedLink);
    console.log(replacedEncrytedLink)

   const res = createDocument({
      clubId: clubId,
      createdBy: signedAcc,
      fileName: "Legal Doc",
      isPublic: false,
      isSignable: true,
      isTokenForSign: true,
      docIdentifier: replacedEncrytedLink,
    });
    console.log(res.status);

    router.push({
      pathname: `/dashboard/${clubId}/documents`,
      query: {
        encryptedLink: replacedEncrytedLink,
      },
    });
  };

  // member signed and finished
  const finishMemberSignHandler = () => {
    alert("Successfully signed!");
    router.push(`/dashboard/${clubId}`);
  };

  // admin data from encrypted URL
  const fetchAdminsData = () => {
    const newEncryptedLink = encryptedData?.replaceAll("STATION", "/");
    // console.log(newEncryptedLink);
    // decrypt url
    if (newEncryptedLink) {
      const bytes = CryptoJS.AES.decrypt(newEncryptedLink, "");
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecryptedDataObj(decryptedData);
      console.log(decryptedData);
    }
  };


  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    fetchAdminsData();
  }, [encryptedData]);

  return (
    <div>
      <Layout1>
        <div className={classes.container}>
          <div className={classes.signDiv}>
            <h2 className={classes.title}>Review and Confirm</h2>
            {!signDoc && (
              <button onClick={signDocumentHandler} className={classes.btn}>
                Sign PDF
              </button>
            )}
            {signDoc && isAdmin && (
              <button onClick={finishHandler} className={classes.btn}>
                Finish
              </button>
            )}

            {signDoc && membersData && !isAdmin && (
              <button onClick={finishMemberSignHandler} className={classes.btn}>
                Finish
              </button>
            )}
          </div>

          {decryptedDataObj && !isAdmin ? (
            <DocumentPDF
              signedAcc={signedAcc}
              signedHash={signedHash}
              LLC_name={decryptedDataObj.LLC_name}
              admin_name={decryptedDataObj.admin_name}
              email={decryptedDataObj.email}
              location={decryptedDataObj.location}
              general_purpose={decryptedDataObj.general_purpose}
              member_name={membersData.member_name}
              amount={membersData.amount}
              member_email={membersData.member_email}
              admin_sign={decryptedDataObj.signedAcc}
            />
          ) : (
            <DocumentPDF
              signedAcc={signedAcc}
              signedHash={signedHash}
              LLC_name={adminFormData?.LLC_name}
              admin_name={adminFormData?.admin_name}
              email={adminFormData?.email}
              location={adminFormData?.location}
              general_purpose={adminFormData?.general_purpose}
            />
          )}

          {/* <PDFViewer
        //   showToolbar={false}
          style={{ height: "100%", width: "90vw" }}
        >
          <MyDocument title="Personal Doc" data={formData} />
        </PDFViewer> */}
        </div>
        {/* <button>
        <PDFDownloadLink
          document={<MyDocument title="personal doc" data={formData || {}} />}
          fileName="formDataabc.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a",
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Pdf"
          }
        </PDFDownloadLink>
        Download
      </button> */}
        {/* <button
        onClick={() => {
          htmltoImage().then((imgSrcArr) => {
            import("./PdfGenerator")
              .then(async (module) => {
                const PdfFile = module.default;
                const doc = (
                  <PdfFile
                    title="Personal Doc"
                    data={formData}
                    srcArr={imgSrcArr}
                  />
                );
                const blob = await pdf(doc).toBlob();
                saveAs(blob, "pdfdoc.pdf");
              })
              .catch((error) => console.log("error====>", error));
          });
        }}
      >
        Download PDF
      </button> */}
        {/* {checkForEmptyFields() && (
        <PDFDownloadLink
          document={<PdfFile data={formData} />}
          fileName="formDataabc.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a"
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Pdf"
          }
        </PDFDownloadLink>
      )} */}
        {/* <LineGraph /> */}
      </Layout1>

      
    </div>
  );
};

export default SignDoc;
