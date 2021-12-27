require("dotenv").config();
var token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5OGY0OWJjNmNhNDU4MWVhZThkZmFkZDQ5NGZjZTEwZWEyM2FhYjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTM1NTkxNDYwMTM1LTJjb2hodjVxMGJpam1zNXU2ZzVxMTlyODZvbGpyaGU0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTM1NTkxNDYwMTM1LTJjb2hodjVxMGJpam1zNXU2ZzVxMTlyODZvbGpyaGU0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1ODk1Nzc3NzQxMTIzMjEyNjkxIiwiZW1haWwiOiJyYWplZXZyYW9rQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoia2k5MTNERlJlUFFQWjNqZm1RX0NEdyIsIm5hbWUiOiJSYWplZXYgSyBSYW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2ktd01HQjZIV1U5dHR4MDg1dE8tNUplRV9FTHFaNzAwTWJGSDVQUVE9czk2LWMiLCJnaXZlbl9uYW1lIjoiUmFqZWV2IiwiZmFtaWx5X25hbWUiOiJLIFJhbyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjQwMzQwNTAyLCJleHAiOjE2NDAzNDQxMDIsImp0aSI6IjBiY2FhOWY4N2E2YTYyMTVlOGJhNWQ2MWE4ZjMwZWIyZDg2ZTNlODUifQ.li6_4DKq43oeaCIwAAT2dQBT43DRey4bJcossFNZmqrmVEA0qIT_3G4NjzKysSKnkndIWJFmG_HKvrn1TrWe9lV_oRIojhzOVOsv63JsKuv5MJuuhDTlhq4mb1CgLSEPN6t0W4zH4zRP18DBBlmzAc-Dtu3qx9Jr1HJs0jVHTCC58V_vA1cizms6Ed00a5vDl5ISpjLe7Vf0KVgdTL7OTDx8BLlfoio_RtmuFhadDj1mbpY38hDK3T2IbCfUXhSrcNCG0OsCmvbDibbIqjhMGJPYpG-5H_NKVhrOTXBtjoArxNzllg0nrnsiCgyAgrKecYd0yKG38_H23wssHmQHXg"
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  console.log(userid);
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);