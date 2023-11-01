export class CardanoFoundation {
  static readonly BASE_URL = process.env.API_URL;

  static SignIn = class {
    public static get Base() {
      return `${CardanoFoundation.BASE_URL}/auth/sign-in`;
    }
  };
}
