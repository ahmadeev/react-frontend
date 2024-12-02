import {useAuth} from "./AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function SignUpForm({ from, isSignedUp, setIsSignedUp }) {
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [incorrectPasswordsError, setIncorrectPasswordsError] = useState(false);
    const [userExistsError, setUserExistsError] = useState(false);
    const [invalidUsernameError, setInvalidUsernameError] = useState(false);

    const [submitButtonState, setSubmitButtonState] = useState(false);

    // считается хорошей практикой использовать хуки для обработки (иначе нарушается реактивность приложения)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const isUsernameValid = checkIsValidUsername(username);
        const isPasswordValid = comparePasswords(password, confirmPassword);

        if (username !== "" && !isUsernameValid) setInvalidUsernameError(true);
        else setInvalidUsernameError(false);

        if (password !== "" && confirmPassword !== "" && !isPasswordValid) setIncorrectPasswordsError(true);
        else setIncorrectPasswordsError(false);

        if (isUsernameValid && isPasswordValid) {
            setSubmitButtonState(true);
        } else {
            setSubmitButtonState(false);
        }
    },[username, password, confirmPassword])

    const checkIsValidUsername = (username) => {
        return username && username.match(/^[a-zA-Z0-9]{4,}$/g);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const comparePasswords = (password1, password2) => {
        return password1 && password2 && password1 === password2
    };

    return (
        <div>
            <form>
                <label>
                    Введите имя пользователя:<br/>
                    <input
                        value={username}
                        onChange={handleUsernameChange}
                        className="login-input"
                        type="text"
                    />
                </label><br/>
                <label>
                    Введите пароль:<br/>
                    <input
                        value={password}
                        onChange={handlePasswordChange}
                        className="password-input"
                        type="password"
                    />
                </label><br/>
                <label>
                    Повторите пароль:<br/>
                    <input
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="password-input"
                        type="password"
                    />
                </label><br/>
                {
                    incorrectPasswordsError && <h5>Пароли не совпадают!</h5>
                }

                {
                    userExistsError && <h5>Пользователь уже существует!</h5>
                }

                {
                    invalidUsernameError &&
                    <h5>Имя пользователя должно содержать минимум 4 символа!
                        Имя пользователя может содержать строчные и заглавные символы латинского алфавита и цифры.</h5>

                }

                <button disabled={(!submitButtonState)} onClick={() => {
                    event.preventDefault();

                    signUp(
                        username,
                        password
                    )
                        .then(response => response.json())
                        .then(responseData => {
                            if (responseData.status === "SUCCESS") {
                                console.log("адрес перед navigate", from)
                                navigate("/auth", {replace: true});
                            } else {
                                setUserExistsError(true);
                            }
                        })
                        .catch(error => console.error(error))
                }}>Sign Up
                </button>
            </form>
            <br/>
            <a onClick={() => {
                setIsSignedUp(!isSignedUp);
            }}>{isSignedUp ? "Sign Up" : "Sign In"}</a>
        </div>
    )
}

export default SignUpForm
