export const userValidationSchema = {
    'type': 'object',
    'properties': {
        'login': {
            'type': 'string',
            'minLength': 8
        },
        'password': {
            'type': 'string',
            'validatePassword': true
        },
        'age': {
            'type': 'number',
            'minimum': 4,
            'maximum': 130
        }
    },
    'required': ['login', 'password', 'age'],
    'errorMessage': {
        'properties': {
            'login': 'length should be equal or more than 8 characters',
            'password': 'must contain letters and numbers',
            'age': 'must be between 4 and 130'
        }
    }
};
