

import AboutSection from "./components/AboutSection";

import HeroSection from "./components/HeroSection";
import InteriorSection from "./components/InteriorSection";


export default function Main(){
    return(
        <div className="main">
            
            <HeroSection/>
            <AboutSection/>
            <InteriorSection />
            
        </div>

    )
}