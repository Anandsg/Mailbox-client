import React from 'react';
import TextEditor from './TextEditor';
import Header from './MainPage';

const Compose = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col mt-16 mx-auto w-6/12 justify-start">
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Recipient's email"
                        className="border border-gray-300 p-2 w-7/12 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="">
                    <input
                        placeholder="Subject"
                        className="border border-gray-300 p-2 w-7/12  text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className=''>
                    <TextEditor />
                </div>

            </div>
        </>
    );
};

export default Compose;
