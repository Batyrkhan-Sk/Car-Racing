# Car Racing App

**Deployed UI:** [https://batyrkhan-car-race-project.netlify.app/]  
**Total Score:** 390 / 400

---

## Feature Checklist

### Basic Structure (80 points)
- [x] Two views implemented: Garage and Winners (10)
- [x] Garage view includes:
  - [x] View title
  - [x] Car creation/editing panel
  - [x] Race control panel
  - [x] Garage section (30)
- [x] Winners view includes:
  - [x] View title
  - [x] Winners table
  - [x] Pagination (10)
- [x] Persistent state preserved across view changes (30)

---

### Garage View (80 points)
- [x] CRUD operations (20)
- [x] Color selection with RGB palette (10)
- [x] Random car creation (20)
- [x] Buttons to edit/delete each car (10)
- [x] Pagination (7 cars per page) (10)
- [x] Empty garage message (10)
- [x] Redirect to previous page after deletion of last car on page (30)

---

### Winners View (50 points)
- [x] Winners recorded after a race (15)
- [x] Pagination (10 winners per page) (10)
- [x] Winners table with car №, image, name, wins, best time (15)
- [x] Sorting functionality by wins/time (10)

---

### Race Mechanics (140 points)
- [x] Start engine animation with velocity API response (20)
- [x] Stop engine animation (20)
- [x] Responsive animation (500px screen) (0)
- [x] "Start Race" button triggers all cars (10)
- [x] "Reset Race" returns cars to start (15)
- [x] Winner announcement shown (5)
- [x] Button state handling (20)
- [x] Stable behavior during race: page/view change, car updates, race blocking, etc. (50)

---

### Prettier and ESLint Config (10 points)
- [x] Prettier setup with `format` and `ci:format` scripts (5)
- [x] ESLint with Airbnb, strict TypeScript, `lint` script (5)

---

## Server Mock Repo

```bash
https://github.com/mikhama/async-race-api
```

## Run Locally

```bash
git clone https://github.com/Batyrkhan-Sk/Car-Racing.git
cd car-racing
