import Navbar from "../components/Navbar/Navbar.jsx";
import styles from "../page-styles/Home.module.css";
import {useEffect, useState} from "react";
import Modal from "../components/Modal/Modal.jsx";
import {crudCreate, crudRead, crudUpdate, crudDelete, crudReadMany, crudDeleteMany} from "../utils/crud.js";
import DragonTable from "../components/Table/DragonTable.jsx";
import CreateDragon from "../components/CreateDragon/CreateDragon.jsx";
import {useAuth} from "../components/utils/AuthProvider.jsx";

function Home({ pageTitle }) {
    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";

    const { logout } = useAuth();

    const [createDragonModalActive, setCreateDragonModalActive] = useState(false);

    const [tableReload, setTableReload] = useState(false);

    useEffect(() => {
        document.title = pageTitle;
    })

    const loadDataWrapper = async (func, args) => {
        try {
            const response = await func(...args);

            if (!response.ok) {
                if (response.status === 401)  {
                    console.log("401 Error processing table refresh")
                    logout();
                }
                throw new Error();
            }

            let responseData;
            try {
                responseData = await response.json();
            } catch (error) {
                console.error("Error reading response body", error);
            }
            console.log(responseData)
            return responseData;
            // раньше setReload(true) был тут
        } catch (error) {
            console.error("Error proccessing CRUD:", error);
            return null;
        } finally {
            setTableReload((prev) => !prev);
        }
    }

    // TODO: костыль
    const loadDataWrapperWithoutReload = async (func, args) => {
        try {
            const response = await func(...args);

            if (!response.ok) {
                if (response.status === 401)  {
                    console.log("401 Error processing table refresh")
                    logout();
                }
                throw new Error();
            }

            let responseData;
            try {
                responseData = await response.json();
            } catch (error) {
                console.error("Error reading response body", error);
            }
            console.log(responseData)
            return responseData;
            // раньше setReload(true) был тут
        } catch (error) {
            console.error("Error proccessing CRUD:", error);
            return null;
        }
    }

    return (
        <>
            <Navbar/>
            <div className={styles.wrapper}>
                <h1>
                    Быстрые кнопки
                </h1>

                <button onClick={() => setCreateDragonModalActive(true)}>CREATE POPUP</button>

                <DragonTable
                    fetchData={crudReadMany}
                    readManyUrl={`${BASE_URL}/dragons`}
                    deleteOneUrl={`${BASE_URL}/dragon`}

                    loadDataWrapper={loadDataWrapper}

                    tableReloadParentState={tableReload}
                    setTableReloadParentState={setTableReload}
                />
            </div>

            <Modal active={createDragonModalActive} setActive={setCreateDragonModalActive}>
                <CreateDragon
                    loadDataWrapper={loadDataWrapper}
                    loadDataWrapperWithoutReload={loadDataWrapperWithoutReload}

                    tableReloadParentState={tableReload}
                    setTableReloadParentState={setTableReload}
                />
            </Modal>
        </>
    )
}

export default Home
