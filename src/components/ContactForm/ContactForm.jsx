import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';

const schema = Yup.object({
  name: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(30, 'Maximum 30 characters')
    .required('Required'),
  number: Yup.string()
    .matches(
      /^(\+[\d]{12}|0\d{9})$/,
      'Enter a valid number, such as +380501234567 or 0501234567'
    )
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addContact(values.name, values.number));
        resetForm();
      }}
    >
      <Form className={styles.form}>
        <div className={styles.group}>
          <label>Name</label>
          <Field name="name" type="text" className={styles.input} />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </div>
        <div className={styles.group}>
          <label>Number</label>
          <Field
            name="number"
            type="text"
            inputMode="numeric"
            className={styles.input}
          />
          <ErrorMessage
            name="number"
            component="div"
            className={styles.error}
          />
        </div>
        <button type="submit" className={styles.addButton}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
