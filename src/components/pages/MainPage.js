import { faInbox, faPaperPlane, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { fetchEmails } from '../store/emailSlice';
import { useDispatch } from 'react-redux';


const Header = () => {
    const dispatch = useDispatch();

    const sentHanlder = () => {
        dispatch(fetchEmails());
        console.log(dispatch)
    }

    return (
        <>
            <div className='shadow-lg p-4 flex items-center justify-between'>
                <div>
                    <p className='font-semibold text-xl text-indigo-700 px-8'>Email Flow</p>
                </div>
                <div className="flex space-x-4 px-10 items-center">
                    <Link to='/compose' className="flex items-center px-3">
                        <FontAwesomeIcon icon={faPencil} className="mr-2" />
                        <p className='px-1'>Compose</p>
                    </Link>
                    <Link to='/inbox' className='flex items-center px-3'>
                        <FontAwesomeIcon icon={faInbox} className='mr-2' />
                        <p className='px-1'>Inbox</p>
                    </Link>
                    <Link to='/sent' className="flex items-center px-3">
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        <p onClick={sentHanlder}
                            className='px-1'>Sent Items</p>
                    </Link>
                </div>

            </div>
        </>
    );
}

export default Header;
