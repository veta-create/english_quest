import { useEffect, useState } from "react";

interface Validators {
    isEmpty?: boolean,
    permissibleNumberValue?: { min: number, max: number }
};

const useVaildation = (value: string, validators: Validators) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [permissibleNumberValue, setPermissibleNumberValueError] = useState(false);
    useEffect(() => {
        for (const validator in validators) {
            switch (validator) {
                case "isEmpty": {
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                };
                case "permissibleNumberValue": {
                    if (validators["permissibleNumberValue"] &&
                        validators["permissibleNumberValue"].min &&
                        validators["permissibleNumberValue"].max) {
                        (Number(value) >= validators["permissibleNumberValue"].min
                            && Number(value) <= validators["permissibleNumberValue"].max)
                            ? setPermissibleNumberValueError(false) : setPermissibleNumberValueError(true);
                    }
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

export const useInput = (initialValue: string, validators: Validators) => {
    const [value, setValue] = useState(initialValue);
    const [isVisited, setVisited] = useState(false);
    const validation = useVaildation(value, validators);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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