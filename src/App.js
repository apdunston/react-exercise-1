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

const GROUP_LIST = 1;
const GROUP = 2;
const GROUP_NAMES = [...new Set(LIST.map(item => item.group))].sort();

class App extends Component {
  constructor(props) {
    super(props);

    // Map of sorted lists of tasks.
    let groups = LIST.reduce((acc, item) => {
      let list = acc[item.group];
      list = list == null ? [] : list;
      list.push(item);
      acc[item.group] = list.sort((a,b) => a.id - b.id);
      return acc;
    }, {});

    let tasks = LIST.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});


    this.state = {
      mode: GROUP_LIST,
      group: null,
      groups: groups,
      tasks: tasks,
      groupName: null
    }

    // this.onDismiss = this.onDismiss.bind(this);
    this.goToGroup = this.goToGroup.bind(this);
    this.goToGroupList = this.goToGroupList.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.groupTasks = this.groupTasks.bind(this);
  }

  goToGroup(group) {
    this.setState({
      group: group,
      mode: GROUP
    })
  }

  goToGroupList() {
    this.setState({
      group: null,
      mode: GROUP_LIST
    })
  }

  toggleTask(id) {

  }

  groupTasks(groupName) {
    this.state.tasks.filter(task => task.group === groupName);
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
        { this.state.mode === GROUP_LIST ? 
          <GroupList 
            groups={this.state.groups} 
            goToGroup={this.goToGroup} 
            goToGroupList={this.goToGroupList}
            groupTasks={this.groupTasks}
          /> 
          : null 
        }
        { this.state.mode === GROUP ? <Group name={this.state.group} tasks={this.state.groups[this.state.group]} goToGroupList={this.goToGroupList}/> : null }
        {/* {Object.keys(groups).map(groupName => 
            <Group key={groupName} name={groupName} tasks={groups[groupName]} />
        )} */}
      </div>
    );
  }
}

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: props.groups,
      goToGroup: props.goToGroup,
      goToGroupList: props.goToGroupList,
      groupTasks: props.groupTasks
    };

    // this.onDismiss = this.onDismiss.bind(this);
  }

  render() {
    return (
      <div className="main mx-auto">
        <ul className="list-group">
          {Object.keys(this.state.groups).sort().map(group =>            
            <li key={group} className="list-group-item list-group-item-action" onClick={() => this.state.goToGroup(group)}>
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
      tasks: props.tasks,
      goToGroupList: props.goToGroupList
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
            <Task key={task.id} task={task}/>
          )}
        </ul>
      </div>
    );
  }
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = props.task;

    this.checked = this.checked.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  checked() {
    return this.state.completedAt != null;
  }

  toggle() {
    if (this.checked()) {
      this.setState({completedAt: null});
    } else {
      this.setState({completedAt: new Date()});
    }
  }

  render() {
    let checkboxId = "checkbox-" + this.state.id;
    return (
      <li key={this.state.task.id} className="form-check list-group-item list-group-item-action" onClick={() => this.toggle()}>
        <input className="form-check-input" type="checkbox" value="" 
          checked={this.checked()} id={checkboxId}
          onChange={() => this.toggle()}
        />
        <label className="form-check-label" htmlFor={checkboxId}>
          {this.state.task}
        </label>
      </li>
    )
  }
}


export default App;
