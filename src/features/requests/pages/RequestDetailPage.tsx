import { Navigate, useParams } from "react-router-dom";

import { RequestDetail } from "../components/request detail/RequestDetail";
import { ErrorState } from "../components/states/ErrorState";
import { LoadingState } from "../components/states/LoadingState";
import { useAuth } from "../../../shared/context/AuthContext";
import { mapStatusCodeToError } from "../../../shared/mappers/errorMapper";
import { useRequestDetail } from "../../../shared/hooks/queries/useRequestDetail";

export function RequestDetailPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
const {
  data,
  isLoading: queryLoading,
  error: queryError,
} = useRequestDetail(
  id ?? "",
  currentUser?.id ?? ""
);

const request = data?.request ?? null;
const messages = data?.messages ?? [];


  if (queryLoading) {
  return <LoadingState />;
}

  if (queryError) {
  const errorInfo =
    mapStatusCodeToError(
      (queryError as any)?.status
    );

  return (
    <ErrorState
      title={errorInfo.title}
      description={errorInfo.description}
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