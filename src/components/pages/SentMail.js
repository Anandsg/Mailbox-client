import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllEmails } from "../store/emailSlice";
import { Link, useNavigate } from "react-router-dom";
import Header from "./MainPage";

const SentEmail = () => {
    const userEmail = localStorage.getItem("userEmail");
    const [senderData, setSenderData] = useState([]);
    const allEmails = useSelector(selectAllEmails);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("User Email:", userEmail);
        console.log("All Emails:", allEmails);
        const filteredData = allEmails.filter((email) => email.sender === userEmail);
        console.log("Filtered Data:", filteredData);
        setSenderData(filteredData);
    }, [userEmail, allEmails]);


    const backHandler = () => {
        navigate("/compose");
    };

    console.log("Filtered Sent Emails:", senderData);

    return (
        <>
            <Header />
            <div className="max-w-xl mx-auto p-4 pt-52">
                <div className="mb-4"></div>
                <div className="bg-white text-black shadow-md rounded p-4">
                    <ul className="list-none p-0">
                        {senderData.map((sender) => (
                            <div key={sender.id} className="mb-4">
                                <Link
                                    to={`/emails/${sender.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    <li>
                                        <strong className="block text-black mb-2">Recipient: {sender.recipient}</strong>
                                        <span className="block">Subject: {sender.subject}</span>
                                    </li>
                                </Link>
                            </div>
                        ))}
                        {senderData.length === 0 && (
                            <p className="text-gray-500">No sent emails to display.</p>
                        )}
                    </ul>
                </div>
                <button
                    className="my-8 px-2 py-1 border border-gray-300 rounded"
                    onClick={backHandler}
                >
                    Back
                </button>
            </div>
        </>
    );
}

export default SentEmail;
