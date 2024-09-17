import { useEffect, useState } from "react";

// Aqui se almacenara la data que hayamos hecho peticion con anterioridad
// para reusarla cuando se la vuelva a pedir y mejorar la eficiencia
const localCache = {};

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        errorMessage: null
    });


    useEffect(() => {
        // Solo se ejecuta la primera vez que carga el componente
        getFetch();

    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            errorMessage: null
        });
    };

    const getFetch = async () => {

        if (localCache[url]) {
            console.log('Usando cache');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                errorMessage: null
            })

            return;
        }

        setLoadingState();
        await new Promise(resolve => setTimeout(resolve, 500)); // Esperar unos segundos antes de cargar la peticion

        const resp = await fetch(url);

        // Si hay algun error en la peticion
        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                errorMessage: resp.status
            });

            return;
        };

        // En caso de no haber error
        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            errorMessage: null
        });

        // Manejo del cache
        localCache[url] = data;
    };


    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    };
};
