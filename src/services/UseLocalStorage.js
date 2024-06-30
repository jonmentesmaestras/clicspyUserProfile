import {useState} from "react";

/**
 * Configurar valores en el local storage
 * @param key
 * @param defaultValue
 * @returns {(any|setLocalStoreValue)[]}
 * @constructor
 */
export function UseLocalStorage(key, defaultValue) {
    const [storedValue, setStoreValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : defaultValue
        } catch (e) {
            return defaultValue;
        }
    });
    const setLocalStoreValue = value => {
        try {
            setStoreValue(value)
            localStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            console.log(e)
        }
    }
    return [storedValue, setLocalStoreValue]
}

/**
 * Obtener los valores del local storage
 * @param key
 * @returns {any|boolean}
 */
export function getStoredValue(key) {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : false
}

/**
 * Eliminar una key y valor del local storage
 * @param key
 * @returns {boolean}
 */
export function deleteStoredValue(key) {
    localStorage.removeItem(key)
    return true;
}