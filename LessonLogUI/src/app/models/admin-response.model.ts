import {AdminModel} from "./admin.model";

export class AdminResponse {
  items!: AdminModel[];
  totalPages!: number;
  itemsFrom!: number;
  itemsTo!: number;
  totalItemsCount!: number;
}
