import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmailsPeriodically, selectAllEmails } from "../store/emailSlice";
import { Link } from "react-router-dom";
import useDeleteRequest from "../hooks/useDelete";
import Header from "./MainPage";

const Inbox = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);

    const { deleteResource, isDeleting } = useDeleteRequest();

    const backHandler = () => {
        navigate("/compose");
    };

    useEffect(() => {
        dispatch(fetchEmailsPeriodically());
    }, [dispatch]);

    const emails = useSelector(selectAllEmails);

    const [unreadCount, setUnreadCount] = useState(0);

    const filteredEmails = emails.filter(
        (email) => email.recipient === userEmail
    );

    const markEmailAsUnread = (emailId) => {
        console.log(emailId);
        fetch(
            `https://mailbox-client-62c32-default-rtdb.firebaseio.com/email/${emailId}.json`
        )
            .then((response) => response.json())

            .then((emailData) => {
                emailData.blueTick = false;

                fetch(
                    `https://mailbox-client-62c32-default-rtdb.firebaseio.com/email/${emailId}.json`,
                    {
                        method: "PUT",
                        body: JSON.stringify(emailData),
                        headers: {
                            "Content-type": "application/json",
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Email marked as unread in Firebase");
                    })
                    .catch((error) => {
                        console.error("Error marking email as unread in Firebase:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching email data:", error);
            });
    };

    const deleteEmail = (emailId) => {
        deleteResource(
            `https://mailbox-client-62c32-default-rtdb.firebaseio.com/email/${emailId}.json`
        )
            .then((data) => {
                console.log("Email deleted from Firebase");
                dispatch({ type: "email/deleteEmail", payload: emailId });
            })
            .catch((error) => {
                console.error("Error deleting email:", error);
            });
    };

    const countUnreadMessages = () => {
        const count = filteredEmails.filter((email) => email.blueTick).length;
        setUnreadCount(count);
    };

    useEffect(() => {
        countUnreadMessages();
    }, [filteredEmails]);

    return (
        <>
            <Header />
            <div className="max-w-md mx-auto mt-40">
                <div className="bg-white shadow-md p-6 rounded">
                    <h2 className="text-xl font-bold mb-4">Emails</h2>
                    <div className="mb-4">Unread: {unreadCount}</div>
                    <ul>
                        {filteredEmails.length > 0 ? (
                            filteredEmails.map((email) => (
                                <div key={email.id} className="flex items-center mb-4">
                                    <button
                                        className="text-red-500"
                                        onClick={() => deleteEmail(email.id)}
                                    >
                                        <img
                                            src="https://cdn4.iconfinder.com/data/icons/round-buttons/512/blue_x.png"
                                            alt="Delete"
                                            className="w-4 h-4"
                                        />
                                    </button>
                                    <Link to={`/emails/${email.id}`} className="ml-2">
                                        <li
                                            className={`cursor-pointer ${email.blueTick ? "opacity-50" : ""
                                                }`}
                                            onClick={() => markEmailAsUnread(email.id)}
                                        >
                                            <strong>Sender:</strong> {email.sender} |{" "}
                                            <strong>Subject:</strong> {email.subject}
                                        </li>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No emails to display.</p>
                        )}
                    </ul>
                </div>
                <div className="mt-4">
                    <button className="text-blue-500 px-4" onClick={backHandler}>
                        Back
                    </button>
                </div>
            </div>
        </>
    );
};
export default Inbox;
