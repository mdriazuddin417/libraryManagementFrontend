# 📚 MyBooks – Digital Library Management System

A minimal yet functional client-side **Library Management System** built using **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**. This project allows users to browse, add, edit, delete, and borrow books without any login/authentication mechanism.

---

## 🔍 Project Overview

MyBooks is a clean and responsive digital library platform. It enables users to:

- View the list of books.
- Add, edit, and delete books.
- Borrow books.
- View borrow summaries (aggregated).

This is a frontend-only application that consumes a RESTful API to perform all operations. Ideal for learning state management and UI design with RTK Query.

---

## ✨ Features

### 1. **Public Routes**
No authentication is required. All pages are open to public access.

### 2. **Book Management**
- **List View**: Displays all books in a tabular format with key details:
  - `Title`, `Author`, `Genre`, `ISBN`, `Copies`, `Availability`, and `Actions`
- **Actions**:
  - ✏️ **Edit** – Update existing book details via form.
  - ❌ **Delete** – Confirm and remove the book.
  - 📚 **Borrow** – Borrow a selected quantity of the book.
- **Add New Book**:
  - Fields: `Title`, `Author`, `Genre`, `ISBN`, `Description`, `Copies`
  - Optional: Availability (`true` by default)
  - Auto-redirect to the list after submission

### 3. **Borrow Book**
- Opens via a button in the book list.
- Fields:
  - `Quantity`
  - `Due Date`
- Rules:
  - Quantity must not exceed available copies.
  - If copies reach zero, book becomes unavailable.
- Success message and redirect to Borrow Summary on completion.

### 4. **Borrow Summary**
- Aggregated report of borrowed books.
- Columns:
  - `Book Title`, `ISBN`, `Total Quantity Borrowed`

---

## 🧩 UI Components

### 🌐 Navbar
- Navigation links:
  - All Books
  - Add Book
  - Borrow Summary

### 📚 Book Table
- Main interactive table displaying all books with action buttons.

### 📄 Forms
- Modal-based forms for:
  - Add/Edit Book
  - Borrow Book

### 📊 Summary
- Displays total borrowed books and basic analytics.

### 👥 Librarian Section
- Shows a list of expert librarians with their roles.

### 📩 Newsletter
- Newsletter subscription UI (frontend only, no backend)

### 📦 Stats Section
- Shows stats like:
  - Total Books, Available, Borrowed, Unique Titles

---

## 🛠️ Tech Stack

- **React**
- **Redux Toolkit Query (RTK Query)**
- **TypeScript**
- **Tailwind CSS** (for styling)
- **RESTful API** (assumed backend)

---

## 🏗️ Installation

```bash
git clone https://github.com/mdriazuddin417/libraryManagementFrontend.git
npm install
npm run dev
