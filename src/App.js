import "./App.css";
import { useRoutes } from "react-router-dom";
import Routes from "./Router";
import { QueryClientProvider, QueryClient } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  const routing = useRoutes(Routes);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark">{routing}</div>
    </QueryClientProvider>
  );
};

export default App;
