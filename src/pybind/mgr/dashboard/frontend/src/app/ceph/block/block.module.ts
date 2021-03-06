import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SharedModule } from '../../shared/shared.module';
import { IscsiComponent } from './iscsi/iscsi.component';
import { MirroringModule } from './mirroring/mirroring.module';
import { RbdDetailsComponent } from './rbd-details/rbd-details.component';
import { RbdFormComponent } from './rbd-form/rbd-form.component';
import { RbdImagesComponent } from './rbd-images/rbd-images.component';
import { RbdListComponent } from './rbd-list/rbd-list.component';
import { RbdSnapshotFormComponent } from './rbd-snapshot-form/rbd-snapshot-form.component';
import { RbdSnapshotListComponent } from './rbd-snapshot-list/rbd-snapshot-list.component';
import { RbdTrashListComponent } from './rbd-trash-list/rbd-trash-list.component';
import { RbdTrashMoveModalComponent } from './rbd-trash-move-modal/rbd-trash-move-modal.component';
import { RbdTrashPurgeModalComponent } from './rbd-trash-purge-modal/rbd-trash-purge-modal.component';
import { RbdTrashRestoreModalComponent } from './rbd-trash-restore-modal/rbd-trash-restore-modal.component';

@NgModule({
  entryComponents: [
    RbdDetailsComponent,
    RbdSnapshotFormComponent,
    RbdTrashMoveModalComponent,
    RbdTrashRestoreModalComponent,
    RbdTrashPurgeModalComponent
  ],
  imports: [
    CommonModule,
    MirroringModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
    RouterModule
  ],
  declarations: [
    RbdListComponent,
    IscsiComponent,
    RbdDetailsComponent,
    RbdFormComponent,
    RbdSnapshotListComponent,
    RbdSnapshotFormComponent,
    RbdTrashListComponent,
    RbdTrashMoveModalComponent,
    RbdImagesComponent,
    RbdTrashRestoreModalComponent,
    RbdTrashPurgeModalComponent
  ]
})
export class BlockModule {}
