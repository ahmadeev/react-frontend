import React, {useEffect, useState} from "react";
import {crudCreate, crudReadMany, crudUpdate, fun1, fun2, fun3, fun4, fun5} from "../../utils/crud.js";

function AdditionalFunctions({ loadDataWrapperWithoutReload }) {
    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";

    const [headInput, setHeadInput] = useState("");
    const [headsList, setHeadsList] = useState(null);
    const [headResponse, setHeadResponse] = useState(null);

    const [wingspanInput, setWingspanInput] = useState("");
    const [wingspanResponse, setWingspanResponse] = useState(null);

    const [characterInput, setCharacterInput] = useState("");
    const [characterList, setCharacterList] = useState(() => {
        return [
            "CUNNING",
            "GOOD",
            "CHAOTIC_EVIL"
        ];
    });
    const [characterResponse, setCharacterResponse] = useState(null);

    const [deepestDragonCaveResponse, setDeepestDragonCaveResponse] = useState(null);

    const [aliveDragonInput, setAliveDragonInput] = useState("");
    const [aliveDragonsList, setAliveDragonsList] = useState(null);
    const [aliveDragonResponse, setAliveDragonResponse] = useState(null);

    useEffect(() => {
        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/heads`]).then(rd => {
            setHeadsList(rd.data);
        });
        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/alive-dragons`]).then(rd => {
            setAliveDragonsList(rd.data);
        });
    }, [])

    return (
        <>
            <h2>1. Удалить все объекты, значение поля head которого эквивалентно заданному.</h2>
            <div>
                { headResponse && <h4>{headResponse}</h4> }
                <select
                    value=""
                    onClick={() => {
                        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/heads`]).then(rd => {
                            setHeadsList(rd.data);
                        })
                    }}
                    onChange={(e) => {
                        setHeadInput(JSON.parse((e.target.value)));
                    }}
                >
                    <option value={headInput} disabled>Выберите объект:</option>
                    {headsList && headsList.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                    {(headsList === null || headsList.length === 0) && <option value="" disabled>&lt;пусто&gt;</option>}
                </select>
                <button onClick={async () => {
                    event.preventDefault();
                    let res = await loadDataWrapperWithoutReload(fun1, [`${BASE_URL}/fun-1`, headInput]);
                    let rd = await res.json();
                    console.log(rd);
                }}>
                    ОТПРАВИТЬ
                </button>
            </div>

            <h2>2. Вернуть количество объектов, значение поля wingspan которых равно заданному.</h2>
            <div>
                { wingspanResponse && <h4>{wingspanResponse}</h4> }
                <input
                    type="text"
                    value={wingspanInput}
                    onChange={(e) => setWingspanInput(e.target.value)}
                    placeholder="Величина wingspan"
                />
                <button onClick={async () => {
                    event.preventDefault();
                    let res = await loadDataWrapperWithoutReload(fun2, [`${BASE_URL}/fun-2`, wingspanInput]);
                    let rd = await res.json();
                    console.log(rd);
                }}>
                    ОТПРАВИТЬ
                </button>
            </div>

            <h2>3. Вернуть массив объектов, значение поля character которых меньше заданного.</h2>
            <div>
                {characterResponse && <h4>{characterResponse}</h4>}
                <select
                    value={characterInput}
                    onChange={(e) => setCharacterInput(e.target.value)}>
                    <option value="" disabled>Выберите характер:</option>
                    {characterList && characterList.map((option, index) => ( // TODO: словарь -> ключи и значения
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <button onClick={async () => {
                    event.preventDefault();
                    let res = await loadDataWrapperWithoutReload(fun3, [`${BASE_URL}/fun-3`, characterInput]);
                    let rd = await res.json();
                    console.log(rd);
                }}>
                    ОТПРАВИТЬ
                </button>
            </div>

            <h2>4. Найти дракона, живущего в самой глубокой пещере.</h2>
            <div>
                {deepestDragonCaveResponse && <h4>{deepestDragonCaveResponse}</h4>}
                <button onClick={async () => {
                    event.preventDefault();
                    let res = await loadDataWrapperWithoutReload(fun4, [`${BASE_URL}/fun-4`]);
                    let rd = await res.json();
                    console.log(rd);
                }}>
                    ОТПРАВИТЬ
                </button>
            </div>

            <h2>5. Убить указанного дракона.</h2>
            <div>
                { aliveDragonResponse && <h4>{aliveDragonResponse}</h4> }
                <select
                    value={aliveDragonInput}
                    onClick={() => {
                        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/alive-dragons`]).then(rd => {
                            setAliveDragonsList(rd.data);
                        })
                    }}
                    onChange={(e) => {
                        setAliveDragonInput(JSON.parse((e.target.value)));
                    }}
                >
                    <option value="" disabled>Выберите объект:</option>
                    {aliveDragonsList && aliveDragonsList.map((option, index) => (
                        <option key={index} value={option} title={option}>
                            {("" + option).substring(0, 40) + "..."}
                        </option>
                    ))}
                    {(aliveDragonsList === null || aliveDragonsList.length === 0) &&
                        <option value="" disabled>&lt;пусто&gt;</option>}
                </select>
                <button onClick={async () => {
                    event.preventDefault();
                    let res = await loadDataWrapperWithoutReload(fun5, [`${BASE_URL}/fun-5`, aliveDragonInput.id, aliveDragonInput]);
                    let rd = await res.json();
                    console.log(rd);
                }}>
                    ОТПРАВИТЬ
                </button>
            </div>
        </>
    )
}

export default AdditionalFunctions
