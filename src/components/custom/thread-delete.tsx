import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { Handle, Load, State } from "@/types/thread";
import { openDelete } from "../../global/state/dialog/delete-dialog.slice";

export default function ThreadDelete({
  state,
  handle,
  load,
}: {
  state: State;
  handle: Handle;
  load: Load;
}) {
  return (
    <>
      <DialogRoot open={state.deleteDialog} size="lg">
        <DialogContent
          backgroundColor="black"
          border="1px solid #212121"
          color="white"
        >
          <DialogHeader>Are you sure?</DialogHeader>
          <DialogBody>
            Are you sure want to delete this thread? this action cannot be
            resolve.
          </DialogBody>
          <DialogFooter>
            <Button
              onClick={() => handle.handleDeleteThread(state.threadId)}
              loading={load.isPendingDeleteThread}
              backgroundColor="transparent"
              border="1px solid red"
              color="red"
              borderRadius="1rem"
              height="2rem"
            >
              Delete
            </Button>
            <Button
              backgroundColor="transparent"
              border="1px solid white"
              color="white"
              borderRadius="1rem"
              height="2rem"
              onClick={() => {
                state.dispatch(openDelete(false));
                state.setThreadId("");
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
