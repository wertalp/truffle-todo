// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Todo {

  mapping (address => uint) balances;
  uint public count = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  constructor()  {
    createTask("Test Task");
  }

  function createTask(string memory _content) public {
    count ++;
    tasks[count] = Task(count, _content, false);
    emit TaskCreated(count, _content, false);
  }

  function checkTask(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

  function getCounter() public view returns (uint) {
    return count ;
  }

  function getBalance(address addr) public view returns(uint) {
    return balances[addr];
}
}