import Header from "../Components/Header";
import Footer from "../home/Footer";
import SustainabilityContent from "./SustainabilityContent";

export default async function Page() {
    return (
        <div>
            <Header/>
            {/*Programar apartir de aqui el contenido de Sostenibilidad */}
            <SustainabilityContent/>
            <Footer/>

        </div>
    )
}