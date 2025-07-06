import { Toaster as Sonner } from "@/components/ui/sonner";
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { TooltipProvider } from "./components/ui/tooltip";
import BookDetails from "./pages/BookDetails";
import BookList from "./pages/BookList";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { store } from "./store/store";
function App() {

  return (
   <Provider store={store}>
      <TooltipProvider>
        <Sonner position="top-center"/>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/create-book" element={<CreateBook />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/edit-book/:id" element={<EditBook />} />
              <Route path="/borrow/:bookId" element={<BorrowBook />} />
              <Route path="/borrow-summary" element={<BorrowSummary />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
  </Provider>
  )
}

export default App
