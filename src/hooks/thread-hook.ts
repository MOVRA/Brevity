import { open } from "@/global/state/dialog/dialog-slice";
import { setStatus } from "@/global/state/dialog/status-dialog.slice";
import { AppDispatch, RootState } from "@/global/state/store";
import { ThreadSchema, ThreadTypes } from "@/validator/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateLike,
  CreateThreads,
  DeleteLike,
  DeleteThread,
  UpdateThread,
} from "@/tanstack/thread/thread-tanstack";

export function useThread() {
  const [threadId, setThreadId] = useState<string>("");
  const [preview, setPreview] = useState<string | null | undefined>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const defaultUseForm = {
    content: "",
    file: null,
  };
  const { register, setValue, handleSubmit, reset } = useForm<ThreadTypes>({
    defaultValues: defaultUseForm,
    resolver: zodResolver(ThreadSchema),
  });
  const statusDialog = useSelector(
    (state: RootState) => state.statusDialog.value
  );
  const loggedUser = useSelector((state: RootState) => state.loggedUser.value);
  const dialog = useSelector((state: RootState) => state.dialog.value);
  const deleteDialog = useSelector(
    (state: RootState) => state.deleteDialog.value
  );
  const dispatch = useDispatch<AppDispatch>();
  const { mutateAsync: mutateCreateThread, isPending: isPendingCreateThread } =
    CreateThreads();
  const { mutateAsync: mutateUpdateThread, isPending: isPendingUpdateThread } =
    UpdateThread(threadId);
  const { mutateAsync: mutateCreateLike } = CreateLike();
  const { mutateAsync: mutateDeleteLike } = DeleteLike();
  const { mutateAsync: mutateDeleteThread, isPending: isPendingDeleteThread } =
    DeleteThread();
  const skele = 5;

  function onChangeInputFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }

  function onClickInputFile() {
    inputFileRef.current?.click();
  }

  function onCloseDialog() {
    dispatch(setStatus("add"));
    setPreview(null);
    reset(defaultUseForm);
    setPreview(null);
    dispatch(open(false));
  }

  async function handleSubmitThread(data: ThreadTypes) {
    const response = await mutateCreateThread(data);
    if (response.success) {
      setPreview(null);
      reset();
    }
    return;
  }
  async function handleSubmitEditThread(data: ThreadTypes) {
    const response = await mutateUpdateThread(data);
    if (response.success) {
      setPreview(null);
      reset(defaultUseForm);
    }
    return;
  }

  function handleDeleteThread(threadId: string) {
    mutateDeleteThread(threadId);
    return;
  }
  function handleLike(threadId: string) {
    mutateCreateLike(threadId);
    return;
  }
  function handleUnLike(threadId: string) {
    mutateDeleteLike(threadId);
    return;
  }

  return {
    handle: {
      handleSubmitThread,
      handleSubmitEditThread,
      handleDeleteThread,
      handleLike,
      handleUnLike,
    },
    interaction: {
      inputFileRef,
      onChangeInputFile,
      onCloseDialog,
      onClickInputFile,
    },
    load: {
      skele,
      isPendingCreateThread,
      isPendingUpdateThread,
      isPendingDeleteThread,
    },
    state: {
      threadId,
      statusDialog,
      loggedUser,
      dialog,
      deleteDialog,
      preview,
      setValue,
      reset,
      setPreview,
      dispatch,
      setThreadId,
      register,
      handleSubmit,
    },
    threadId,
  };
}
