export const SIGNUP = Object.freeze([
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "first Name",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^(?![!@#$%^&*()\-_+=]).{0,50}$/,
        message:
          "The name must be in characters only and must be no more than 50 characters.",
      },
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^(?![!@#$%^&*()\-_+=]).{0,50}$/,
        message:
          "The name must be in characters only and must be no more than 50 characters.",
      },
    },
  },
  {
    name: "phone",
    label: "TEL",
    type: "tel",
    placeholder: "phone number",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
        message:
          "Phone number should be in the format 000-0000-0000 and only contain numbers.",
      },
    },
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "You must keep the format of the e-mail.",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value:
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!~`<>,./?;:'"\[\]{}\\()|_-])\S{8,16}$/,
        message:
          "Password must be within 8-16, including all English case, numbers, and special characters.",
      },
    },
  },
  {
    name: "passwordcheck",
    label: "Password Check",
    type: "password",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
    },
  },
]);

export const EDIT = Object.freeze([
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "first Name",
    variant: "outlined",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^(?![!@#$%^&*()\-_+=]).{0,50}$/,
        message:
          "The name must be in characters only and must be no more than 50 characters.",
      },
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
    variant: "outlined",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^(?![!@#$%^&*()\-_+=]).{0,50}$/,
        message:
          "The name must be in characters only and must be no more than 50 characters.",
      },
    },
  },
  {
    name: "phone",
    label: "TEL",
    type: "tel",
    placeholder: "phone number",
    variant: "outlined",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
        message:
          "Phone number should be in the format 000-0000-0000 and only contain numbers.",
      },
    },
  },
  {
    name: "password",
    label: "Existing Password",
    type: "password",
    variant: "outlined",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value:
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!~`<>,./?;:'"\[\]{}\\()|_-])\S{8,16}$/,
        message:
          "Password must be within 8-16, including all English case, numbers, and special characters.",
      },
    },
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    variant: "outlined",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value:
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!~`<>,./?;:'"\[\]{}\\()|_-])\S{8,16}$/,
        message:
          "Password must be within 8-16, including all English case, numbers, and special characters.",
      },
    },
  },
  {
    name: "passwordcheck",
    label: "Password Check",
    type: "password",
    variant: "outlined",
    rules: {
      required: "The input box must not be empty.",
    },
  },
  {
    name: "introduction",
    label: "introduction",
    type: "text",
    variant: "outlined",
    multiline: true,
    rows: 4,
    rules: {
      pattern: {
        value: /^.{0,300}$/,
        message: "Introductions can be up to 300 characters long.",
      },
    },
  },
]);
