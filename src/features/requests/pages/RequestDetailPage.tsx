import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { RequestDetail } from "../components/RequestDetail";
import { getRequestById } from "../../../shared/api/requestApi";
import { ErrorState } from "../components/states/ErrorState";
import { LoadingState } from "../components/states/LoadingState";

export function RequestDetailPage() {
  const { id } = useParams();
 
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setRequest(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    void getRequestById(id)
      .then((result) => {
        if (!cancelled) {
          setRequest(result.request);
          setMessages(result.messages);
          setIsLoading(false);
          console.log(
            "Request API Response - Comments + Details:",
            result
          );

          console.log(
            "Comments:",
            result.messages
          );
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        onRetry={() =>
          window.location.reload()
        }
      />
    );
  }

  if (!request) {
    return (
      <Navigate
        to="/my-requests"
        replace
      />
    );
  }

  return (
    <RequestDetail
      request={request}
      messages={messages}
    />
  );
}