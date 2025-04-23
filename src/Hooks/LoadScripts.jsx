import { useEffect } from "react";
import Helpers from "../Config/Helpers";

const LoadScripts = () => {
  useEffect(() => {
    const loadScripts = async () => {
      const scripts = [
        "assets/js/plugins/jquery.min.js",
        "assets/js/plugins/bootstrap.min.js",
        "assets/js/plugins/swiper.js",
        "assets/js/main.js",
        "assets/js/fileUpload.js"
      ];

      try {
        for (let script of scripts) {
          await Helpers.loadScript(script);
        }
      } catch (error) {
        console.error("Script loading failed:", error);
      }
    };

    window.addEventListener("load", loadScripts);

    return () => {
      window.removeEventListener("load", loadScripts);
    };
  }, []);
};

export default LoadScripts;
