import React, {Component} from 'react';
import './App.css';

const ENTER = 13;
const SPACE = 32;
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

    this.goToGroup = this.goToGroup.bind(this);
    this.goToGroupList = this.goToGroupList.bind(this);
    this.checked = this.checked.bind(this);
    this.toggle = this.toggle.bind(this);
    this.groupTasks = this.groupTasks.bind(this);
    this.locked = this.locked.bind(this);
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
    return Object
      .values(this.state.tasks)
      .filter(task => task.group === groupName)
      .sort((a,b) => a.id - b.id);
  }

  locked(id) {
    let dependencyIds = this.state.tasks[id].dependencyIds;
    if (dependencyIds.length === 0) {
      return false;
    }

    return !dependencyIds.every(depId => this.checked(depId));
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
            checked={this.checked}
            groupTasks={this.groupTasks}
          /> 
          : 
          <Group 
            name={this.state.currentGroup} 
            tasks={this.groupTasks(this.state.currentGroup)} 
            goToGroupList={this.goToGroupList}
            checked={this.checked}
            toggle={this.toggle}
            locked={this.locked}
          />
        }

        <div className="note">
          Note: You should be able to navigate with a screenreader and only &lt;TAB&gt; and &lt;SPACE&gt;.<br/>
          &nbsp;<b>Accessible</b> villainy is <b>inclusive</b> villainy.
        </div>
      </div>
    );
  }
}

class GroupList extends Component {
  render() {
    const {
      goToGroup,
      checked,
      groupTasks
    } = this.props;

    return (
      <div className="main mx-auto">
        <ul className="list-group">

          { GROUP_NAMES.map(groupName => {
            let tasks = groupTasks(groupName);
            let checkedTasks = tasks.filter(task => checked(task.id))
            return (           
              <li 
                key={groupName} 
                className="list-group-item list-group-item-action" 
                tabIndex={0}
                onClick={() => goToGroup(groupName)}
                onKeyUp={(event) => {if (event.keyCode === ENTER || event.keyCode === SPACE) { goToGroup(groupName) }}}
              >
                <div>{groupName}</div>
                <div>{checkedTasks.length} out of {tasks.length} completed</div>
              </li>
            )
          }) }

        </ul>
      </div>
    );
  }
}

class Group extends Component {
  render() {
    const {
      name,
      tasks,
      goToGroupList,
      toggle,
      checked,
      locked
    } = this.props;

    return (
      <div className="main mx-auto">
        <div className="row">
          <div className="column left">
            <strong>{name}</strong>      
          </div>
          <div className="column right">
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm" 
              onClick={() => goToGroupList()}
            >All Groups</button>
          </div>
        </div>
        <ul className="list-group">
          {tasks.map(task =>
            <Task 
              key={task.id} 
              task={task} 
              toggle={toggle} 
              checked={checked} 
              locked={locked}
            />
          )}
        </ul>
      </div>
    );
  }
}

class Task extends Component {
  render() {
    const {
      task,
      toggle,
      checked,
      locked
    } = this.props;

    let id = task.id;
    let checkboxId = "checkbox-" + id;
    return (
      <li 
        key={id} 
        className="form-check list-group-item list-group-item-action" 
      >
        {locked(id) ? 
          <span>
            <i className="fas fa-lock"></i> 
            {task.task}
          </span>
          :
          <span>
            <input className="form-check-input" type="checkbox" value="" 
              checked={checked(id)} 
              id={checkboxId}
              disabled={locked(id)}
              onChange={() => {console.log("ha");toggle(id)}}
            />
            <label className="form-check-label wide" htmlFor={checkboxId}>
              {task.task}
            </label>
          </span>
        }
      </li>
    )
  }
}

export default App;
