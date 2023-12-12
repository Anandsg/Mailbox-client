import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ value, onChange }) => {
    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handleSendEmail = () => {
        console.log('Sending email:', editorContent);
    };
    return (
        <div className="max-w-screen-md mx-auto my-8">
            <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={handleEditorChange}
                modules={TextEditor.modules}
                formats={TextEditor.formats}
                placeholder="Write your email..."
                className='h-80'
            />
            <div className="mt-16 flex justify-between items-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    onClick={handleSendEmail}
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
