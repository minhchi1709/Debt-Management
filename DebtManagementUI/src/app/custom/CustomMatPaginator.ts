import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";

@Injectable(

)
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Hiển thị mỗi trang:';
  override nextPageLabel = 'Trang tiếp';
  override previousPageLabel = 'Trang trước';
  override firstPageLabel = 'Trang đầu';
  override lastPageLabel = 'Trang cuối';

  override getRangeLabel = function (page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 trên ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} trên ${length}`;
  };
}
