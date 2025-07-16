//page.jsx
import Header from "../Components/Header";
import UsContent from "./UsContent";

export default async function Page() {
    return (
        <div>
            <Header/>
            {/*Programar apartir de aqui el contenido de Nosotros */}
            <UsContent/>
        </div>
    )
}