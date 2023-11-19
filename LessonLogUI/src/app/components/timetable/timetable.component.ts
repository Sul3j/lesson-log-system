import {Component, OnInit} from '@angular/core';
import {Class} from "../../models/class.model";
import {TimetableService} from "../../services/timetable.service";
import {ToastrService} from "ngx-toastr";
import {ClassesService} from "../../services/classes.service";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  public classes: Array<Class> = new Array<Class>();

  constructor(private timetableService: TimetableService,
              private toastr: ToastrService,
              private classesService: ClassesService) {}

  ngOnInit(): void {
    this.timetableService.refreshNeeded
      .subscribe(() => {
        this.getAllClasses();
      })
    this.getAllClasses();
  }

  private getAllClasses() {
    this.classesService.getAllClasses().subscribe(res => {
      this.classes = res as Array<Class>;
    });
  }

}
