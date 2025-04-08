import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useClarityPageView = () => {
    const location = useLocation();

    useEffect(() => {
        // 스크립트가 이미 삽입되어 있는지 확인
        const existing = document.querySelector("script[src*='clarity.ms']");
        if (!existing) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.innerHTML = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            console.log("✅ Clarity script injected");
        })(window, document, "clarity", "script", "r0rhnl5ffn");
      `;
            document.head.appendChild(script);
        } else {
            console.log("ℹ️ Clarity script already loaded");
        }
    }, []);

    useEffect(() => {
        // 페이지 이동 시 커스텀 태그 전송
        if (window.clarity) {
            console.log("📍 Clarity pageview:", location.pathname);
            window.clarity("set", "current_page", location.pathname);

            if (location.pathname.startsWith("/dashboard")) {
                window.clarity("set", "on_dashboard", true);
            }
        }
    }, [location]);
};

export default useClarityPageView;
