var auth = require("../modules/auth.js");
// console.log(auth.gauth);
// 

//auth.test();

auth.gauth(`eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzZTg0YWVkNGVmNDQzMTAxNGU4NjE3NTY3ODY0YzRlZmFhYWVkZTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTM1NTkxNDYwMTM1LTJjb2hodjVxMGJpam1zNXU2ZzVxMTlyODZvbGpyaGU0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTM1NTkxNDYwMTM1LTJjb2hodjVxMGJpam1zNXU2ZzVxMTlyODZvbGpyaGU0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1ODk1Nzc3NzQxMTIzMjEyNjkxIiwiZW1haWwiOiJyYWplZXZyYW9rQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiMVBvSkduVUEwN3BSN0RKeHVPQWpuZyIsIm5hbWUiOiJSYWplZXYgSyBSYW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2ktd01HQjZIV1U5dHR4MDg1dE8tNUplRV9FTHFaNzAwTWJGSDVQUVE9czk2LWMiLCJnaXZlbl9uYW1lIjoiUmFqZWV2IiwiZmFtaWx5X25hbWUiOiJLIFJhbyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjQwNzE5NTMwLCJleHAiOjE2NDA3MjMxMzAsImp0aSI6IjBmMzFiOTMxNThjNjljMzdmOWVmNThmNzA2ZTRjZjJiYzRlOWM3ZDcifQ.LwchqudLixUEVsKXUNHm-KKgRZbGjJR9Kn919m4Q3jaraEY2YbAH6b1B92tb7hdJgrduBKPlDzw7gUOP-Agsbq4GN5BRVaUj4Eln_n75B0htxSno4uctV_Q_frWs1cE6lnPSxStfwHcfdIfJl0YgcXHkxpAolMz74m6ihVy8mZNejyAHyScW4i0VPldf0O8KVMYIQmT3nnWloWLS_g1id-2pYDqZvGWEC7uVq_T_K5DgM1WGnFgGpKUtaR_2Ce2oLkmhAS7y0Hv0qxAwBKGZyWiOAd8wvF56R4jN-U-cQCQDYDC1uxuukc40CICiHYqX_yMd5R15X7IbmSRFujEiEA`)
.then((r)=>{
    console.log(r)
})
