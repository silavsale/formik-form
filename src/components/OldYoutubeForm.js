import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'



const  initialValues = {
    name: '',
    email: '',
    channel: ''
}

const onSubmit = values => {
    console.log('Form data', values)
}

const validate = values => {
    let errors = {}
    if(!values.name){
        errors.name = "Required"
    }
    if(!values.email){
        errors.email = "Required"
    }
    if(!values.channel){
        errors.channel = "Required"
    }
    return errors
}

const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email('Invalid email format').required("Required!"),
    channel: Yup.string().required("Required!")
})

function OldYoutebeForm() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate,
        validationSchema,
    })

    // console.log("formik.values", formik.values);
    // console.log("formik.errors", formik.errors);
    console.log("formik.touched", formik.touched);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
                    {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
                </div>

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                    {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" name="channel" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.channel}/>
                    {formik.errors.channel && formik.touched.channel ? <div className="error">{formik.errors.channel}</div> : null}
                </div>
                <button type="submit">Submit</button>


            </form> 
        </div>
    )
}

export default OldYoutebeForm
