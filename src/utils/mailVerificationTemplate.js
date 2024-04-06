function verificationEmailTemplate(token) {
  return `<h1> Verification Email ${token}</h1><button style='padding:10px 20px'><a>Click Here to Verify</a></button>`;
}
module.exports = verificationEmailTemplate;
