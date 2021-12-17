import { TwoFactorProviderType } from "../../../enums/twoFactorProviderType";

import { CaptchaProtectedRequest } from "../captchaProtectedRequest";
import { DeviceRequest } from "../deviceRequest";

export interface TwoFactorData {
  provider: TwoFactorProviderType;
  token: string;
  remember: boolean;
}

export abstract class TokenRequest implements CaptchaProtectedRequest {
  protected device?: DeviceRequest;

  constructor(
    protected twoFactor: TwoFactorData,
    public captchaResponse: string,
    device?: DeviceRequest
  ) {
    this.device = device != null ? device : null;
  }

  toIdentityToken(clientId: string) {
    const obj: any = {
      scope: "api offline_access",
      client_id: clientId,
    };

    if (this.device) {
      obj.deviceType = this.device.type;
      obj.deviceIdentifier = this.device.identifier;
      obj.deviceName = this.device.name;
      // no push tokens for browser apps yet
      // obj.devicePushToken = this.device.pushToken;
    }

    if (this.twoFactor.token && this.twoFactor.provider != null) {
      obj.twoFactorToken = this.twoFactor.token;
      obj.twoFactorProvider = this.twoFactor.provider;
      obj.twoFactorRemember = this.twoFactor.remember ? "1" : "0";
    }

    if (this.captchaResponse != null) {
      obj.captchaResponse = this.captchaResponse;
    }

    return obj;
  }

  alterIdentityTokenHeaders(headers: Headers) {
    // Implemented in subclass if required
  }
}