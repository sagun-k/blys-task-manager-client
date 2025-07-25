export type TaskStats = {
total?:number
  status?: {
    pending?: number;
    inProgress?: number;
    completed?: number;
  };
  priority?: {
    low?: number;
    medium?: number;
    high?: number;
  };
};
