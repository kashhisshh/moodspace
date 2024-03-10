const RegistrationForm = () => {
    return <div>
        <form>
            <div>
                <label>Username or email</label>
                <input type="text" name="username"/>
                <input type="password" name="password"/>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
}

export default RegistrationForm;