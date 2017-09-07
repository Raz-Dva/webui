import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgUploaderModule } from 'ngx-uploader';

import { EntityModule } from '../common/entity/entity.module';

import { MaterialModule } from '@angular/material';
import { routing } from './system.routing';

import { GeneralComponent } from './general/general.component';
import { ConfigSaveComponent } from './general/config-save/config-save.component';
import { ConfigUploadComponent } from './general/config-upload/config-upload.component';
import { ConfigResetComponent } from './general/config-reset/config-reset.component';
import { AdvancedComponent } from './advanced/';
import { BootEnvironmentCloneComponent } from './bootenv/bootenv-clone/';
import { BootEnvironmentListComponent } from './bootenv/bootenv-list/';

@NgModule({
  imports: [
    EntityModule, CommonModule, FormsModule,
    ReactiveFormsModule, NgUploaderModule, routing,
    MaterialModule
  ],
  declarations: [
    GeneralComponent,
    ConfigUploadComponent,
    ConfigResetComponent,
    ConfigSaveComponent,
    AdvancedComponent,
    BootEnvironmentListComponent,
    BootEnvironmentCloneComponent
  ],
  providers: []
})
export class SystemModule {}
