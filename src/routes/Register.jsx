import Navbar from "../components/Navbar/Navbar"
import Form from "../components/Form/Form"
const Login = () => {
    return (
        <>
            <Navbar/>
            <Form type="Register" onSubmit={()=>{console.log("Registered");}}/>
        </>
    )
}

export default Login;