import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGetBookQuery, useUpdateBookMutation } from "../store/libraryApi";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: isLoadingBook } = useGetBookQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();


  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre || "",
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies as number,
        available: book.available as boolean,
      });
    }
  }, [book]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.author ||
      !formData.genre ||
      !formData.isbn
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await updateBook({ id: id!, ...formData }).unwrap();
      toast.success('Book updated successfully');
      navigate(`/books/${id}`);
    } catch {
      toast.error('Failed to update book');
    }
  };

  if (isLoadingBook) return <LoadingSpinner />;
  if (!book) return <div className="text-center py-8">Book not found</div>;

  console.log('formData.genre', formData.genre);

  return (
    <div className=" max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8  h-[calc(100vh-15.5rem)] flex justify-center items-center">
      <div className="bg-white shadow-sm rounded-lg w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Edit Book</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div>
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div>
              <Label >Genre *</Label>
              <Select
                name="genre"
                value={formData.genre || book.genre}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, genre: value }))
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FICTION">FICTION</SelectItem>
                  <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                  <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                  <SelectItem value="HISTORY">HISTORY</SelectItem>
                  <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                  <SelectItem value="FANTASY">FANTASY</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="isbn">ISBN *</Label>
              <Input
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN"
                required
              />
            </div>

            <div>
              <Label htmlFor="copies">Number of Copies</Label>
              <Input
                id="copies"
                name="copies"
                type="number"
                min="1"
                value={formData.copies}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter book description (optional)"
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isUpdating ? "Updating..." : "Update Book"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
