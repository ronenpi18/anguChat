export class TodoItem {
  constructor(public text: string, public completed: boolean) {
  }
}

enum Statut {online, offline, absent, busy};
export class User {
  name: string;
  statut: Statut;

  constructor(public name: String){
    this.name = name;
  }

  getStatut(){
    return Statut[this.statut];
  }
}
