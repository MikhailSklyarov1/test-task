import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/task';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-showpage',
  templateUrl: './showpage.component.html',
  styleUrls: ['./showpage.component.css'],
})
export class ShowpageComponent implements OnInit {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}
  protected displayedColumns: string[] = [
    'title',
    'created',
    'deadline',
    'controls',
  ];
  private srcData = this.taskService.dataSource.data;
  protected dataSource = this.taskService.dataSource;
  protected hoveredIndex = null;

  private currentDates = this.srcData.filter(
    (el) =>
      el.deadline.getUTCDate() == this.taskService.currentData.getUTCDate()
  );
  private processingMessage: boolean;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  openDialog(item: ITask) {
    this.dialog.open(DetailDialog, {
      data: item,
    });
  }

  moveUp(i: number) {
    if (i != 0) {
      this.taskService.dataSource.data.splice(
        i - 1,
        0,
        this.srcData.splice(i, 1)[0]
      );
      this.dataSource._updateChangeSubscription();
    }
  }

  moveDown(i: number) {
    if (i != this.srcData.length - 1) {
      this.taskService.dataSource.data.splice(
        i + 1,
        0,
        this.srcData.splice(i, 1)[0]
      );
      this.dataSource._updateChangeSubscription();
    }
  }

  protected displaySnackbar(): void {
    const nextMessage = this.getNextMessage();

    if (!nextMessage) {
      this.processingMessage = false; // No message in the queue, set flag false
      return;
    }

    this.processingMessage = true; // A message was dequeued and is being processed

    this._snackBar
      .open(
        `Today is "${nextMessage.title}" deadline! Check if everything is ready?`,
        'Got it!',
        { duration: 3000 }
      )
      .afterDismissed()
      .subscribe(() => {
        this.displaySnackbar();
      });
  }

  protected getNextMessage(): ITask | undefined {
    return this.currentDates.length ? this.currentDates.shift() : undefined;
  }

  ngOnInit() {
    this.displaySnackbar();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

@Component({
  selector: 'detail-dialog',
  templateUrl: './details/detail-dialog.component.html',
  styleUrls: ['./details/detail-dialog.component.css'],
})
export class DetailDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ITask) {}
}
