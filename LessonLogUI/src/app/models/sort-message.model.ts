export interface SortMessage {
  id: number;
  from: number;
  fromName: string;
  to?: number;
  toName?: string;
  content: string;
  group?: number;
  groupName?: string;
}
