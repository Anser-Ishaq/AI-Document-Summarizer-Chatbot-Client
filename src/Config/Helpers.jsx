class Helpers {

    static loadScript(scriptUrl) {
        return new Promise((resolve, reject) => {
            const scriptPath = `/${scriptUrl}`;
            const script = document.createElement("script");
            script.src = scriptPath;
            script.async = true;

            script.onload = () => resolve(script);
            script.onerror = () =>
                reject(new Error(`Script load error: ${scriptPath}`));

            document.body.appendChild(script);
        });
    }
}

export default Helpers;
