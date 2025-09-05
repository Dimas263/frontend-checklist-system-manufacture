# Checklist System for Manufacture 
### [https://frontend-checklist-system-manufactu.vercel.app/](https://frontend-checklist-system-manufactu.vercel.app/)
This is a simple [Next.js](https://nextjs.org) frontend project and using [Go](https://go.dev/dl/) for a backend and deployment using vercel

## Getting Started
### Installation Project [Here](/Install.md)
First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result (local).

## Flow Proses
### Login
```dockerignore
User input username & password → Backend memvalidasi dan mengembalikan token JWT → Token disimpan di localStorage
```
### Checklist
Hanya bisa diakses jika token valid <br>
* Read Checklist
```
Fetch checklist dari backend menggunakan token
```
* Add checklist:
```dockerignore

Pilih kategori → Pilih task dari daftar saran → Submit → backend menyimpan data
```
* Update checklist:
```dockerignore
Klik tombol “Mark as Done / Mark as Pending” → Backend update status
```

* Delete checklist:
```dockerignore
Klik tombol Hapus → backend hapus data
```

### Logout
```dockerignore
Menghapus token dari localStorage → Redirect ke halaman login
```

## Front-end
### [https://github.com/Dimas263/frontend-checklist-system-manufacture](https://github.com/Dimas263/frontend-checklist-system-manufacture)
* Manage Checklist `CRUD` `Login Required`
* Login `Authentication`
* Structure
```dockerignore
/frontend-checklist
  /app
    page.js                      (halaman utama)
    api/login/route.js           (transaksi authentikasi dengan backend, fixed cors blocked on browser)
    login/page.js                (screen login dengan api)
    api/checklist/route.js       (transaksi crud checklist dengan backend, fixed cors blocked on browser)
    checklist/page.js            (screen manage checklist dengan crud api)
  package.json
```
## Back-end
### [https://github.com/Dimas263/backend-checklist-system-manufacture](https://github.com/Dimas263/backend-checklist-system-manufacture)
* Function Login Authentication `jwt token`
* Function Checklist `Create` `Read` `Update` `Delete`
* Temporary Database
* Structure
```dockerignore
/backend-checklist
  main.go
  go.mod
  api/auth.go         (authentikasi dan jwt token)
  api/checklist.go    (crud dengan temporary database/local storage)
  vercel.json         (deploy backend dengan vercel)
```
* API
```dockerignore
local  : http://localhost:9090
vercel : https://backend-checklist-system-manufactur.vercel.app/

Endpoints:

POST /login → login user

GET /checklist → ambil semua checklist

POST /checklist → tambah checklist

PUT /checklist → update status checklist

DELETE /checklist?id=... → hapus checklist
```

### Tools
* Frontend: `Next.js`, `React`, `TailwindCSS`
* Backend: `Golang`, `net/http`, `API`
* Deployment: `Vercel`
* Authentication: `JWT Token`
* Database : `Temporary Database`, `Local Storage`

## Screenshoot
<img src="screenshoot/home.png" alt="home" width="380px" />

Account : `admin` `password123` <br>
<img src="screenshoot/login.png" alt="login" width="380px" />
<br>
<img src="screenshoot/management_checklist.png" alt="checklist" width="380px" />

## Deploy with Vercel
* [Login vercel](https://vercel.com/)
* Create New Project
* <img src="screenshoot/vercel_add_new.png" alt="vercel add new project" />
* Import Project from github
* <img src="screenshoot/import%20project.png" alt="import project" />
* Deploy
* <img src="screenshoot/vercel_deploy.png" alt="vercel_deploy" />
* Deploy Success
* <img src="screenshoot/vercel_success.png" alt="vercel_success" />
* Deploy Dashboard
* <img src="screenshoot/vercel_dashboard.png" alt="vercel_dashboard" />
* Deploy History (auto update)
* <img src="screenshoot/vercel_dashboard_analytics.png" alt="vercel_dashboard_analytics" />