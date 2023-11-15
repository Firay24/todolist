export interface taskType {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "rendah" | "sedang" | "tinggi";
  category: string;
  deadline: string;
  created: string;
  customOption?: string;
  steps: any;
}
