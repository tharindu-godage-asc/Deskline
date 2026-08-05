import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { RequestDetail } from "../components/request detail/RequestDetail";
import { getRequestById } from "../../../shared/api/requestApi";
import { ErrorState } from "../components/states/ErrorState";
import { LoadingState } from "../components/states/LoadingState";
import { useAuth } from "../../../shared/context/AuthContext";
import type { Request } from "../../../shared/types/request";
import type { Message } from "../../../shared/types/message";
import type { ErrorInfo } from "../../../shared/mappers/errorMapper";
import { mapStatusCodeToError } from "../../../shared/mappers/errorMapper";

export function RequestDetailPage() {
  const { id } = useParams();
 
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState<Request | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<ErrorInfo | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!id || !currentUser) {
      setRequest(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    getRequestById(id, currentUser.id)
      .then((result) => {
        if (!cancelled) {
          setRequest(result.request);
          setMessages(result.messages);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setError(
            mapStatusCodeToError(
              (error as any)?.status
            )
          );
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id, currentUser]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        title={error.title}
        description={error.description}
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