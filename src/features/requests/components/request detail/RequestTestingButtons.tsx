        <div className="flex gap-2">
          {/* <Button
            variant="secondary"
            onClick={async () => {
              try {
                const updatedRequest =
                  await updateRequest(
                    request.id,
                    {
                      status: "cancelled",
                    },
                    currentUser.id
                  );

                console.log(
                  "Cancelled Request:",
                  updatedRequest
                );

                showToast(
                  "Request cancelled.",
                  "success"
                );
              } catch (error) {
                console.error(error);

                showToast(
                  "Failed to cancel request.",
                  "error"
                );
              }
            }}
          >
          CANCEL
        </Button> */}

          {/* <Button
            onClick={async () => {
              try {
                await updateRequest(
                  request.id,
                  {
                    assigneeId:
                      selectedAssignee,
                  },
                  currentUser.id
                );

                showToast(
                  "Request reassigned.",
                  "success"
                );
              } catch {
                showToast(
                  "Failed to reassign request.",
                  "error"
                );
              }
            }}
          >
            Reassign
          </Button> */}

            {/* <Button
              variant="secondary"
              onClick={async () => {
                try {
                  await updateRequest(
                    request.id,
                    {
                      status: "pending",
                    },
                    currentUser.id
                  );

                  showToast(
                    "Request moved to pending.",
                    "success"
                  );
                } catch {
                  showToast(
                    "Failed to update request.",
                    "error"
                  );
                }
              }}
            >
              Set Pending
            </Button> */}

            {/* <Button
              variant="secondary"
              onClick={async () => {
                try {
                  await updateRequest(
                    request.id,
                    {
                      status: "open",
                    },
                    currentUser.id
                  );

                  showToast(
                    "Request updated.",
                    "success"
                  );
                } catch {
                  showToast(
                    "Failed to update request.",
                    "error"
                  );
                }
              }}
            >
              Set Open
            </Button> */}

          {/* <Button
            variant="secondary"
            onClick={async () => {
              try {
                const updatedRequest =
                  await updateRequest(
                    request.id,
                    {
                      status: "closed",
                    },
                    currentUser.id
                  );

                console.log(
                  "Updated Request:",
                  updatedRequest
                );

                showToast(
                  "Request closed.",
                  "success"
                );
              } catch (error) {
                console.error(error);

                showToast(
                  "Failed to close request.",
                  "error"
                );
              }
            }}
          >
            TEST CLOSE
          </Button> */}

          {/* <Button
            variant="secondary"
            onClick={async () => {
              try {
                await updateRequest(
                  request.id,
                  {
                    assigneeId: currentUser.id,
                  },
                  currentUser.id
                );

                showToast(
                  "Request assigned.",
                  "success"
                );
              } catch {
                showToast(
                  "Failed to assign request.",
                  "error"
                );
              }
            }}
          >
            Assign To Me
          </Button> */}
        </div>