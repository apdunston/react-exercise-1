import React, {Component} from 'react';
import './App.css';

const list =
  [
    {
      id: 1,
      group: "Purchases",
      task: "Go to the bank",
      dependencyIds: [],
      completedAt: null
  },
  {
      id: 2,
      group: "Purchases",
      task: "Buy hammer",
      dependencyIds: [1],
      completedAt: null
  },
  {
      id: 3,
      group: "Purchases",
      task: "Buy wood",
      dependencyIds: [1],
      completedAt: null
  },
  {
      id: 4,
      group: "Purchases",
      task: "Buy nails",
      dependencyIds: [1],
      completedAt: null
  },
  {
      id: 5,
      group: "Purchases",
      task: "Buy paint",
      dependencyIds: [1],
      completedAt: null
  },
  {
      id: 6,
      group: "Build Airplane",
      task: "Hammer nails into wood",
      dependencyIds: [2, 3, 4],
      completedAt: null
  },
  {
      id: 7,
      group: "Build Airplane",
      task: "Paint wings",
      dependencyIds: [5, 6],
      completedAt: null
  },
  {
      id: 8,
      group: "Build Airplane",
      task: "Have a snack",
      dependencyIds: [],
      completedAt: null
  }
  ];


class App extends Component {
  constructor(props) {
    super(props);

    // this.onDismiss = this.onDismiss.bind(this);
  }

  render() {
    // Map of sorted lists of tasks.
    let groups = list.reduce((acc, item) => {
      let list = acc[item.group];
      list = list == null ? [] : list;
      list.push(item);
      acc[item.group] = list.sort((a,b) => a.id - b.id);
      return acc;
    }, {});

    return (
      <div className="App">
        <div className="row">
          <div className="column">
            <img src="/villaincon.jpg" className="little-logo" alt="VillainCon logo - a globe with a villain's mask on it."/>
          </div>
          <div className="column">
            <h1>World Domination List</h1>
            <h2>First some errands, then THE WORLD!</h2> 
          </div>
          <div className="column">
            <img src="/villaincon.jpg" className="little-logo" alt="VillainCon logo - a globe with a villain's mask on it."/>
          </div>
        </div>
        <GroupList groups={groups}/>
        {Object.keys(groups).map(groupName => 
          <Group key={groupName} name={groupName} tasks={groups[groupName]} />
        )}
      </div>
    );
  }
}

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: props.groups,
    };

    // this.onDismiss = this.onDismiss.bind(this);
  }

  render() {
    return (
      <div className="main mx-auto">
        <ul className="list-group">
          {Object.keys(this.state.groups).sort().map(group =>
            <li key={group} className="list-group-item list-group-item-action">
              <div>{group}</div>
              <div>x out of x completed</div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      tasks: props.tasks
    };

    // this.onDismiss = this.onDismiss.bind(this);
  }

  render() {
    return (
      <div className="main mx-auto">
        <strong>{this.state.name}</strong>
        <ul className="list-group">
          {this.state.tasks.map(task =>
            <Task task={task}/>
          )}
        </ul>
      </div>
    );
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    console.log("task: ", props.task);
    this.state = {
      task: props.task,
      completed: props.task.completedAt != null
    };
  }

  render() {
    let checkboxId = "checkbox-" + this.state.task.id;
    return (
      <li key={this.state.task.id} className="form-check list-group-item list-group-item-action">
        <input className="form-check-input" type="checkbox" value="" checked={this.state.completed} id={checkboxId}/>
        <label className="form-check-label" htmlFor={checkboxId}>
          {this.state.task.task}
        </label>
      </li>
    )
  }
}


export default App;
