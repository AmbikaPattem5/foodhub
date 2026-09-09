function Login(){
    function handleSubmit(){}
    function handleChange(){}
    return(
        <div>
            <h3>Welcome Back</h3>
            <p>Login to your FoodHub account</p>
            <form onSubmit={handleSubmit}>
                <label>Email or Username</label>
                <input type="text" name="nameoremail" value={} onChange={handleChange}/>
                <label>Password</label>
                <input type="password" name="password" value={} onChange={handleChange}/>
                <input type="checkbox" name="remember" checked={} onChange={handleChange}/>
                <label>Remember me</label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;