import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [text, setText] = useState("");

    const recipientRef = useRef(null);
    const subjectRef = useRef(null);
    const quillRef = useRef(null);

    const userEmail = localStorage.getItem("userEmail");

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }

    const handleTextChange = (value) => {
        setText(value);
    };

    const sanitizeHtml = (html) => {
        return html.replace(/<\/?p>/g, "");
    };

    const handleSendClick = () => {
        const sanitizedText = sanitizeHtml(text);

        fetch(
            "https://mailbox-client-62c32-default-rtdb.firebaseio.com/email.json",
            {
                method: "POST",
                body: JSON.stringify({
                    recipient,
                    subject,
                    text: sanitizedText,
                    sender: userEmail,
                    blueTick: true,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            }
        )

            .then((response) => response.json())
            .then((data) => {
                console.log("Email sent successfully!");

                setRecipient("");
                setSubject("");
                quillRef.current.getEditor().setContents([]);
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
    };
    return (
        <div className="flex flex-col mt-16 mx-auto w-6/12 justify-start">
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Recipient's email"
                    value={recipient}
                    onChange={handleRecipientChange}
                    ref={recipientRef}
                    required
                    className="border border-gray-300 p-2 w-7/12 text-sm focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    ref={subjectRef}
                    className="border border-gray-300 p-2 w-7/12  text-sm focus:outline-none focus:border-blue-500"
                />
            </div>
            <ReactQuill
                theme="snow"
                value={text}
                onChange={handleTextChange}
                modules={TextEditor.modules}
                formats={TextEditor.formats}
                ref={quillRef}
                placeholder="Write your email..."
                className='h-80'
            />
            <div className="mt-16 flex justify-between items-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    onClick={handleSendClick}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

TextEditor.modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false,
    },
};

TextEditor.formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
];

export default TextEditor;
