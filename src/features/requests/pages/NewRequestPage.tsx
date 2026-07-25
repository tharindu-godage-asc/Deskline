import { Button } from "../../../shared/ui/button/Button";
import { Card } from "../../../shared/ui/Card";

export function NewRequestPage() {
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("Submit request");
  };

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

            <input
              id="title"
              type="text"
              placeholder="Brief summary of the issue"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium"
            >
              Category
            </label>

            <select
              id="category"
              className="w-full rounded-md border px-3 py-2"
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

              <option value="network">
                Network
              </option>

              <option value="access">
                Access
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-1 block text-sm font-medium"
            >
              Priority
            </label>

            <select
              id="priority"
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
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
              placeholder="Provide details about the issue..."
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}