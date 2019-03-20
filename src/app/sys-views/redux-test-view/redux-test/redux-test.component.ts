import { Component,  Inject } from '@angular/core';
import { AppStore } from 'src/app/common/redux/core/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/common/redux/core/app.state';
import * as CounterActions from 'src/app/common/redux/core/counter.actions';

@Component({
  selector: 'app-redux-test',
  templateUrl: './redux-test.component.html',
  styleUrls: ['./redux-test.component.css']
})
export class ReduxTestComponent {

  counter: number;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    alert("ReduxTestComponent 의 constructor 진입");
    store.subscribe(() => this.readState());
    this.readState();
  }
  
  readState() {
    alert("ReduxTestComponent 의 readState 함수 작동");
    const state: AppState = this.store.getState() as AppState;
    this.counter = state.counter;
   
  }

  increment() {
    alert("ReduxTestComponent 의 increment 함수 작동");
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    alert("ReduxTestComponent 의 decrement 함수 작동");
    this.store.dispatch(CounterActions.decrement());
  }
}
