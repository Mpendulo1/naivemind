import {useContext} from 'react'
import { UserContext } from '../contexts/UserContext'
import FormButton from './FormButton';

function LogoutModal() {
  const {user, logoutUser, modalIsVisible} = useContext(UserContext);
  return (
    <div className={`flex flex-col items-center fixed w-3/4 pt-4 px-4 top-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-xl bg-red-200 shadow-gray-700 shadow-2xl drop-shadow-4xl  ${!user ? "hidden" : user && modalIsVisible ? "" : "hidden" }`}>
        <div className="w-full flex flex-col">
          <p>Bye.</p>
            <FormButton handleOnClick={logoutUser}  title="logout" textColor='text-white' bgColor="bg-red-500" />
        </div>
    </div>
  )
}

export default LogoutModal