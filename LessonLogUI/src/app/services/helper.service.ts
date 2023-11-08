import { Injectable } from '@angular/core';
import {ResponseModel} from "../models/response.model";
import {Pagination} from "../models/pagination.model";
import {StudentFilterDto} from "../models/student-filter.dto";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public paginationModel: Pagination = new Pagination();

  constructor() { }

  public mapResponse<T>(res: ResponseModel<T>) {
    return {
      items: res.items,
      totalPages: res.totalPages,
      itemsFrom: res.itemsFrom,
      itemsTo: res.itemsTo,
      totalItemsCount: res.totalItemsCount
    };
  }

  setPaginationFilter(e: any) {
    this.paginationModel.filters = `(userFirstName|userLastName)@=*${e.target.value}`;
    return this.paginationModel;
  }

  setStudentPaginationFilter(filters: StudentFilterDto) {
    console.log(filters)
    this.paginationModel.filters = `className@=*${filters.name}|classYear@=*${filters.year}`;
    console.log(this.paginationModel.filters)
    return this.paginationModel;
  }

  setClassroomPaginationFilter(e: any) {
    this.paginationModel.filters = `classroomName@=*${e.target.value}`;
    console.log(this.paginationModel.filters)
    return this.paginationModel;
  }

  clearFilters() {
    this.paginationModel.filters = "";
  }

  nextPage(totalPages: number, pageNumber: number): number {
    if(totalPages > pageNumber)
      pageNumber++;

    return pageNumber;
  }

  previousPage(pageNumber: number): number {
    if(pageNumber > 0)
      pageNumber--;

    return pageNumber;
  }

  createRange(number: number): Array<number> {
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
