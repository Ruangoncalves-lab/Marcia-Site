import { Render } from "@measured/puck";
import { config } from "./puck.config";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { useLocation } from "react-router-dom";
import { defaultHomeData, defaultAboutData } from "./defaultPuckData";

export const Page = () => {
    const location = useLocation();
    const path = location.pathname;
    const storageKey = `puck-data-${path}`;

    const data = localStorage.getItem(storageKey)
        ? JSON.parse(localStorage.getItem(storageKey)!)
        : (path === '/' ? defaultHomeData : defaultAboutData);

    return (
        <div className="min-h-screen bg-surface-page flex flex-col font-body text-text-primary pt-[130px]">
            <Navbar />
            <main className="flex-grow">
                {/* Render the saved blocks via Puck Render */}
                <Render config={config} data={data} />
            </main>
            <Footer />
        </div>
    );
};
