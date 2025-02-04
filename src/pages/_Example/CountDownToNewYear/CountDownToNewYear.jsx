import Timer from "../../../components/_Example/Timer/Timer.jsx";
import Snow from "../../../components/_Example/Snow/Snow.jsx";

import styles from "./CountDownToNewYear.module.css";
import Navbar from "../../../components/Navbar/Navbar.jsx";
import {useEffect} from "react";

function CountDownToNewYear({ pageTitle }) {

    useEffect(() => {
        document.title = pageTitle;
    })

    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <Snow/>
            <Timer
                event={"до Нового года осталось:"}
                date_of_event_string={`${new Date().getFullYear() + 1}-01-01T00:00:00.000Z`}/>
        </div>
    )
}

export default CountDownToNewYear
