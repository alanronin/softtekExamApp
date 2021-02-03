import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html',
})
export class StudentUpdateComponent implements OnInit {
  isSaving = false;
  courses: ICourse[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    addressLine: [null, [Validators.required]],
    city: [null, [Validators.required]],
    state: [],
    countryCode: [null, [Validators.required]],
    languageCode: [null, [Validators.required]],
    contactPhone: [null, [Validators.required]],
    courses: [],
  });

  constructor(
    protected studentService: StudentService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);

      this.courseService.query().subscribe((res: HttpResponse<ICourse[]>) => (this.courses = res.body || []));
    });
  }

  updateForm(student: IStudent): void {
    this.editForm.patchValue({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      addressLine: student.addressLine,
      city: student.city,
      state: student.state,
      countryCode: student.countryCode,
      languageCode: student.languageCode,
      contactPhone: student.contactPhone,
      courses: student.courses,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    return {
      ...new Student(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      addressLine: this.editForm.get(['addressLine'])!.value,
      city: this.editForm.get(['city'])!.value,
      state: this.editForm.get(['state'])!.value,
      countryCode: this.editForm.get(['countryCode'])!.value,
      languageCode: this.editForm.get(['languageCode'])!.value,
      contactPhone: this.editForm.get(['contactPhone'])!.value,
      courses: this.editForm.get(['courses'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICourse): any {
    return item.id;
  }

  getSelected(selectedVals: ICourse[], option: ICourse): ICourse {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
