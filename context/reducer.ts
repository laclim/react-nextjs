export type Action =
  | { type: "SET_AUTH"; payload: { userId: string } }
  | { type: "LOGOUT" }
  | { type: "SET_TASK"; payload: { title: string; content: string } }
  | { type: "RESET_TASK" }
  | { type: "SET_EMAIL"; payload: { email: string } };

export type UserState = {
  auth: boolean;
  userId: string;
  loading: boolean;
};

type TaskState = {
  title: string;
  content: string;
};
export function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case "SET_AUTH":
      return {
        // ...state,
        auth: true,
        loading: false,
        ...action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        loading: false,
        auth: false
      };

    default:
      return state;
  }
}

export function taskReducer(state: TaskState, action: Action): TaskState {
  switch (action.type) {
    case "SET_TASK":
      return {
        ...state,
        ...action.payload
      };
    case "RESET_TASK":
      return { ...state };

    case "SET_EMAIL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
