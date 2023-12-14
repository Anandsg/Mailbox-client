import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./MainPage";
const ViewMail = () => {
  const { emailId } = useParams();
  const navigate = useNavigate();

  const email = useSelector((state) => {
    const emails = state.emails.emails;
    return emails.find((email) => email.id === emailId);
  });

  if (!email) {
    return <div>Email not found</div>;
  }
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen p-4 pt-40">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold px-2 text-indigo-500">
              Sent emails{" "}
            </h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate("/inbox")}
            >
              Back
            </button>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">
              <strong>Sender:</strong> {email.sender}
            </p>
            <p className="mb-4">
              <strong>Subject:</strong> {email.subject}
            </p>
            <p>
              <strong>Message:</strong> {email.text}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMail;
