import React, { useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';


const Form = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: false,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        terms: false,
    });

    const [users, setUsers] = useState([]);
    
    const [btnDisabled, setBtnDisabled] = useState("");
    
    const formSchema = yup.object().shape({
        name: yup
        .string()
        .trim()
        .required('Must give name, pleb'),
        
        password: yup
        .string()
        .trim()
        .required('You need a password, broh').min(8,'and it has to be at least 8 characters').max(26,'but less than 26, broh'),
        
        email: yup
        .string()
        .trim()
        .email('It need a @ sign and a .something'),

        terms: yup.boolean().oneOf([true]),
    });

    useEffect(() => {
        console.log('The form has changed.')    // when form changed properly, will console.log('this');
        formSchema.isValid(formState).then((valid) =>{ // is the input valid for the set Schema?
            setBtnDisabled(!valid);     // if it's valid, set button state to opposite
        });
    }, [formState]);

    function validateChange(e) {
        yup.reach(formSchema, e.target.name).validate(e.target.value)
        .then(() => {
            setErrors({...errors, [e.target.name]: ''})
        })
        .catch(err => {
            console.log(err);
            setErrors({...errors, [e.target.name]: '' });
        })
    }
    function inputChange(e) {
        e.persist()
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === 'checkbox' ? e.target.check : e.target.value,
        };
        validateChange(e);
        setFormState(newFormData);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('https://reqres.in/api/users', formState)
        .then(res => {
            setUsers({...users, [users]:res.data})
            console.log('POSTED, BABY!', users)
            setFormState({
                name: '',
                email: '',
                password: '',
                terms: false,
            });
        })
        .catch(err => {
            console.log(err.response);
        });
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor='name'>
                    Name:&nbsp;
                    <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='PUT IT DOWN ON ME!'
                    value={formState.name}
                    onChange={inputChange}
                />
                </label>
                <label htmlFor='email'>
                    Email:&nbsp;
                    <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Can I getCho emAILLLLL??'
                    value={formState.email}
                    onChange={inputChange}
                />
                </label>
                     <label htmlFor='password'>
                    Password:&nbsp;
                    <input
                    type='password' // hides text in box, knowing it's sensitive info
                    name='password'
                    id='password'
                    placeholder='Tell me your secrets, Daddy'
                    value={formState.password}
                    onChange={inputChange}
                />
                </label>

                <div>
                    <label htmlFor='terms'>
                        <h4>YOU BETTER CLICK THIS BOX, BWEH!</h4>
                        <input
                            type='checkbox'
                            name='terms'
                            id='terms'
                            checked={formState.terms}
                            onChange={inputChange}
                        />
                    </label>
                </div>
                <div>
                    <p> {errors.name} </p>
                    <p>{errors.email}</p>
                    <p>{errors.password}</p>
                    <p>{errors.terms}</p>
                </div>
                <div>
                    <button disabled={btnDisabled} type='submit'>
                        Sub me, Daddy
                    </button>
                </div>
                <div>
                    <pre> {JSON.stringify(users)} </pre>
                </div>
            </form>
        </div>
    )
}

export default Form;
