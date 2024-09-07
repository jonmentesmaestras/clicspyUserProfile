import './App.css';
import Toolbar from "./components/Toolbar";
import Form from "./views/form/Form";
import React, { useEffect } from "react";
import { NAME_HEADER_AUTH, URL_API_USER_TRACK, URL_LOGIN } from "./utils/Constants";
import { getStoredValue } from "./services/UseLocalStorage";
import RequestSvc from "./services/RequestSvc";
import ProfilePage from './views/ProfilePage/ProfilePage';
import { BrowserRouter } from 'react-router-dom';

async function addTrack() {
    const queryParameters = new URLSearchParams(window.location.search)
    const src = queryParameters.get('src') ?? ""
    let url = URL_API_USER_TRACK + `?evento=Profilet&src=${src}`
    let requestSvc = new RequestSvc();
    let result = await requestSvc.get(url)
    if (result.status_code === 401) {
        window.location.href = URL_LOGIN;
    }
}

function App() {
    useEffect(() => {
        addTrack()
    }, []);
    const auth = getStoredValue(NAME_HEADER_AUTH);
    if (!auth) {
        window.location.href = URL_LOGIN;
    }
    console.log(getStoredValue(NAME_HEADER_AUTH));

    return (
        <div className="main-layout-app">
            <BrowserRouter>
                <Toolbar />
                {/* <Form/> */}
                <ProfilePage />
            </BrowserRouter>
        </div>
    );
}

export default App;
