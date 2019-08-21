const isUser = () => {
    //cookie to db compare and logic
    if (req.headers.cookie) {
		const cookies = parseCookies(req.headers.cookie);
        console.log(cookies.sessionid);
        //find session in db that matecyes
	} else {
		console.log('no session yet');
	}	
}

module.exports= isUser;