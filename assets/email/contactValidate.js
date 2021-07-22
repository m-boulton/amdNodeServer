// contact form validator (ran only on submitting form)
async function formValidate(form) {
  // validate input fields and returns error message or true for valid
  if (form.name == "" || form.name == null) return "Name field is Required.";
  if (form.email == "" || form.email == null) return "Email field is required.";
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      form.email
    ) == false
  )
    return "Email entered is not valid";
  return true;
}

module.exports = formValidate;
