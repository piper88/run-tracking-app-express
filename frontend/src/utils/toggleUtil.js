//Toggle password visibility
function handleToggle(event) {
  const togglePassword = event.target;
  const password = (event.target).previousElementSibling;
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  togglePassword.classList.toggle('fa-eye-slash');
}

export default handleToggle;
