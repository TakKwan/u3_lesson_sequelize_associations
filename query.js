const { User, Task, sequelize } = require('./models')

const stringify = (data) => {
  console.log(JSON.stringify(data, null, 2))
}

const findAllWithTasks = async () => {
  // Find all users with their associated tasks
  // Raw SQL: SELECT * FROM users JOIN tasks ON tasks."userId" = users.id;
  const res = await User.findAll({ include: [{ model: Task, required: true }] })
  stringify(res)
}

const findAllJohnsWithTasks = async () => {
  // Find all users with their associated tasks
  // Raw SQL: SELECT * FROM users JOIN tasks ON tasks."userId" = users.id WHERE users."firstName" = 'John';
  const res = await User.findAll({
    where: { firstName: 'John' },
    include: [{ model: Task, required: true }]
  })
  stringify(res)
}

const run = async () => {
  try {
    await findAllWithTasks()
    await findAllJohnsWithTasks()
  } catch (error) {
    console.log(error)
  } finally {
    await sequelize.close()
  }
}

run()
