import { ThreadTypes } from "@/validator/thread";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { User } from "./user";
import { AppDispatch } from "@/global/state/store";

export interface Post {
  id: string;
  content: string;
  author: {
    username: string;
    name: string;
    Profile: {
      file: string;
    };
  };
  authorId: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  replyCount: number;
  parentId: string | null;
  parent: Post | null;
  bookmarkedByUser: boolean;
  likedByUser: boolean;
  replies: Post[];
  file: string | null;
}

export interface Handle {
  handleSubmitThread: (data: ThreadTypes) => Promise<void>;
  handleSubmitEditThread: (data: ThreadTypes) => Promise<void>;
  handleDeleteThread: (threadId: string) => void;
  handleLike: (threadId: string) => void;
  handleUnLike: (threadId: string) => void;
}

export interface State {
  threadId: string;
  statusDialog: string;
  loggedUser: User;
  dialog: boolean;
  deleteDialog: boolean;
  preview: string | null | undefined;
  setValue: UseFormSetValue<ThreadTypes>;
  reset: UseFormReset<ThreadTypes>;
  setPreview: (data: string | null) => void;
  dispatch: AppDispatch;
  setThreadId: (threadId: string) => void;
  register: UseFormRegister<ThreadTypes>;
  handleSubmit: UseFormHandleSubmit<ThreadTypes>;
}

export interface Interaction {
  inputFileRef: React.RefObject<HTMLInputElement>;
  onChangeInputFile: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => (() => void) | undefined;
  onCloseDialog: () => void;
  onClickInputFile: () => void;
}

export interface Load {
  skele: number;
  isPendingCreateThread: boolean;
  isPendingUpdateThread: boolean;
  isPendingDeleteThread: boolean;
}

export interface UseThread {
  handle: Handle;
  state: State;
  interaction: Interaction;
  load: Load;
  threadId: string | null | undefined;
}
