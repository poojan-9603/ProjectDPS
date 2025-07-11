function generateCredentials(name, orgCode = "uic") {
    const username = name.toLowerCase().replace(/\s+/g, '').slice(0, 6)
    const randomNumber = Math.floor (100 + Math.random() * 9000);
    const email = username + randomNumber + "@" + orgCode + ".edu";
    const password = username+"@"+randomNumber;
    return {username, email, password};
}

export default generateCredentials;
