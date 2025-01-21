import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Box, Image, Input } from "@chakra-ui/react";
import { LuX, LuImage } from "react-icons/lu";
import { UseThread } from "@/types/thread";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@chakra-ui/react";

export default function ThreadForm({
  state,
  handle,
  interaction,
  load,
  threadId,
}: UseThread) {
  state.setValue("parentId", threadId);
  return (
    <DialogRoot
      open={state.dialog}
      placement="top"
      motionPreset="slide-in-bottom"
      size="lg"
    >
      <DialogContent backgroundColor="black" border="1px solid #212121">
        <form
          onSubmit={
            state.statusDialog == "add"
              ? state.handleSubmit(handle.handleSubmitThread)
              : state.handleSubmit(handle.handleSubmitEditThread)
          }
        >
          <DialogBody
            marginTop="1rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
            padding="0rem 1rem"
          >
            <Box
              display="flex"
              gap="0.5rem"
              borderBottom="1px solid #212121"
              padding="1rem 0rem 0rem 0.5rem"
            >
              <Avatar src={state.loggedUser?.Profile?.file} />
              <Textarea
                {...state.register("content")}
                color="white"
                border="none"
                placeholder="What is happening!?"
                fontSize="1rem"
                rows={4}
                resize="none"
                focusRingColor="transparent"
              />
              <Input {...state.register("parentId")} hidden />
            </Box>
          </DialogBody>
          <DialogFooter
            padding="1rem 1.5rem 1rem 1.5rem"
            display="flex"
            flexDirection="column"
            gap="2rem"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Input
                type="file"
                ref={interaction.inputFileRef}
                hidden
                onChange={interaction.onChangeInputFile}
                disabled={state.statusDialog == "add" ? false : true}
              />
              <LuImage
                size="1.5rem"
                color={state.statusDialog == "add" ? "white" : "grey"}
                onClick={interaction.onClickInputFile}
                cursor={state.statusDialog == "add" ? "cursor" : "not-allowed"}
              />
              <Button
                type="submit"
                backgroundColor="white"
                color="black"
                borderRadius="1rem"
                height="2rem"
                loading={
                  state.statusDialog == "add"
                    ? load.isPendingCreateThread
                    : load.isPendingUpdateThread
                }
              >
                {state.statusDialog == "add" ? "Post" : "Save"}
              </Button>
            </Box>
            {state.preview && (
              <Box position="relative">
                <LuX
                  color="white"
                  style={{ position: "absolute", left: "95%", top: "1rem" }}
                  onClick={() => state.setPreview(null)}
                  cursor="pointer"
                />
                <Image src={state.preview} borderRadius="1rem" />
              </Box>
            )}
          </DialogFooter>
          <DialogCloseTrigger onClick={interaction.onCloseDialog} />
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
