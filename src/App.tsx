import { AppShell } from "./app/layout/AppShell";
import { RequestList } from "./features/requests/components/RequestList";
import { RequestDetail } from "./features/requests/components/RequestDetails";

function App() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-2">
        <RequestList />
        <RequestDetail />
      </div>
    </AppShell>
  );
}

export default App;