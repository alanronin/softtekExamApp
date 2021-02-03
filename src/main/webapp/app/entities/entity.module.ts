import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.SofftekExamTeacherModule),
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.SofftekExamCourseModule),
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.SofftekExamStudentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SofftekExamEntityModule {}
