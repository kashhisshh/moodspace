import Navbar from "../components/Navbar/Navbar"
import Form from "../components/Form/Form"
const Login = () => {
    return (
        <>
            <Navbar/>
            <Form type="Login" onSubmit={()=>{console.log("Loggin In");}}/>
        </>
    )
}

export default Login;