import React, {useEffect, useState} from "react";
import {crudReadMany} from "../../utils/crud.js";

function AdditionalFunctions({ loadDataWrapperWithoutReload }) {
    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";

    const [heads, setHeads] = useState(null);

    useEffect(() => {
        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/heads`]).then(rd => {
            setHeads(rd.data);
        });
    }, [])

    return (
        <>
            <h2>1. Удалить все объекты, значение поля head которого эквивалентно заданному.</h2>
            <div>
                <select onClick={() => {
                    loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/heads`]).then(rd => {
                        setHeads(rd.data);
                    })
                }}>
                    <option value="" disabled>Выберите объект:</option>
                    {heads && heads.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                    {!heads && <option value="" disabled>&lt;пусто&gt;</option>}
                </select>
            </div>

            <h2>2. Вернуть количество объектов, значение поля wingspan которых равно заданному.</h2>
            <h2>3. Вернуть массив объектов, значение поля character которых меньше заданного.</h2>
            <h2>4. Найти дракона, живущего в самой глубокой пещере.</h2>
            <h2>5. Убить указанного дракона.</h2>
        </>
    )
}

export default AdditionalFunctions
