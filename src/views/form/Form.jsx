import TextAreaComponent from "../../components/TextAreaComponent";
import Ghost from "../../assets/img_ghost_packman.png"
import React, {useState} from "react";
import RequestSvc from '../../services/RequestSvc';
import {URL_API_GHOST} from "../../utils/Constants";

export default function Form() {

    let [userText, setUserText] = useState("")
    let [encryptedText, setEncryptedText] = useState("")

    /**
     * Deshabilitar click derecho.
     * @returns {boolean}
     */
    document.oncontextmenu = function () {
        return false;
    }

    /**
     * Enviar la información al servidor.
     * @param event
     * @returns {Promise<void>}
     */
    const submit = async (event) => {
        let svc = new RequestSvc();
        let result = await svc.post(URL_API_GHOST, {"payload": userText});
        if (result.error) {
            alert("No logramos procesar su solicitud")
        }
        setEncryptedText(result.data)
    }

    /**
     * Copiar al portapapeles
     * @param event
     * @returns {Promise<void>}
     */
    const copiar = async (event) => {
        // Copiar al portapapeles
        await navigator.clipboard.writeText(encryptedText)
    }

    return (
        <div className={"form-layout"}>
            <div className={"form-wrapper-textarea"}>
                <label className={"form-label"}>Escriba debajo el texto que desea ocultar</label>
                <TextAreaComponent onChange={(text) => setUserText(text)}/>
                <button className={"form-button"} onClick={submit}>Generar</button>
            </div>
            <img src={Ghost} className={"image-ghost"}/>
            <div className={"form-wrapper-textarea"}>
                <label className={"form-label"}>Tu texto oculto ha sido generado. Esto lo puedes usar en tus anuncios y
                    páginas.</label>
                <TextAreaComponent readOnly={true} textValue={encryptedText}/>
                <button className={"form-button"} onClick={copiar}>Copiar</button>
            </div>
        </div>
    );
}