import React, {Component} from 'react';
import './App.css';

const LIST =
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

const GROUP_NAMES = [...new Set(LIST.map(item => item.group))].sort();

class App extends Component {
  constructor(props) {
    super(props);

    let tasks = LIST.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});


    this.state = {
      tasks: tasks,
      currentGroup: null
    }

    // this.onDismiss = this.onDismiss.bind(this);
    this.goToGroup = this.goToGroup.bind(this);
    this.goToGroupList = this.goToGroupList.bind(this);
    this.checked = this.checked.bind(this);
    this.toggle = this.toggle.bind(this);
    this.groupTasks = this.groupTasks.bind(this);
  }

  goToGroup(groupName) {
    this.setState({
      currentGroup: groupName
    })
  }

  goToGroupList() {
    this.setState({
      currentGroup: null
    })
  }

  checked(id) {
    return this.state.tasks[id].completedAt != null;
  }

  toggle(id) {
    let tasks = this.state.tasks;
    
    if (this.checked(id)) {
      tasks[id].completedAt =  null;
    } else {
      tasks[id].completedAt = new Date();
    }

    this.setState({tasks: tasks});
  }

  groupTasks(groupName) {
    return Object.values(this.state.tasks).filter(task => task.group === groupName);
  }

  render() {
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
        { this.state.currentGroup == null ? 
          <GroupList 
            goToGroup={this.goToGroup} 
            goToGroupList={this.goToGroupList}
            groupTasks={this.groupTasks}
          /> 
          : null 
        }
        { this.state.currentGroup != null ? 
          <Group 
            name={this.state.currentGroup} 
            tasks={this.groupTasks(this.state.currentGroup)} 
            goToGroupList={this.goToGroupList}
            checked={this.checked}
            toggle={this.toggle}
          />
          : null
        }
      </div>
    );
  }
}

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToGroup: props.goToGroup,
      groupTasks: props.groupTasks
    };

    // this.onDismiss = this.onDismiss.bind(this);
  }

  render() {
    return (
      <div className="main mx-auto">
        <ul className="list-group">
          {GROUP_NAMES.map(groupName =>            
            <li key={groupName} className="list-group-item list-group-item-action" onClick={() => this.state.goToGroup(groupName)}>
              <div>{groupName}</div>
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
      tasks: props.tasks,
      goToGroupList: props.goToGroupList,
      toggle: props.toggle,
      checked: props.checked
    };

    // this.onDismiss = this.onDismiss.bind(this);
  }

  render() {
    return (
      <div className="main mx-auto">
        <button type="button" onClick={() => this.state.goToGroupList()}>All Groups</button>
        <strong>{this.state.name}</strong>
        <ul className="list-group">
          {this.state.tasks.map(task =>
            <Task key={task.id} task={task} toggle={this.state.toggle} checked={this.state.checked}/>
          )}
        </ul>
      </div>
    );
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.task,
      toggle: props.toggle,
      checked: props.checked
    };
  }

  render() {
    let id = this.state.task.id;
    let checkboxId = "checkbox-" + id;
    return (
      <li key={id} className="form-check list-group-item list-group-item-action" onClick={() => this.state.toggle(id)}>
        <input className="form-check-input" type="checkbox" value="" 
          checked={this.state.checked(id)} id={checkboxId}
          onChange={() => this.state.toggle(id)}
        />
        <label className="form-check-label" htmlFor={checkboxId}>
          {this.state.task.task}
        </label>
      </li>
    )
  }
}


export default App;
