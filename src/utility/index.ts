import { PROJECT_STATUS } from "./constants";

export * from "./supabaseClient";

export const getProjectStatusColor = (status: any) => {
  switch (status) {
    case PROJECT_STATUS.PLANNING:
      return 'yellow';
    case PROJECT_STATUS.COMPLETED:
        return 'green';
  }
};
