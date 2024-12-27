import styles from "./CreateDragon.module.css"
import {useState} from "react";

function CreateDragon() {

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
        // console.log(name, value);
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
    };

    const [coordinatesExistence, setCoordinatesExistence] = useState(false);
    const [caveExistence, setCaveExistence] = useState(false);
    const [killerExistence, setKillerExistence] = useState(false);
    const [headExistence, setHeadExistence] = useState(false);

    return (
        <div className={styles.form_wrapper}>
            <form>
                <h2>Информация о драконе</h2>
                <div className="form-section">
                    <div className={styles.form_group}>
                        <label>Имя дракона:</label>
                        <input value={formData.name || ""} name="name" type="text" onChange={(e) => handleChange(e)}/>
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
                                    <option>meow</option>
                                    <option>meow2</option>
                                </select>
                            </>
                        ) : (
                            <>
                                <div className={styles.form_group}>
                                    <label>Координаты: x:</label>
                                    <input value={formData.coordinates.x || ""} name="coordinates.x" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Координаты: y:</label>
                                    <input value={formData.coordinates.y || ""} name="coordinates.y" type="text" onChange={(e) => handleChange(e)}/>
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
                                    <option>meow</option>
                                    <option>meow2</option>
                                </select>
                            </>
                        ) : (
                            <div className={styles.form_group}>
                                <label>Количество сокровищ:</label>
                                <input value={formData.cave.numberOfTreasures || ""} name="cave.numberOfTreasures" type="text" onChange={(e) => handleChange(e)}/>
                            </div>
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
                                    <option>meow</option>
                                    <option>meow2</option>
                                </select>
                            </>
                        ) : (
                            <>
                                <div className={styles.form_group}>
                                    <label>Имя:</label>
                                    <input value={formData.killer.name || ""} name="killer.name" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Цвет глаз:</label>
                                    <input value={formData.killer.eyeColor || ""} name="killer.eyeColor" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Цвет волос:</label>
                                    <input value={formData.killer.hairColor || ""} name="killer.hairColor" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Координаты: x:</label>
                                    <input value={formData.killer.location.x || ""} name="killer.location.x" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Координаты: y:</label>
                                    <input value={formData.killer.location.y || ""} name="killer.location.y" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Координаты: z:</label>
                                    <input value={formData.killer.location.z || ""} name="killer.location.z" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>День рождения:</label>
                                    <input value={formData.killer.birthday || ""} name="killer.birthday" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Рост:</label>
                                    <input value={formData.killer.height || ""} name="killer.height" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                            </>
                        )
                    }
                </div>

                {/*------------*/}

                <h2>Детали о драконе</h2>
                <div className="form-section">
                    <div className={styles.form_group}>
                        <label>Возраст:</label>
                        <input value={formData.age || ""} name="age" type="text" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={styles.form_group}>
                        <label>Описание:</label>
                        <input value={formData.description || ""} name="description" type="text" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={styles.form_group}>
                        <label>Размах крыльев:</label>
                        <input value={formData.wingspan || ""} name="wingspan" type="text" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={styles.form_group}>
                        <label>Характер:</label>
                        <input value={formData.character || ""} name="character" type="text" onChange={(e) => handleChange(e)}/>
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
                                    <option>meow</option>
                                    <option>meow2</option>
                                </select>
                            </>
                        ) : (
                            <>
                                <div className={styles.form_group}>
                                    <label>Количество глаз:</label>
                                    <input value={formData.head.eyesCount || ""} name="head.eyesCount" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Количество зубов:</label>
                                    <input value={formData.head.toothCount || ""} name="head.toothCount" type="text" onChange={(e) => handleChange(e)}/>
                                </div>
                            </>
                        )
                    }
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
