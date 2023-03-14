const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task Contract", function () {
  let TaskContract;
  let taskContract;

  const TOTAL_NUM_TASKS = 5;
  let totalTasks;

  beforeEach(async function () {
    TaskContract = await ethers.getContractFactory("TaskContract");
    [owner] = await ethers.getSigners();
    taskContract = await TaskContract.deploy();

    totalTasks = [];
    for (let i = 0; i < TOTAL_NUM_TASKS; i++) {
      let task = {
        taskText: `Random Task ${i + 1}`,
        isDeleted: false,
      };
      await taskContract.addTask(task.taskText, task.isDeleted);
      totalTasks.push(task);
    }
  }); // Runds before any it block or describe block

  // Second Test Block
  describe("Add Task", function () {
    it("it should emit add Task", async function () {
      let task = {
        taskText: `Write web 3 code`,
        isDeleted: false,
      };

      await expect(await taskContract.addTask(task.taskText, task.isDeleted))
        .to.emit(taskContract, "AddTask")
        .withArgs(owner.address, TOTAL_NUM_TASKS);
    });
  });

  describe("Get All My Tasks", function () {
    it("it should return all my tasks", async function () {
      const allMyTasks = await taskContract.getMyTasks();
      expect(allMyTasks.length).to.equal(TOTAL_NUM_TASKS);
    });
  });

  describe("Delete My Task", function () {
    it("it should delete a task with the provided id", async function () {
      const TASK_ID = 0;
      const TASK_DELETED = true;
      await expect(await taskContract.deleteTask(TASK_ID, TASK_DELETED))
        .to.emit(taskContract, "DeleteTask")
        .withArgs(TASK_ID, TASK_DELETED);
    });
  });
});
