export const userFormFields = [
    {
        id: 0,
        fieldType: 'text',
        dataType: 'userData',
        labelType: 'name',
        fieldLabel: 'Имя',
        placeholder: 'Введите Имя'
    },
    {
        id: 1,
        fieldType: 'tel',
        dataType: 'userData',
        labelType: 'age',
        fieldLabel: 'Возраст',
        placeholder: 'Полных лет',
    },
];

export const childFormFields = [
    {
        id: 0,
        fieldType: 'text',
        dataType: 'childData',
        labelType: 'name',
        fieldLabel: 'Имя',
        placeholder: 'Введите Имя'
    },
    {
        id: 1,
        fieldType: 'tel',
        dataType: 'childData',
        labelType: 'age',
        fieldLabel: 'Возраст',
        placeholder: 'Полных лет',
    },
];

export const userData = {
    data: {},
};
export const childList = [];

export const fieldValidation = {
    isFormValid: false,
    invalidFields: 0,
    formFieldStatus: [],
    dataSaved: false,
};
