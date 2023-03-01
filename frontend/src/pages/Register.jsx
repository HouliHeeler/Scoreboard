import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import { login, register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {nbaTeams} from '../app/constants'


function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        favouriteTeam: 'Atlanta Hawks'
    })

    const {name, email, password, password2, favouriteTeam} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        user, 
        isError, 
        isLoading, 
        isSuccess, 
        message
    } = useSelector((state) => state.auth) 

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        
        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset)

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Passwords do not match')
        }else {
            const userData = {name, email, password, favouriteTeam}

            dispatch(register(userData))
        }
    }

    const browse = (e) => {
        e.preventDefault()

        const userData = {
            email: "test@user.com", 
            password: "1234",
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return <div className='container--body'>
        <section className='heading'>
            <h1>
                <FaUser />Register
            </h1>
            <p>Please Create an Account</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input 
                        className='form-control' 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={name} 
                        placeholder="Enter Your Name" 
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <input 
                        className='form-control' 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        placeholder="Enter Your Email" 
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <input 
                        className='form-control' 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        placeholder="Create Password" 
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <input 
                        className='form-control' 
                        type="password" 
                        id="password2" 
                        name="password2" 
                        value={password2} 
                        placeholder="Confirm Password" 
                        onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <span>Select Your Favourite Team</span>
                    <select
                        className='form-control'
                        type="dropdown"
                        id='favouriteTeam'
                        name='favouriteTeam'
                        value={favouriteTeam}
                        placeholder="Select Favourite Team"
                        onChange={onChange}
                    >
                        {nbaTeams.map((option, idx) => (
                        <option key={idx}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>Submit</button>
                </div>
            </form>
            <button onClick={browse} className="btn btn-block">Just Looking?</button>
        </section>
    </div>
}

export default Register