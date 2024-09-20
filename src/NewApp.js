import './App.css';
import Toolbar from "./components/Toolbar";
import Form from "./views/form/Form";
import React, { useEffect } from "react";
import { NAME_HEADER_AUTH, URL_API_USER_TRACK, URL_LOGIN } from "./utils/Constants";
import { getStoredValue } from "./services/UseLocalStorage";
import RequestSvc from "./services/RequestSvc";
import ProfilePage from './views/ProfilePage/ProfilePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

    return (
        <div className="main-layout-app">
            <BrowserRouter>
                <Toolbar />
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    {/* Si quieres agregar otras páginas, puedes definir más rutas aquí */}
                    <Route path="/form" element={<Form />} />
                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
