import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const  initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['',''],
    phNumbers: ['']
}

const  savedValues = {
    name: 'Mario',
    email: 'drmario@gmail.it',
    channel: 'itc',
    comments: 'hello',
    address: 'New Milan',
    social: {
        facebook: 'marioBr',
        twitter: 'marioTW'
    },
    phoneNumbers: ['1111','2222'],
    phNumbers: ['3333']
}

const onSubmit = values => {
    console.log('Form data', values)
}

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email('Invalid email format').required("Required"),
    channel: Yup.string().required("Required"),
    comments: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
})


function YoutebeForm() {
    const [formValues, SetFormValues] = useState(null)

    // console.log("formik.touched", touched);

    return (
        <Formik 
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            <Form>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <Field type="text" id="name" name="name" placeholder="Your name"/>
                    <ErrorMessage name="name" component={TextError}/>
                </div>

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email"/>
                    <ErrorMessage name="email" >
                        {errorMssg => <div className='error'>{errorMssg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <Field type="text" id="channel" name="channel"/>
                    <ErrorMessage name="channel" component={TextError}/>
                </div>

                <div className="form-control">
                    <label htmlFor="comments">Comments</label>
                    <Field as='textarea' id='comments' name='comments' />
                    <ErrorMessage name="comments" component={TextError}/>
                </div>
            
                <div className='form-control'>
                    <label htmlFor="address">Address</label>
                    <FastField name='address'> 
                        {
                            (props) => {
                                const { field, form, meta } = props
                                console.log('Field render')
                                return( 
                                    <div>
                                        <input type="text" id="address" {...field} placeholder="Enter your address"/>
                                        {/* {meta.touched && meta.error ? <div>{meta.error}</div> : null} */}
                                        {meta.touched && meta.error ? <TextError>{meta.error}</TextError> : null}
                                    </div>
                                )
                            }
                        }
                    </FastField>
                </div>

                <div className="form-control">
                    <label htmlFor="facebook">Facebook Profile</label>
                    <Field as='textarea' id='facebook' name='social.facebook' />
                    <ErrorMessage name="facebook" component={TextError}/>
                </div>

                <div className="form-control">
                    <label htmlFor="twitter">Twitter Profile</label>
                    <Field as='textarea' id='twitter' name='social.twitter' />
                    <ErrorMessage name="twitter" component={TextError}/>
                </div>

                <div className="form-control">
                    <label htmlFor="primaryPh">Primary phone number</label>
                    <Field as='textarea' id='primaryPh' name='phoneNumbers[0]' />
                    <ErrorMessage name="primaryPh" component={TextError}/>
                </div>

                <div className="form-control">
                    <label htmlFor="primaryPh">Secondary phone number</label>
                    <Field as='textarea' id='primaryPh' name='phoneNumbers[1]' />
                    <ErrorMessage name="primaryPh" component={TextError}/>
                </div>

                <div className="form-control">
                    <label htmlFor="">List of phone numbers</label>
                    <FieldArray name='phNumbers'>
                        {
                            (fieldArrayProps) => {
                                // console.log('fieldArrayProps', fieldArrayProps)
                                const {push, remove, form} = fieldArrayProps
                                const {values} = form
                                const {phNumbers} = values
                                return <div>
                                    {
                                        phNumbers.map((phNumber, index) => (
                                            <div key={index}>
                                                <Field name={`phNumbers[${index}]`}/>
                                                {
                                                    index > 0 &&
                                                <button type='button' onClick={()=> remove(index)}> {' '} - {' '}</button>
                                                }
                                                <button type='button' onClick={()=> push('')}> + </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        }
                    </FieldArray>
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={()=> SetFormValues(savedValues)}> Load Saved Data</button>
            </Form> 
        </Formik>
    )
}

export default YoutebeForm
