export default interface ChatType {
  id: string;
  title: string;
  modelId: string;
  createdAt: number;
  updatedAt: number;
  isArchived: boolean;
  namedBy: "Human" | "Asistan";
}
