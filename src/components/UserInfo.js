export class UserInfo {

  constructor({ profileNameSelector, profileProfessionSelector, profileAvatarSelector }) {

    this._nameElement = document.querySelector(profileNameSelector);
    this._professionElement = document.querySelector(profileProfessionSelector);
    this._avatarElement = document.querySelector(profileAvatarSelector);

  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent
    }
  }

  setUserInfo(name, profession, avatar) {

    this._nameElement.textContent = name;
    this._professionElement.textContent = profession;
    this._avatarElement.src = avatar;

  }

}
