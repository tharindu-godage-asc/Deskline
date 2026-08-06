import { useState } from "react";
import { Button } from "../../../shared/ui/button/Button";
import { Card } from "../../../shared/ui/Card";
import { requestSchema } from "../schemas/requestSchema";
import { getCurrentUser } from "../../../shared/api/auth";
import {createRequest} from "../../../shared/api/requestApi";
import { useToast } from "../../../shared/context/ToastContext";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";

export function NewRequestPage() {
  const currentUser = getCurrentUser();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [priority, setPriority] = useState("medium");
const [errors, setErrors] = useState({
  title: "",
  category: "",
  priority: "",
  description: "",
});
const [isSubmitting, setIsSubmitting] = useState(false);
const { showToast } = useToast();



const handleSubmit = async (
      event: React.FormEvent<HTMLFormElement>
      ) => {
        event.preventDefault();
          const result = requestSchema.safeParse({
              title,
              category,
              priority,
              description,
            });
          if (!result.success) {
            const fieldErrors =
              result.error.flatten().fieldErrors;

            setErrors({
              title:
                fieldErrors.title?.[0] ?? "",
              category:
                fieldErrors.category?.[0] ?? "",
              priority:
                fieldErrors.priority?.[0] ?? "",
              description:
                fieldErrors.description?.[0] ?? "",
            });
            return;
          }
          setErrors({
            title: "",
            category: "",
            priority: "",
            description: "",
          });
          try{
            setIsSubmitting(true)
            await createRequest({
              title,
              category,
              priority,
              description,
              requesterId:
                currentUser.id,
              authorId:
                currentUser.id,
            }, currentUser.id);
            showToast(
              "Request created successfully.",
              "success"
            );
            setTitle("");
            setCategory("");
            setPriority("medium");
            setDescription("");
        }catch {  
          showToast(
              "Request Creation Failed",
              "error"
            );
        }
        finally{
          setIsSubmitting(false);
        }
          }

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            New Request
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new support request.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium"
            >
              Title
            </label>

            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  title: "",
                }));
              }}
              placeholder="Brief summary of the issue"
              className="w-full rounded-md border px-3 py-2"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title}
              </p>
            )}

          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium"
            >
              Category
            </label>

            <Select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  category: "",
                }));
              }}
            >
              <option value="">
                Select a category
              </option>

              <option value="hardware">
                Hardware
              </option>

              <option value="software">
                Software
              </option>

              <option value="facilities">
                Facilities
              </option>

              <option value="access">
                Access
              </option>
            </Select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-1 block text-sm font-medium"
            >
              Priority
            </label>

            <Select
              id="priority"
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  priority: "",
                }));
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
            {errors.priority && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.priority}
                </p>
              )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  description: "",
                }));
              }}
              placeholder="Provide details about the issue..."
              className="w-full rounded-md border border-gray-200 px-3 py-2"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating..."
                : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}