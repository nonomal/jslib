import { Directive, HostBinding, Input, Optional, Self } from "@angular/core";
import { NgControl, Validators } from "@angular/forms";

// Increments for each instance of the input component
let nextId = 0;

@Directive({
  selector: "input[bitInput]",
  host: {
    "[attr.id]": "id",
    "[required]": "required",
  },
})
export class BitInput {
  @HostBinding("class") @Input() get classList() {
    return [
      "tw-block",
      "tw-px-3",
      "tw-py-1.5",
      "tw-bg-background-alt",
      "tw-border",
      "tw-border-solid",
      "tw-border-secondary-500",
      "tw-rounded",
      "tw-text-main",
      "tw-placeholder-text-muted",
      "focus:tw-outline-none",
      "focus:tw-border-primary-700",
      "focus:tw-ring-1",
      "focus:tw-ring-primary-700",
      "focus:tw-z-10",
      "disabled:tw-bg-secondary-100",
      this.hasPrefix ? "tw-rounded-l-none" : "",
      this.hasSuffix ? "tw-rounded-r-none" : "",
    ].filter((s) => s != "");
  }

  id = `bit-input-${nextId++}`;

  @Input()
  get required() {
    return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }
  set required(value: any) {
    this._required = value != null && value !== false;
  }
  private _required: boolean;

  @Input() hasPrefix = false;
  @Input() hasSuffix = false;

  constructor(@Optional() @Self() private ngControl: NgControl) {}
}
