import { AppShell } from "./app/layout/AppShell";
import { RequestList } from "./features/requests/components/RequestList";
import { RequestDetail } from "./features/requests/components/RequestDetails";

function App() {
  return (
    <AppShell>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        <RequestList />
        <RequestDetail />
      </div>
    </AppShell>
  );
}

export default App;