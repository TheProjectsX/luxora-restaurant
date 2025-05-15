# Restaurant Reservation App

## 📦 What’s Included

-   TailwindCSS for styling
-   Prisma with PostgreSQL
-   Authentication with NextAuth (Credentials Provider)
-   Admin Dashboard
-   Reservation System with validation (Zod)
-   Client-side and server-side form handling
-   Custom components: DatePicker, TimePicker, Countdown, etc.

## 🚀 How to Run Locally

1. **Clone the Repo**

    ```bash
    git clone https://github.com/TheProjectsX/luxora-restaurant
    cd luxora-restaurant
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Setup `.env` File**

    Follow `.env.example`

4. **Push DB Schema**

    ```bash
    npx prisma db push
    ```

5. **Run the App**

    ```bash
    npm run dev
    ```

---

## 🔐 Admin Credentials

```
Email: admin@luxora.com
Password: luxora123
```

## 🌐 Deployment Link

[Visit Live](https://luxora-x.vercel.app)

### Build Issue

Had some issue while building and deploying this project. Couldn't find any solution to the problem even after an hour.

Just took a step back, refreshed my brain, and came back. Started checking from the root commit. Even the root commit had the same issue.

Found out the issue was from `prisma`. The new version of prisma needs the `path` where the generated code will stay. But this gave a massive error which try to scan the `C:/Users/User/...` directory.

#### How did I solved?

Used the classic version. Removed the path, and generated in the `node_modules/@prisma/client` folder.

Wala! Problem Solved!
