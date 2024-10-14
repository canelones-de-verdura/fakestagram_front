export async function register(default_url, usrname, email, passwd) {
    const creds = {
        username: usrname,
        email: email,
        password: passwd,
    };

    const response = await fetch(`${default_url}/auth/register`, {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const status = `Auth.js - register(): ${response.status}, ${response.statusText}`;
    console.log(status);

    if (!response.ok)
        return;

    const user = await response.json();

    return user;
}

export async function login(default_url, email, passwd) {
    const creds = {
        email: email,
        password: passwd,
    };

    const response = await fetch(`${default_url}/auth/login`, {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const status = `Auth.js - login(): ${response.status}, ${response.statusText}`;
    console.log(status);

    if (!response.ok)
        return;

    const user = await response.json();

    return user;
}
