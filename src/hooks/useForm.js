import { useEffect, useState } from "react";

const useVaildation = (value, validators) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [permissibleNumberValue, setPermissibleNumberValueError] = useState(false);
    useEffect(() => {
        for(const validator in validators) {
            switch(validator) {
                case "isEmpty": {
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                };
                case "permissibleNumberValue": {
                    (Number(value) >= validators[validator][0] && Number(value) <= validators[validator][1]) 
                    ? setPermissibleNumberValueError(false) : setPermissibleNumberValueError(true);
                    break;
                };
            };
        };
    });

    return {
        isEmpty,
        isEmptyErrorMessage: "Это поле обязательно к заполнению",
        permissibleNumberValue,
        permissibleNumberValueErrorMessage: "Это поле должно быть номером ответа"
    };
};

export const useInput = (initialValue, validators) => {
    const [value, setValue] = useState(initialValue);
    const [isVisited, setVisited] = useState(false);
    const validation = useVaildation(value, validators);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        setVisited(true);
    };

    return {
        value,
        isVisited,
        onChange,
        onBlur,
        ...validation
    };
}