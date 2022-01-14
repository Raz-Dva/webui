import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input,
} from '@angular/core';
import {
  ControlValueAccessor, NgControl, FormControl,
} from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { fileListItems } from 'app/helpers/filelist.helper';
import { IxFormatterService } from '../../services/ix-formatter.service';

@UntilDestroy()
@Component({
  selector: 'ix-file-input',
  templateUrl: './ix-file-input.component.html',
  styleUrls: ['./ix-file-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IxFileInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() tooltip: string;
  @Input() acceptedFiles = '*.*';
  @Input() multiple: boolean;
  @Input() required: boolean;

  value: FileList;
  isDisabled = false;

  formControl = new FormControl(this).value as FormControl;

  onChange: (value: FileList) => void = (): void => {};
  onTouch: () => void = (): void => {};

  constructor(
    public controlDirective: NgControl,
    private cdr: ChangeDetectorRef,
    private formatter: IxFormatterService,
  ) {
    this.controlDirective.valueAccessor = this;
  }

  onChanged(value: FileList): void {
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: FileList): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(onChange: (value: FileList) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouch = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  removeFile(file: File): void {
    const files = Array.from(this.value);
    files.splice(files.indexOf(file), 1);
    this.onChanged(fileListItems(files));
    this.cdr.markForCheck();
  }

  formatSize(size: number): string {
    return this.formatter.convertBytestoHumanReadable(size);
  }
}
