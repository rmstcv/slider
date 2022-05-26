class Subject {

  observers: any;

  constructor() {
    this.observers = [];
  }

  subScribe(observer: any) {
    this.observers.push(observer);
  }

  update() {
    this.observers.forEach((observer: any) => {   
      observer.updateObserver();
    });
  }
}

export default Subject;