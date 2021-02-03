import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITeacher, Teacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'jhi-teacher-update',
  templateUrl: './teacher-update.component.html',
})
export class TeacherUpdateComponent implements OnInit {
  isSaving = false;

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
    phone: [null, [Validators.required]],
  });

  constructor(protected teacherService: TeacherService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teacher }) => {
      this.updateForm(teacher);
    });
  }

  updateForm(teacher: ITeacher): void {
    this.editForm.patchValue({
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      addressLine: teacher.addressLine,
      city: teacher.city,
      state: teacher.state,
      countryCode: teacher.countryCode,
      languageCode: teacher.languageCode,
      phone: teacher.phone,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teacher = this.createFromForm();
    if (teacher.id !== undefined) {
      this.subscribeToSaveResponse(this.teacherService.update(teacher));
    } else {
      this.subscribeToSaveResponse(this.teacherService.create(teacher));
    }
  }

  private createFromForm(): ITeacher {
    return {
      ...new Teacher(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      addressLine: this.editForm.get(['addressLine'])!.value,
      city: this.editForm.get(['city'])!.value,
      state: this.editForm.get(['state'])!.value,
      countryCode: this.editForm.get(['countryCode'])!.value,
      languageCode: this.editForm.get(['languageCode'])!.value,
      phone: this.editForm.get(['phone'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>): void {
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
}
