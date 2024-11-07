import * as yup from 'yup'

export const schema = yup
  .object({
    email: yup
      .string()
      .email('Email is in an invalid format.')
      .required('Email is required.')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email is in an invalid format.',
      ),
    password: yup
      .string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required.'),
  })
  .required()
