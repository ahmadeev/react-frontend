import styles from "./CreateDragon.module.css"
import React, {useEffect, useState} from "react";
import {crudCreate, crudDeleteMany, crudRead, crudReadMany} from "../../utils/crud.js";

function CreateDragon({ loadDataWrapper, loadDataWrapperWithoutReload, tableReloadParentState, setTableReloadParentState }) {

    const BASE_URL = "http://localhost:8080/backend-jakarta-ee-1.0-SNAPSHOT/api/user";

    const FORM_SECTION_STYLE = {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "10px",
        alignItems: "center",
    }

    const [formData, setFormData] = useState({
        name: null,
        coordinates: { x: null, y: null },
        cave: { numberOfTreasures: null },
        killer: {
            name: null,
            eyeColor: null,
            hairColor: null,
            location: { x: null, y: null, z: null },
            birthday: null,
            height: null,
        },
        age: null,
        description: null,
        wingspan: null,
        character: null,
        head: {
            eyesCount: null,
            toothCount: null,
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prev) => {
            const keys = name.split("."); // Разделяем имя по точке
            let data = { ...prev };

            let nested = data;
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    nested[key] = value;
                } else {
                    if (!nested[key]) nested[key] = {};
                    nested = nested[key];
                }
            });

            return data;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted data:", formData);
        loadDataWrapper(crudCreate, [`${BASE_URL}/dragon`, formData]);
    };

    const [coordinatesExistence, setCoordinatesExistence] = useState(false);
    const [caveExistence, setCaveExistence] = useState(false);
    const [killerExistence, setKillerExistence] = useState(false);
    const [headExistence, setHeadExistence] = useState(false);

    const [editingAllowed, setEditingAllowed] = useState(false);

    const [dragonNameTouched, setDragonNameTouched] = useState(false);
    const [coordinatesXTouched, setCoordinatesXTouched] = useState(false);
    const [coordinatesYTouched, setCoordinatesYTouched] = useState(false);
    const [numberOfTreasuresTouched, setNumberOfTreasuresTouched] = useState(false);
    const [killerNameTouched, setKillerNameTouched] = useState(false);
    const [killerEyeColorTouched, setKillerEyeColorTouched] = useState(false);
    const [killerLocationXTouched, setKillerLocationXTouched] = useState(false);
    const [killerLocationYTouched, setKillerLocationYTouched] = useState(false);
    const [killerLocationZTouched, setKillerLocationZTouched] = useState(false);
    const [killerBirthdayTouched, setKillerBirthdayTouched] = useState(false);
    const [killerHeightTouched, setKillerHeightTouched] = useState(false);
    const [dragonHeadEyesCountTouched, setDragonHeadEyesCountTouched] = useState(false);
    const [dragonHeadToothCountTouched, setDragonHeadToothCountTouched] = useState(false);
    const [dragonAgeTouched, setDragonAgeTouched] = useState(false);
    const [dragonWingspanTouched, setDragonWingspanTouched] = useState(false);

    const dragonCharacter = [
        "CUNNING",
        "GOOD",
        "CHAOTIC_EVIL"
    ]

    const color = [
        "GREEN",
        "BLACK",
        "WHITE"
    ]

    const regexInt = /^-?\d+$/; // +- int
    const regexFloat = /^-?\d+([.,]\d+)?$/; // +- float

    const [coordinates, setCoordinates] = useState(null);
    const [caves, setCaves] = useState(null);
    const [persons, setPersons] = useState(null);
    const [heads, setHeads] = useState(null);

    useEffect(() => {
        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/coordinates`]).then(rd => {
            setCoordinates(rd.data);
        });
        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/caves`]).then(rd => {
            setCaves(rd.data);
        })
        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/persons`]).then(rd => {
            setPersons(rd.data);
        })
        loadDataWrapperWithoutReload(crudReadMany, [`${BASE_URL}/heads`]).then(rd => {
            setHeads(rd.data);
        })
    }, [tableReloadParentState]);

    return (
        <div className={styles.form_wrapper}>
            <form>
                <h2>Информация о драконе</h2>
                <div className="form-section">
                    {/* инпут */}
                    <div className={styles.form_group}>
                        <label>Имя дракона:</label>
                        <input value={formData.name || ""} name="name" type="text"
                               onChange={(e) => handleChange(e)}
                               onBlur={() => setDragonNameTouched(true)}
                        />
                    </div>
                    {/* ошибка */}
                    <div className={styles.form_group}>
                        {
                            dragonNameTouched && (formData.name === null || formData.name === "") ? <span style={{color: "red"}}>Имя дракона не может быть пустым!</span> : <></>
                        }
                    </div>
                </div>

                {/*------------*/}

                <h2>Координаты</h2>
                <label>
                    <input type="checkbox" value={coordinatesExistence}
                           onChange={() => setCoordinatesExistence((prev) => !prev)}/>
                    Существует?
                </label>
                <br/><br/>

                <div className="form-section">
                    {
                        coordinatesExistence ? (
                            <>
                                <select>
                                    <option value="" disabled>Выберите объект:</option>
                                    {coordinates && coordinates.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                    {!coordinates && <option value="" disabled>&lt;пусто&gt;</option>}
                                </select>
                            </>
                        ) : (
                            <>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Координаты: x:</label>
                                    <input value={formData.coordinates.x || ""} name="coordinates.x" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setCoordinatesXTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        coordinatesXTouched && (!(formData.coordinates.x).match(regexInt) || formData.coordinates.x <= -596) ?
                                            <span style={{color: "red"}}>Координата X должна быть представлена числом и быть больше -596!</span> : <></>
                                    }
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Координаты: y:</label>
                                    <input value={formData.coordinates.y || ""} name="coordinates.y" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setCoordinatesYTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        coordinatesYTouched && (!(formData.coordinates.y).match(regexInt) && formData.coordinates.y !== "") ?
                                            <span style={{color: "red"}}>Координата Y должна быть представлена числом или отсутствовать вовсе!</span> : <></>
                                    }
                                </div>
                            </>
                        )
                    }
                </div>

                {/*------------*/}

                <h2>Пещера</h2>

                <label>
                    <input type="checkbox" value={caveExistence}
                           onChange={() => setCaveExistence((prev) => !prev)}/>
                    Существует?
                </label>
                <br/><br/>

                <div className="form-section">
                    {
                        caveExistence ? (
                            <>
                                <select>
                                    <option value="" disabled>Выберите объект:</option>
                                    {caves && caves.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                    {!caves && <option value="" disabled>&lt;пусто&gt;</option>}
                                </select>
                            </>
                        ) : (
                            <>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Количество сокровищ:</label>
                                    <input value={formData.cave.numberOfTreasures || ""} name="cave.numberOfTreasures"
                                           type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setNumberOfTreasuresTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        numberOfTreasuresTouched && (!(formData.cave.numberOfTreasures).match(regexFloat) || formData.cave.numberOfTreasures <= 0) ?
                                            <span style={{color: "red"}}>Количество сокровищ должно быть больше нуля!</span> : <></>
                                    }
                                </div>
                            </>
                        )
                    }
                </div>

                {/*------------*/}

                <h2>Убийца дракона</h2>

                <label>
                    <input type="checkbox" value={killerExistence}
                           onChange={() => setKillerExistence((prev) => !prev)}/>
                    Существует?
                </label>
                <br/><br/>

                <div className="form-section">
                    {
                        killerExistence ? (
                            <>
                                <select>
                                    <option value="" disabled>Выберите объект:</option>
                                    {persons && persons.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                    {!persons && <option value="" disabled>&lt;пусто&gt;</option>}
                                </select>
                            </>
                        ) : (
                            <>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Имя:</label>
                                    <input value={formData.killer.name || ""} name="killer.name" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setKillerNameTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        killerNameTouched && (formData.killer.name === null || formData.killer.name === "") ? <span style={{color: "red"}}>Имя убийцы не может быть пустым!</span> : <></>
                                    }
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Цвет глаз:</label>
                                    <select value={formData.killer.eyeColor || ""} name="killer.eyeColor"
                                            onChange={(e) => handleChange(e)}
                                            onBlur={() => setKillerEyeColorTouched(true)}
                                    >
                                        <option value="" disabled>Выберите цвет</option>
                                        {color && color.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        killerEyeColorTouched && (formData.killer.eyeColor === "") ?
                                            <span style={{color: "red"}}>Поле &apos;Цвет глаз&apos; не может быть пустым!</span> : <></>
                                    }
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Цвет волос:</label>
                                    <select value={formData.killer.hairColor || ""} name="killer.hairColor"
                                            onChange={(e) => handleChange(e)}>
                                        <option value="">Выберите цвет</option>
                                        {color && color.map((option, index) => (
                                            <option key={index} value={option}>
                                            {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Координаты: x:</label>
                                    <input value={formData.killer.location.x || ""} name="killer.location.x" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setKillerLocationXTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        killerLocationXTouched && (!(formData.killer.location.x).match(regexInt) && formData.killer.location.x !== "") ?
                                            <span style={{color: "red"}}>Координата X должна быть представлена целым числом или отсутствовать вовсе!</span> : <></>
                                    }
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Координаты: y:</label>
                                    <input value={formData.killer.location.y || ""} name="killer.location.y" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setKillerLocationYTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        killerLocationYTouched && (!(formData.killer.location.y).match(regexInt) && formData.coordinates.y !== "") ?
                                            <span style={{color: "red"}}>Координата Y должна быть представлена целым числом!</span> : <></>
                                    }
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Координаты: z:</label>
                                    <input value={formData.killer.location.z || ""} name="killer.location.z" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setKillerLocationZTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        killerLocationZTouched && (!(formData.killer.location.z).match(regexInt) && formData.killer.location.z !== "") ?
                                            <span style={{color: "red"}}>Координата Z должна быть представлена целым числом или отсутствовать вовсе!</span> : <></>
                                    }
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>День рождения:</label>
                                    <input value={formData.killer.birthday || ""} name="killer.birthday" type="date"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setKillerBirthdayTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        killerBirthdayTouched && (formData.killer.birthday === null || formData.killer.birthday === "") ?
                                            <span style={{color: "red"}}>Поле &apos;День рождения&apos; не может быть пустым!</span> : <></>
                                    }
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Рост:</label>
                                    <input value={formData.killer.height || ""} name="killer.height" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setKillerHeightTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        killerHeightTouched && (!(formData.killer.height).match(regexInt) || formData.killer.height <= 0) ?
                                            <span style={{color: "red"}}>Поле &apos;Рост&apos; должно быть больше нуля!</span> : <></>
                                    }
                                </div>
                            </>
                        )
                    }
                </div>

                {/*------------*/}

                <h2>Детали о драконе</h2>
                <div className="form-section">
                    {/* инпут */}
                    <div className={styles.form_group}>
                        <label>Возраст:</label>
                        <input value={formData.age || ""} name="age" type="text"
                               onChange={(e) => handleChange(e)}
                               onBlur={() => setDragonAgeTouched(true)}
                        />
                    </div>
                    {/* ошибка */}
                    <div className={styles.form_group}>
                        {
                            dragonAgeTouched && (!(formData.age).match(regexInt) || formData.age <= 0) ?
                                <span style={{color: "red"}}>Поле &apos;Возраст&apos; должно быть больше нуля!</span> : <></>
                        }
                    </div>
                    {/* инпут */}
                    <div className={styles.form_group}>
                        <label>Описание:</label>
                        <input value={formData.description || ""} name="description" type="text"
                               onChange={(e) => handleChange(e)}/>
                    </div>
                    {/* инпут */}
                    <div className={styles.form_group}>
                        <label>Размах крыльев:</label>
                        <input value={formData.wingspan || ""} name="wingspan" type="text"
                               onChange={(e) => handleChange(e)}
                               onBlur={() => setDragonWingspanTouched(true)}
                        />
                    </div>
                    {/* ошибка */}
                    <div className={styles.form_group}>
                        {
                            dragonWingspanTouched && (!(formData.wingspan).match(regexInt) || formData.wingspan <= 0) ?
                                <span style={{color: "red"}}>Поле &apos;Размах крыльев&apos; должно быть больше нуля!</span> : <></>
                        }
                    </div>
                    {/* инпут */}
                    <div className={styles.form_group}>
                        <label>Характер:</label>
                        <select value={formData.character || ""} name="character"
                                onChange={(e) => handleChange(e)}>
                            <option value="">Выберите характер</option>
                            {dragonCharacter && dragonCharacter.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/*------------*/}

                <h2>Голова дракона</h2>

                <label>
                    <input type="checkbox" value={headExistence}
                           onChange={() => setHeadExistence((prev) => !prev)}/>
                    Существует?
                </label>
                <br/><br/>

                <div className="form-section">
                    {
                        headExistence ? (
                            <>
                                <select>
                                    <option value="" disabled>Выберите объект:</option>
                                    {heads && heads.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                    {!heads && <option value="" disabled>&lt;пусто&gt;</option>}
                                </select>
                            </>
                        ) : (
                            <>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Количество глаз:</label>
                                    <input value={formData.head.eyesCount || ""} name="head.eyesCount" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setDragonHeadEyesCountTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        dragonHeadEyesCountTouched && (!(formData.head.eyesCount).match(regexFloat) && formData.head.eyesCount !== "") ?
                                            <span style={{color: "red"}}>Количество глаз должно быть представлено десятичным числом или отсутствовать вовсе!</span> : <></>
                                    }
                                </div>
                                {/* инпут */}
                                <div className={styles.form_group}>
                                    <label>Количество зубов:</label>
                                    <input value={formData.head.toothCount || ""} name="head.toothCount" type="text"
                                           onChange={(e) => handleChange(e)}
                                           onBlur={() => setDragonHeadToothCountTouched(true)}
                                    />
                                </div>
                                {/* ошибка */}
                                <div className={styles.form_group}>
                                    {
                                        dragonHeadToothCountTouched && (!(formData.head.toothCount).match(regexFloat) || formData.head.toothCount === "") ?
                                            <span style={{color: "red"}}>Количество зубов должно быть представлено десятичным числом!</span> : <></>
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
                <br/>

                {/*------------*/}

                <div className="form-section">
                    <label>
                        <input type="checkbox" value={editingAllowed}
                               onClick={() => setEditingAllowed((prev) => (!prev))}/>
                        Разрешить редактирование и удаление Администраторами?
                    </label>
                </div>
                <br/>

                {/*------------*/}

                <button onClick={(e) => handleSubmit(e)}>CREATE
                </button>
            </form>
        </div>
    )
}

export default CreateDragon
