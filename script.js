async function onLoginClick(){
    const clientId = ""; //Your client id (from your spotify developers project dashboard)
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
        
        await redirectToAuthCodeFlow(clientId);
        
        await handleAuthenticatedFlow(clientId, code);

        await fullDataCollect(localStorage.getItem("token"));
    } else {
        // Code is already present, so proceed with the authenticated flow.
        await handleAuthenticatedFlow(clientId, code);
    }
}

    async function redirectToAuthCodeFlow(clientId) {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://localhost:5173/page02_analysis.html");
        params.append("scope", "user-read-private user-read-email user-top-read user-follow-read");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    async function handleAuthenticatedFlow(clientId, code) {
        const accessToken = await getAccessToken(clientId, code);
        localStorage.setItem("token", accessToken);
    }
    

    function generateCodeVerifier(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    async function getAccessToken(clientId, code) {
        const verifier = localStorage.getItem("verifier");
    
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:5173/page02_analysis.html");
        params.append("code_verifier", verifier);
    
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });
    
        if (result.status === 200) {
            const data = await result.json();
            const accessToken = data.access_token;
    
            if (accessToken) {
                // Store the access token in localStorage
                return accessToken;
            } else {
                console.error("Access token not found in the API response");
                return null;
            }
        } else {
            console.error("Failed to get access token from the API");
            return null;
        }
    }
    


async function fullDataCollect(accessToken){

    const profile = await fetchProfile(accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
    
    const topTracks = await fetchTopTracks(accessToken);
    localStorage.setItem("topTracks", JSON.stringify(topTracks));

    const topRecentArtist = await fetchTopRecentArtist(accessToken);
    localStorage.setItem("topRecentArtist", JSON.stringify(topRecentArtist));

    const topArtists = await fetchTopArtists(accessToken);
    localStorage.setItem("topArtists", JSON.stringify(topArtists));

    const userFollowRead = await fetchUserFollowRead(accessToken);
    localStorage.setItem("userFollows", JSON.stringify(userFollowRead));

    async function fetchProfile(token) {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    }

    async function fetchTopTracks(token) {
        const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=20", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    }

    async function fetchTopRecentArtist(token) {
        const result = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=1", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    }

    async function fetchTopArtists(token) {
        const result = await fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    }

    async function fetchUserFollowRead(token) {
        const result = await fetch("https://api.spotify.com/v1/me/following/contains?type=artist&ids=5uemEEtB1ZC3s1KM7gReeH%2C0NZtn1Kyq08alpHCTRf3dv%2C5NHm4TU5Twz7owibYxJfFU%2C008PpLcKUtVXle6JSwkq3I%2C06HL4z0CvFAxyc27GXpf02%2C6LEG9Ld1aLImEFEVHdWNSB%2C5pKCCKE2ajJHZ9KAiaK11H%2C3TVXtAsR1Inumwj472S9r4%2C7dGJo4pcD2V6oG8kP0tJRR%2C4gzpq5DPGxSnKTe4SA8HAU%2C0C8ZW7ezQVs4URX5aX7Kqx%2C69GGBxA162lTqCwzJG5jLp%2C4YRxDV8wJFPHPTeXepOstw%2C1wRPtKGflJrBx9BmLsSwlU%2C1Xyo4u8uXC1ZmMpatF05PJ%2C04gDigrS5kc9YWfZHwBETP%2C4AK6F7OLvEQ5QYCBNiQWHq%2C5Rl15oVamLq7FbSb0NNBNy%2C6eUKZXaKkcviH0Ku9w2n3V%2C5K4W6rqBFWDnAN6FQUkS6x%2C1uNFoZAHBGtllmzznpCI3s%2C53XhwfbYqKCa1cC15pYq2q%2C7CajNmpbOovFoOoasH2HaY%2C66CXWjxzNUsdJxJ2JdwvnR%2C246dkjvS1zLTtiykXe5h60%2C6qqNVTkY8uBg9cP3Jd7DAH%2C13ubrt8QOOCPljQ2FL1Kca%2C0Y5tJX1MQlPlqiwlOH1tJY%2C0EmeFodog0BfCgMzAIvKQp%2C7n2wHs1TKAczGzO7Dd2rGr%2C60d24wfXkVzDSfLS6hyCjZ%2C6M2wZ9GZgrQXHCFfjv46we%2C5ZsFI1h6hIdQRw2ti0hz81%2C6KImCVD70vtIoJWnq6nGn3%2C1mYsTxnqsietFxj1OgoGbG%2C5f4QpKfy7ptCHwTqspnSJI%2C0oOet2f43PA68X5RxKobEy%2C1dVygo6tRFXC8CSWURQJq2", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        return await result.json();
    }
}