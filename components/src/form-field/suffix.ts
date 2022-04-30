import { Directive, HostBinding, Input } from "@angular/core";

import { PrefixClasses } from "./prefix";

@Directive({
  selector: "[bitSuffix]",
})
export class BitSuffix {
  @HostBinding("class") @Input() get classList() {
    return PrefixClasses.concat([
      "tw-rounded-l-none",
      "tw-border-l-0",
      !this.last ? "tw-rounded-r-none" : "",
    ]).filter((c) => c != "");
  }

  @Input() last = false;
}
