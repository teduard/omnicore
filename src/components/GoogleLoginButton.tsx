function GoogleLoginButton() {
    const cookies:any = document.cookie.split(';').reduce(
        (cookies:any, cookie:any) => {
            const [name, val] = cookie.split('=').map( (c:any) => c.trim());
            cookies[name] = val;
            return cookies;
        }, {});
    
        let SessionInitiated:boolean = false;
        let SessionUsername:string|undefined = "username";
        let SessionEmail:string|undefined = "email";
    
        if(cookies["SessionInitiated"] === "true") {
          SessionInitiated = true;
          SessionUsername = decodeURIComponent(cookies["SessionUsername"]);
          SessionEmail = decodeURIComponent(cookies["SessionEmail"]);
        }

return <>
{SessionInitiated && <>
        <h2>Welcome, {SessionUsername}</h2>
        <section>
            You are logged in with <b>{SessionEmail}</b>
            <h3><a href={`${import.meta.env.VITE_API_URL}/api/logout`}>Logout</a></h3>
        </section>
        <div className="card">
            <hr/>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        {/* <p>Choose your subscription plan</p>
       <section style={{"marginBottom":"30px"}}>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Basic plan</h3>
      <h5>$18.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Subscribe
      </button>
    </form>
    <br/><br/><br/>
  </section>
  <section style={{"marginBottom":"30px"}}>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Premium plan</h3>
      <h5>$28.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Subscribe
      </button>
    </form>
    <br/><br/><br/>
  </section> */}
      </div>
      </>}
{!SessionInitiated && <>
    <script src="https://accounts.google.com/gsi/client" async></script>
    <div id="g_id_onload"
        data-client_id="865058847126-l74fvjvf0m9ltn80lar89od54p8emjjo.apps.googleusercontent.com"
        data-login_uri={`${import.meta.env.VITE_API_URL}/api/login`}
        data-auto_prompt="false">
    </div>
    <div className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        //data-text="sign_in_with"
        data-text="continue_with"
        data-shape="rectangular"
        data-logo_alignment="center">
    </div>
    {/* <div className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left">
    </div> */}
    </>}
</>
}

export default GoogleLoginButton