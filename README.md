

# 📚 CSEC Platform — Member & Division Management  
**Group 1 Project**

A full-featured community platform designed for the **CSEC club**, managing members, divisions, tasks, attendance, announcements, and contributions — built using **Next.js** on the frontend, and **Express + PostgreSQL** (with **Prisma**) on the backend.

---

## 🚀 Features  

✅ Member onboarding, profile & role management  
✅ Division creation & hierarchical permissions  
✅ Session scheduling, attendance tracking  
✅ Task assignments & status updates  
✅ Notifications & announcements (in-portal + email)  
✅ Membership reports, contribution tracking  
✅ Secure authentication using **NextAuth.js** (JWT + OAuth 2.0)

---

## 🛠️ Tech Stack  

| Layer        | Tools / Frameworks                          |
|:-------------|:--------------------------------------------|
| **Frontend**  | [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) |
| **Backend**   | [Express.js](https://expressjs.com/), [PostgreSQL](https://www.postgresql.org/), [Prisma](https://www.prisma.io/) |
| **Auth**      | [NextAuth.js](https://next-auth.js.org/), JWT, OAuth 2.0 |
| **Deployment**| [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/), (potentially Docker) |
| **File Links**| Managed via URLs (no uploads) |

---

## 📦 Installation  

```bash
# Clone the frontend repo
git clone https://github.com/yourusername/csec-platform.git
cd csec-platform

# Install dependencies
npm install

# Setup your environment
cp .env.example .env.local

# Run in development
npm run dev
```

🔒 **Note**:  
- Ensure your backend (Express + PostgreSQL) is running and properly connected through `.env.local` configs.
- Backend repo lives separately [link your backend repo here if public].

---

## 📖 Documentation  

Full requirements and workflow details are documented in [`docs/Member-and-Membership.md`](./docs/Member-and-Membership.md) (convert your docx into markdown — I can help format that too if you want).

---

## 📊 Dashboard Roles  

| Role             | Permissions                                                  |
|:-----------------|:------------------------------------------------------------|
| **President**      | Manage all divisions, assign Heads, global content, reports |
| **Vice President** | Manage divisions, dismiss members, moderate activities      |
| **Division Head**  | Approve members, assign Coordinators, manage division tasks |
| **Coordinator**    | Assist in managing content, events, announcements           |
| **Member**         | View personal profiles, division info, tasks, files         |

---

## 🎨 Screenshots  
*(coming soon — optionally add when you have your first screens ready)*  

> You could include:
- Main dashboard  
- Division page  
- Task manager  
- Profile view  

Example:
```md
![Dashboard Screenshot](public/screens/dashboard.png)
```

---

## 📜 License  

This project is licensed under the **MIT License** — add your license file later.

---

## 📬 Contact  

- **Group Name:** Group 1  
- **Lead Maintainer:** [your-email@example.com]  
- **GitHub:** [@yourusername](https://github.com/yourusername)

---