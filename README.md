# 🎓 Students API - CI/CD Project

![CI Status](https://github.com/TON_USER/TON_REPO/actions/workflows/ci.yml/badge.svg)

## 🚀 API Documentation

### Base URL: `/students`

| Endpoint | Method | Description | Params |
| :--- | :--- | :--- | :--- |
| `/students` | GET | List all students | `page`, `limit`, `sort`, `order` |
| `/students/:id` | GET | Get one student | - |
| `/students/search`| GET | Search by name | `q=nom` |
| `/students/stats` | GET | Global statistics | - |
| `/students` | POST | Create student | Body (JSON) |

### Example Pagination & Sort
`GET /students?page=1&limit=5&sort=grade&order=desc`